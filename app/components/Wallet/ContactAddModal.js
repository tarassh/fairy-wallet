// @flow
import React, { Component } from 'react';
import {
  Button,
  Input,
  Message,
  Modal,
  Form,
  Transition
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { InputAccount } from '../Shared/EosComponents';

const initialState = {
  open: false,
  account: '',
  title: '',
  typing: false,
  requested: false
};

type Props = {
  actions: {},
  states: {},
  loading: {},
  open: boolean,
  handleClose: () => {}
};

class ContactAddModal extends Component<Props> {
  state = initialState;

  componentWillReceiveProps(newProps) {
    if (
      newProps.loading.ADD_CONTACT === false &&
      !newProps.states.addContactFailed &&
      this.state.requested
    ) {
      this.handleClose();
    }
  }

  addAccount = () => {
    const { actions } = this.props;
    const { account, title } = this.state;
    actions.addContact(account, title);
    this.setState(Object.assign({}, initialState, { requested: true }));
  };
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value, typing: true, requested: false });
  };
  handleClose = () => {
    if (typeof this.props.handleClose === 'function') {
      this.props.handleClose();
    }
    this.setState(initialState);
  };

  render() {
    const { open, states, loading } = this.props;
    const { account, title, typing } = this.state;

    const requesting = loading.ADD_CONTACT === true;
    const message =
      states.addContactFailed && !typing ? (
        <Message error content={`Account ${account} not found.`} />
      ) : (
        ''
      );
    const content = (
      <Form>
        <Form.Input
          name="account"
          control={InputAccount}
          value={account}
          placeholder="Account..."
          onChange={this.handleChange}
          fluid
          disabled={requesting}
          label="Contact Account"
        />
        <Form.Input
          name="title"
          control={Input}
          value={title}
          placeholder="Title..."
          onChange={this.handleChange}
          fluid
          disabled={requesting}
          label="Contact Title"
        />
      </Form>
    );

    return (
      <Transition visible={open} animation="scale" duration={200}>
        <Modal open={open} size="mini" onClose={this.onClose}>
          <Modal.Content>
            <Modal.Description>
              {open && content}
              {open && message}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={this.addAccount}
              disabled={account.length === 0 || title.length === 0}
              loading={requesting}
            >
              Add
            </Button>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Actions>
        </Modal>
      </Transition>
    );
  }
}

const mapStateToProps = state => ({
  states: state.states,
  loading: state.loading
});

export default connect(mapStateToProps, null)(ContactAddModal);
