import React, { Component } from 'react';
import { Modal, Transition, Button, Message } from 'semantic-ui-react';
import TransferContext from './TransferContext';

type Props = {
  open: boolean,
  transactions: {},
  handleClose: () => {}
};

class TransactionsModal extends Component<Props> {
  render() {
    const { open, transactions, handleClose } = this.props;
    const { context, receipt, err } = transactions.transfer;

    let content = '';
    let header = '';
    if (context !== null) {
      header = 'Use ledger to verify transaction';
      content = <TransferContext context={context} />;
    }
    if (receipt !== null) {
      header = 'Success';
      content = (
        <Message success>
          <Message.Content>
            <p> Transaction id {receipt.transaction_id}</p>
          </Message.Content>
        </Message>
      );
    }
    let message = '';
    if (err !== null) {
      let error = err;
      if (typeof error === 'string') {
        [error] = JSON.parse(error).error.details;
      }

      header = 'Error';
      message = <Message error content={error.message} />;
    }
    let modalAction = '';
    if (receipt !== null || err !== null) {
      modalAction = (
        <Button primary onClick={handleClose}>
          Close
        </Button>
      );
    }

    return (
      <Transition visible={open} animation="scale" duration={500}>
        <Modal open={open} size="small" onClose={this.onClose}>
          <Modal.Header>{header}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              {content}
              {message}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>{modalAction}</Modal.Actions>
        </Modal>
      </Transition>
    );
  }
}

export default TransactionsModal;
