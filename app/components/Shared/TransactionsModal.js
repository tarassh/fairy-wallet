import React, { Component } from 'react';
import {
  Modal,
  Transition,
  Button,
  Icon,
  Image,
  Header
} from 'semantic-ui-react';
import _ from 'lodash';
import TransferContext from './TransferContext';
import DelegateContext from './DelegateContext';
import VoteContext from './VoteContext';
import BuyRamContext from './BuyRamContext';
import BuyRamBytesContext from './BuyRamBytesContext';
import SellRamContext from './SellRamContext';
import confirmTransaction from '../../../resources/images/confirm-transaction.svg';

type Props = {
  open: boolean,
  transactions: {},
  handleClose: () => {}
};

const noop = () => {};

const actionDisplayName = {
  transfer: 'Transfer funds',
  delegatebw: 'Stake funds',
  undelegatebw: 'Unstake funds',
  voteproducer: 'Vote producer',
  buyram: 'Buy RAM',
  buyrambytes: 'Buy RAM bytes'
};

function renderTransaction(transaction) {
  const { context, receipt, err, constructed, signed } = transaction;
  const { action } = context;
  const actionName = actionDisplayName[action];

  let icon = 'circle notched';
  let statusText = constructed ? 'Ready to sign' : 'Preparing...';
  let loading = true;
  if (signed) {
    statusText = 'Sending...';
  }

  if (receipt !== null) {
    statusText = `Transaction id ${receipt.transaction_id}`;
    icon = 'check circle';
    loading = false;
  }

  if (err !== null) {
    let error = err;
    try {
      if (typeof error === 'string') {
        [error] = JSON.parse(err).error.details;
      }
      if (error.message) {
        error = error.message.trim();
      }
    } catch (e) {
      noop();
    }
    statusText = error;
    icon = 'remove circle';
    loading = false;
  }

  let content = <TransferContext context={context} />;
  if (action === 'delegatebw' || action === 'undelegatebw') {
    content = <DelegateContext context={context} />;
  } else if (action === 'voteproducer') {
    content = <VoteContext context={context} />;
  } else if (action === 'buyram') {
    content = <BuyRamContext context={context} />;
  } else if (action === 'buyrambytes') {
    content = <BuyRamBytesContext context={context} />;
  } else if (action === 'sellram') {
    content = <SellRamContext context={context} />;
  }

  const header = (
    <Header>
      <Header.Content>
        {actionName}
        <Header.Subheader style={err !== null ? { color: 'lightcoral' } : {}}>
          <Icon name={icon} loading={loading} />
          {statusText}
        </Header.Subheader>
      </Header.Content>
    </Header>
  );

  return (
    <div key={action}>
      {header}
      {loading && content}
    </div>
  );
}

class TransactionsModal extends Component<Props> {
  state = { activeIndex: 0 };

  renderContent = (header, content, action, image) => (
    <div>
      <p className="title">{header}</p>
      <br />
      <Image centered src={image} />
      <br />
      <div>
        {_.map(content, (line, i) => (
          <div key={i} className="subtitle no-top-bottom-margin">
            {line}
          </div>
        ))}
      </div>
      <br />
      <br />
      <div className="public-key-confirm-modal">{action}</div>
    </div>
  );

  handleClick = (e, { index }) => {
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { open, transactions, handleClose } = this.props;

    const renderedTxs = [];
    let successCounter = 0;
    let failureCounter = 0;
    Object.keys(transactions).forEach(key => {
      const tx = transactions[key];
      if (tx.context !== null) {
        renderedTxs.push(renderTransaction(tx));
      }
      successCounter += tx.receipt !== null ? 1 : 0;
      failureCounter += tx.err !== null ? 1 : 0;
    });

    let header = 'Use your device to verify transaction';
    let modalAction = '';
    if (successCounter === renderedTxs.length) {
      header = 'Success';
      modalAction = <Button onClick={handleClose} content="Close" />;
    } else if (failureCounter > 0) {
      header = 'Error';
      modalAction = <Button onClick={handleClose} content="Close" />;
    }

    return (
      <Transition visible={open} animation="scale" duration={500}>
        <Modal
          open={open}
          size="small"
          onClose={this.onClose}
          style={{ textAlign: 'center' }}
        >
          <Modal.Content>
            {/* <Modal.Description>
              {modalAction.length === 0 && (
                <Image
                  src={confirmTransaction}
                  centered
                  style={{ marginTop: '1em', marginBottom: '1em' }}
                />
              )}
              {_.map(renderedTxs, tx => tx)}
            </Modal.Description> */}
            {this.renderContent(
              header,
              renderedTxs,
              modalAction,
              confirmTransaction
            )}
          </Modal.Content>
          {/* <Modal.Actions>{modalAction}</Modal.Actions> */}
        </Modal>
      </Transition>
    );
  }
}

export default TransactionsModal;
