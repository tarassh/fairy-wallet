import React, { Component } from 'react';
import { Modal, Transition, Table, Button, Message } from 'semantic-ui-react';

type Props = {
  open: boolean,
  transaction: {},
  handleClose: () => {}
};

class TransactionModal extends Component<Props> {

  render() {
    const {
      open,
      transaction,
      handleClose
    } = this.props;
    const { context, receipt } = transaction;
    let { error } = transaction;

    let content = '';
    let header = '';
    if (context !== null) {
      header = 'Use ledger to verify transaction';
      content = (
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={3}>
                Contract
              </Table.Cell>
              <Table.Cell>
                {context.contract}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Action
              </Table.Cell>
              <Table.Cell>
                {context.action}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Data
              </Table.Cell>
              <Table.Cell>
                {context.data}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Memo
              </Table.Cell>
              <Table.Cell>
                {context.memo}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );
    }
    if (receipt !== null) {
      header = 'Success';
      content = (
        <Message success >
          <Message.Content>
            <p> Transaction id {receipt.transaction_id}</p>
          </Message.Content>
        </Message>
      );
    }
    let message = '';
    if (error !== null) {
      if (typeof error === 'string' ) {
        [error] = JSON.parse(error).error.details;
      }

      header = 'Error';
      message = <Message error content={error.message} />;
    }
    let modalAction = '';
    if (receipt !== null || error !== null) {
      modalAction = <Button primary onClick={handleClose}>Close</Button>;
    }

    return (
      <Transition visible={open} animation='scale' duration={500}>
        <Modal
          open={open}
          size='tiny'
          onClose={this.onClose}
        >
          <Modal.Header>{header}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              {content}
              {message}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            {modalAction}
          </Modal.Actions>
        </Modal>
      </Transition>
    );
  }
}

export default TransactionModal;