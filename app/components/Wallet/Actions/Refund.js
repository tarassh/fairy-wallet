// @flow
import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import TransactionsModal from '../../Shared/TransactionsModal';
import MainContentContainer from '../../Shared/UI/MainContent';
import PermissionButton from '../../Shared/UI/PermissionButton';

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

    return (
      <Form onSubmit={this.handleSubmit}>
        <TransactionsModal
          open={openModal}
          transaction={transaction}
          handleClose={this.handleClose}
        />
        <Form.Group id="form-button-control-public">
          <PermissionButton 
            content="Refund"
            onChange={this.handleChange}
            account={account}
          />
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
