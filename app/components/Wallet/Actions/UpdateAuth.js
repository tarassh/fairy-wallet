import React, { Component } from 'react';
import { Form, Divider } from 'semantic-ui-react';
import TransactionsModal from '../../Shared/TransactionsModal';
import MainContentContainer from './../../../components/Shared/UI/MainContent';

type Props = {
  account: {},
  transaction: {},
  actions: {}
};

export default class UpdateAuth extends Component<Props> {
  constructor(props) {
    super(props);

    const { account } = this.props;
    const { permissions } = account;
    const active = permissions.find(el => el.perm_name === 'active');
    const owner = permissions.find(el => el.perm_name === 'owner');
    this.state = {
      openModal: false,
      active: active.required_auth.keys[0].key,
      activeWeight: active.required_auth.keys[0].weight,
      owner: owner.required_auth.keys[0].key,
      ownerWeight: owner.required_auth.keys[0].weight
    };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleActiveSubmit = () => {
    const { permission, active, activeWeight } = this.state;
    const { actions, account } = this.props;
    const { permissions } = account;
    const perm = permissions.find(el => el.perm_name === 'active');
    const auth = {
      threshold: 1,
      keys: [
        {
          key: active,
          weight: activeWeight
        }
      ],
      accounts: [],
      waits: []
    };
    actions.checkAndRun(
      actions.updateauth,
      'active',
      perm.parent,
      auth,
      permission
    );
    this.setState({ openModal: true });
  };

  handleClose = () => {
    const { account, actions } = this.props;

    actions.resetState();
    actions.getAccount(account.account_name);
    this.setState({ openModal: false });
  };

  render() {
    const { transaction } = this.props;
    const { openModal, active, owner, activeWeight, ownerWeight } = this.state;

    const content = (
      <div className="stake">
        <TransactionsModal
          open={openModal}
          transaction={transaction}
          handleClose={this.handleClose}
        />
        <Form onSubmit={this.handleActiveSubmit}>
          <Form.Group>
            <Form.Input
              label="Active Permission"
              name="active"
              value={active}
              onChange={this.handleChange}
              width={12}
              className="no-side-padding"
            />
            <Form.Input
              label="Weight"
              value={activeWeight}
              readOnly
              width={2}
            />
          </Form.Group>
          <Form.Group>
            <Form.Button content="Update" name="active" />
          </Form.Group>
          <Divider />
        </Form>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              label="Owner Permission"
              name="owner"
              value={owner}
              onChange={this.handleChange}
              width={12}
              className="no-side-padding"
            />
            <Form.Input label="Weight" value={ownerWeight} readOnly width={2} />
          </Form.Group>
          <Form.Group>
            <Form.Button content="Update" name="owner" />
          </Form.Group>
        </Form>
      </div>
    );

    return (
      <MainContentContainer
        title="Account Permissions"
        subtitle="TODO: "
        className="adjust-content"
        content={content}
      />
    );
  }
}
