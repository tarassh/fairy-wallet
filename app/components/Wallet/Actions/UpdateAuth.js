import React, { Component } from 'react';
import { Form, Divider } from 'semantic-ui-react';
import TransactionsModal from '../../Shared/TransactionsModal';
import MainContentContainer from './../../../components/Shared/UI/MainContent';

const ecc = require('eosjs-ecc');

type Props = {
  account: {},
  transaction: {},
  actions: {}
};

export default class UpdateAuth extends Component<Props> {
  state = {
    openModal: false,
    active: '',
    owner: ''
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleOwnerSubmit = () => {
    const { owner } = this.state;
    const { actions, account } = this.props;
    const perm = getAuth(account, 'owner');
    const auth = {
      threshold: perm.required_auth.threshold,
      keys: [
        {
          key: owner,
          weight: perm.required_auth.keys[0].weight
        }
      ],
      accounts: [],
      waits: []
    };
    actions.checkAndRun(
      actions.updateauth,
      perm.perm_name,
      perm.parent,
      auth,
      perm.perm_name
    );
    this.setState({ openModal: true, active: '', owner: '' });
  };

  handleActiveSubmit = () => {
    const { active } = this.state;
    const { actions, account } = this.props;
    const perm = getAuth(account, 'active');
    const auth = {
      threshold: perm.required_auth.threshold,
      keys: [
        {
          key: active,
          weight: perm.required_auth.keys[0].weight
        }
      ],
      accounts: [],
      waits: []
    };
    actions.checkAndRun(
      actions.updateauth,
      perm.perm_name,
      perm.parent,
      auth,
      perm.perm_name
    );
    this.setState({ openModal: true, active: '', owner: '' });
  };

  handleClose = () => {
    const { account, actions } = this.props;

    actions.resetState();
    actions.getAccount(account.account_name);
    this.setState({ openModal: false });
  };

  render() {
    const { transaction, account } = this.props;
    const { openModal, active, owner } = this.state;
    const isActiveKeyValid = ecc.isValidPublic(active);
    const isOwnerKeyValid = ecc.isValidPublic(owner);
    const ownerAuth = getAuth(account, 'owner');
    const activeAuth = getAuth(account, 'active');

    const enableActive =
      isActiveKeyValid && activeAuth.required_auth.keys[0].key !== active;
    const enableOwner =
      isOwnerKeyValid && ownerAuth.required_auth.keys[0].key !== owner;

    const content = (
      <div className="stake">
        <TransactionsModal
          open={openModal}
          transaction={transaction}
          handleClose={this.handleClose}
        />
        <Form onSubmit={this.handleActiveSubmit}>
          <Divider />
          <Form.Group>
            <Form.Input
              label="Active Permission"
              value={activeAuth.required_auth.keys[0].key}
              readOnly
              className="no-side-padding"
              width={12}
            />
            <Form.Input
              label="Weight"
              value={activeAuth.required_auth.keys[0].weight}
              readOnly
              width={2}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="New Active Permission"
              name="active"
              value={active}
              onChange={this.handleChange}
              width={12}
              className={
                isActiveKeyValid || active === ''
                  ? 'no-side-padding'
                  : 'no-side-padding invalid'
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Button
              content="Update"
              name="active"
              disabled={!enableActive}
            />
          </Form.Group>
          <Divider />
        </Form>
        <Form onSubmit={this.handleOwnerSubmit}>
          <Form.Group>
            <Form.Input
              label="Owner Permission"
              value={ownerAuth.required_auth.keys[0].key}
              readOnly
              className="no-side-padding"
              width={12}
            />
            <Form.Input
              label="Weight"
              value={ownerAuth.required_auth.keys[0].weight}
              readOnly
              width={2}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="New Owner Permission"
              name="owner"
              value={owner}
              onChange={this.handleChange}
              width={12}
              className={
                isOwnerKeyValid || owner === ''
                  ? 'no-side-padding'
                  : 'no-side-padding invalid'
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Button
              content="Update"
              name="owner"
              disabled={!enableOwner}
            />
          </Form.Group>
        </Form>
      </div>
    );

    return (
      <MainContentContainer
        title="Account Permissions"
        subtitle="Modify account permissions"
        className="adjust-content"
        content={content}
      />
    );
  }
}

function getAuth(account, name) {
  const { permissions } = account;
  return permissions.find(el => el.perm_name === name);
}
