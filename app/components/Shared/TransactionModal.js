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
    const { context, receipt, error } = transaction;

    let content = '';
    if (context !== null) {
      content = (
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={4}>
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
    let message = '';
    if (error !== null) {
      message = (
        <Message
          error
          content={error.message}
        />
      );
    }
    let modalAction = '';
    if (receipt !== null || error !== null) {
      modalAction = <Button primary onClick={handleClose}>Close</Button>
    }

    return (
      <Transition visible={open} animation='scale' duration={500}>
        <Modal
          open={open}
          size='tiny'
          onClose={this.onClose}
        >
          <Modal.Header>Use ledger to verify transaction</Modal.Header>
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