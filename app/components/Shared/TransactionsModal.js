import React, { Component } from 'react';
import {
  Modal,
  Transition,
  Button,
  Message,
  Accordion,
  Icon,
  Image
} from 'semantic-ui-react';
import TransferContext from './TransferContext';
import DelegateContext from './DelegateContext';
import confirmTransaction from '../../../resources/images/confirm-transaction.svg';

type Props = {
  open: boolean,
  transactions: {},
  handleClose: () => {}
};

function createAccordionPanel(transaction) {
  const { context, receipt, err, constructed, signed } = transaction;
  const actionName = context.action.replace(/\b\w/g, l => l.toUpperCase());
  const { action } = context;

  const messageHeader = <Message.Header content={actionName} />;
  let helperMessage = constructed ? 'Ready to sign' : 'Preparing...';
  if (signed) {
    helperMessage = 'Sending...';
  }

  let status = (
    <Message icon>
      <Icon name="circle notched" loading />
      <Message.Content>
        {messageHeader}
        {helperMessage}
      </Message.Content>
    </Message>
  );

  let content = <TransferContext context={context} />;
  if (action === 'delegatebw' || action === 'undelegatebw') {
    content = <DelegateContext context={context} />;
  }

  if (receipt !== null) {
    status = (
      <Message success>
        {messageHeader}
        <Message.Content>
          {`Transaction id ${receipt.transaction_id}`}
        </Message.Content>
      </Message>
    );
  }

  if (err !== null) {
    let error = err;
    let message = '';
    let unused; // eslint-disable-line no-unused-vars
    try {
      if (typeof error === 'string') {
        [error] = JSON.parse(error).error.details;
      }
      [unused, message] = error.message.split(':');
      if (message) {
        error = message.trim();
      }
    } catch (e) {
      message = error;
    }
    status = (
      <Message error>
        {messageHeader}
        <Message.Content>{message}</Message.Content>
      </Message>
    );
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

    let header = 'Use your device to validate transaction';
    let modalAction = '';
    if (successCounter === panels.length) {
      header = 'Success';
      modalAction = <Button onClick={handleClose} content="Close" />;
    } else if (failureCounter > 0) {
      header = 'Error';
      modalAction = <Button onClick={handleClose} content="Close" />;
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
              <Image
                src={confirmTransaction}
                centered
                style={{ marginTop: '1em', marginBottom: '1em' }}
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
