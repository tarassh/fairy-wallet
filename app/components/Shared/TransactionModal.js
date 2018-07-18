import React, { Component } from 'react';
import { Modal, Transition, Table } from 'semantic-ui-react';

type Props = {
  open: boolean,
  action: {}
};

class TransactionModal extends Component<Props> {

  render() {
    const {
      open,
      action
    } = this.props;

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
              <Table definition>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width={4}>
                      Contract
                    </Table.Cell>
                    <Table.Cell>
                      {action.contract}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      Action
                    </Table.Cell>
                    <Table.Cell>
                      {action.action}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      Data
                    </Table.Cell>
                    <Table.Cell>
                      {action.data}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      Memo
                    </Table.Cell>
                    <Table.Cell>
                      {action.memo}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </Transition>
    );
  }
}

export default TransactionModal;