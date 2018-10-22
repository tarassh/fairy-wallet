import _ from 'lodash';
import React, { Component } from 'react';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import TransactionsModal from '../../Shared/TransactionsModal';
import MainContentContainer from '../../Shared/UI/MainContent';

type Props = {
  account: {},
  transaction: {},
  actions: {}
};

export default class Refund extends Component<Props> {
  state = {
    openModal: false,
    permission: ''
  };

  handleSubmit = () => {
    const { permission } = this.state;
    const { actions } = this.props;

    actions.checkAndRun(actions.refund, permission);

    this.setState({ openModal: true });
  };

  handleClose = () => {
    const { actions, account } = this.props;

    actions.resetState();
    actions.getAccount(account.account_name);
    this.setState({ openModal: false });
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  renderForm = () => {
    const { transaction, account } = this.props;
    const { openModal } = this.state;

    const permissions = _.map(account.permissions, el => ({
      key: el.perm_name,
      value: el.perm_name,
      text: `@${el.perm_name}`
    }));

    return (
      <Form onSubmit={this.handleSubmit}>
        <TransactionsModal
          open={openModal}
          transaction={transaction}
          handleClose={this.handleClose}
        />
        <Form.Group id="form-button-control-public">
          <Button.Group>
            <Button content="Refund" />
            <Dropdown
              options={permissions}
              floating
              name="permission"
              button
              className="icon permission"
              onChange={this.handleChange}
            />
          </Button.Group>
        </Form.Group>
      </Form>
    );
  };

  render() {
    return (
      <MainContentContainer
        title="Refund"
        subtitle="Fallback if unstaking doesn't refund automatically"
        className="adjust-content"
        content={
          <div className="stake">
            <div className="stake-form">{this.renderForm()}</div>
          </div>
        }
      />
    );
  }
}
