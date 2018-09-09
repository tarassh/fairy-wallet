import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Modal,
  Transition,
  Button,
  Icon,
  Image,
  Header
} from 'semantic-ui-react';
import _ from 'lodash';
import { shell } from 'electron';
import TransferContext from './TransferContext';
import DelegateContext from './DelegateContext';
import VoteContext from './VoteContext';
import BuyRamContext from './BuyRamContext';
import BuyRamBytesContext from './BuyRamBytesContext';
import SellRamContext from './SellRamContext';
import confirmTransaction from '../../../resources/images/confirm-transaction.svg';
import confirmTransactionFailed from '../../../resources/images/confirm-transaction-failed.svg';
import wakeupDevice from '../../../resources/images/wakeup-device.svg';

import { getPublicKey } from '../../actions/ledger';

type Props = {
  states: {},
  loading: {},
  open: boolean,
  transactions: {},
  handleClose: () => {},
  handleExecute: () => {},
  getPublicKey: () => {}
};

const noop = () => {};

const actionDisplayName = {
  transfer: 'Transfer funds',
  delegatebw: 'Delegate funds',
  undelegatebw: 'Undelegate funds',
  voteproducer: 'Vote producer',
  buyram: 'Buy RAM',
  buyrambytes: 'Buy RAM bytes',
  sellram: 'Sell RAM'
};

function renderTransaction(transaction, goto) {
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
    statusText = (
      <div 
        role='link'
        tabIndex={0}
        onClick={() => {}} 
        onKeyUp={() => goto(null, { txid: receipt.transaction_id })}
        style={{cursor: 'pointer'}}
      >
      Transaction id <span className='public-key'>{receipt.transaction_id}</span>
      </div>
    );
    icon = 'check circle';
    loading = false;
  }

  if (err !== null) {
    let error = err;
    try {
      if (typeof error === 'string') {
        [error] = JSON.parse(err).error.details;
      } else if (error.name && error.name === 'TransportStatusError') {
        if (error.statusCode === 0x6985) {
          error = 'Ledger device: Condition of use not satisfied. Denied by user.';
        } else if (error.statusCode === 0x6A80) {
          error = 'Ledger device: Invalid data.'
        } else if (error.statusCode === 0x6B00) {
          error = 'Ledger device: Incorrect parameter P1 or P2.'
        } else {
          error = error.message;
        }
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
    <Header style={{ marginTop: '1rem' }}>
      <Header.Content>
        <div><Icon name={icon} loading={loading} />{actionName}</div>
        <Header.Subheader style={err !== null ? { color: 'lightcoral', marginTop: '1rem' } : { marginTop: '1rem' }}>
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
  state = { activeIndex: 0, executed: false };

  componentWillReceiveProps(nextProps) {
    const { open, loading, states } = this.props;
    const { executed } = this.state;
    if (!open && nextProps.open) {
      this.props.getPublicKey();
      this.setState({ executed: false });
    }

    if (open && loading.GET_PUBLIC_KEY === false && states.publicKey === true) {
      if (!executed) {
        this.props.handleExecute();
        this.setState({ executed: true });
      }
    }
  }

  renderContent = (header, content, action, image) => (
    <div>
      <p className="title">{header}</p>
      <br />
      <Image centered src={image} style={{ marginTop: '1em' }} />
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

  renderTransaction = () => {
    const { transactions, handleClose } = this.props;

    const renderedTxs = [];
    let successCounter = 0;
    let failureCounter = 0;
    let image = confirmTransaction;
    Object.keys(transactions).forEach(key => {
      const tx = transactions[key];
      if (tx.context !== null) {
        renderedTxs.push(renderTransaction(tx, this.handleGoto));
      }
      successCounter += tx.receipt !== null ? 1 : 0;
      failureCounter += tx.err !== null ? 1 : 0;
    });

    let header = 'Use your device to verify transaction';
    let modalAction = '';
    if (successCounter === renderedTxs.length) {
      header = 'Transaction Successful';
      modalAction = <Button onClick={handleClose} content="Close" />;
    } else if (failureCounter > 0) {
      header = 'Transaction Failed';
      modalAction = <Button onClick={handleClose} content="Close" />;
      image = confirmTransactionFailed;
    }

    return this.renderContent(header, renderedTxs, modalAction, image);
  }

  renderInactivity = () => {
    const { handleClose } = this.props;
    const header = 'Device is not responding';
    const noAccountsText = <p>Cannot read device properties. Make sure your device is unlocked.</p>;
    const action = <Button onClick={handleClose} content="Close" />;

    return this.renderContent(header, [noAccountsText], action, wakeupDevice);
  }

  handleClick = (e, { index }) => {
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  handleGoto = (e, { txid }) => {
    shell.openExternal(`https://eosflare.io/tx/${txid}`);
  };

  render() {
    const { open, states, loading } = this.props;

    return (
      <Transition visible={open} animation="scale" duration={500}>
        <Modal
          open={open}
          size="small"
          onClose={this.onClose}
          style={{ textAlign: 'center' }}
        >
          <Modal.Content>
            { states.publicKey || loading.GET_PUBLIC_KEY === true ? this.renderTransaction() : this.renderInactivity() }
          </Modal.Content>
        </Modal>
      </Transition>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  states: state.states,
  application: state.ledger.application
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPublicKey
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsModal);
