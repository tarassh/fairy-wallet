import React, { Component } from 'react';
import {
  Modal,
  Transition,
  Button,
  Message,
  Accordion
} from 'semantic-ui-react';
import TransferContext from './TransferContext';
import DelegateContext from './DelegateContext';

type Props = {
  open: boolean,
  transactions: {},
  handleClose: () => {}
};

function createAccordionPanel(transaction) {
  const { context, receipt, err } = transaction;
  const { action } = context;
  let status = <Message content={action} />;

  let content = <TransferContext context={context} />;
  if (action === 'delegatebw' || action === 'undelegatebw') {
    content = <DelegateContext context={context} />;
  }

  if (receipt !== null) {
    status = (
      <Message success>
        <Message.Content>
          <p>{`${action}: transaction id ${receipt.transaction_id}`}</p>
        </Message.Content>
      </Message>
    );
  }

  if (err !== null) {
    let error = err;
    if (typeof error === 'string') {
      [error] = JSON.parse(error).error.details;
    }
    status = <Message error content={error.message} />;
  }

  return {
    key: `panel-${action}`,
    title: { key: `title-${action}`, content: status },
    content: { key: `content-${action}`, content }
  };
}

class TransactionsModal extends Component<Props> {
  state = { activeIndex: 0 };

  handleClick = (e, { index }) => {
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { open, transactions, handleClose } = this.props;

    const panels = [];
    let successCounter = 0;
    let failureCounter = 0;
    Object.keys(transactions).forEach(key => {
      const tx = transactions[key];
      if (tx.context !== null) {
        panels.push(createAccordionPanel(tx));
      }
      successCounter += tx.receipt !== null ? 1 : 0;
      failureCounter += tx.err !== null ? 1 : 0;
    });

    let header = 'Use ledger to verify transaction';
    let modalAction = '';
    if (successCounter === panels.length) {
      header = 'Success';
      modalAction = <Button primary onClick={handleClose} content="Close" />;
    } else if (failureCounter > 0) {
      header = 'Error';
      modalAction = <Button primary onClick={handleClose} content="Close" />;
    }

    return (
      <Transition visible={open} animation="scale" duration={500}>
        <Modal open={open} size="small" onClose={this.onClose}>
          <Modal.Header>{header}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Accordion
                defaultActiveIndex={0}
                panels={panels}
                className="remove-my-icons"
              />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>{modalAction}</Modal.Actions>
        </Modal>
      </Transition>
    );
  }
}

export default TransactionsModal;
