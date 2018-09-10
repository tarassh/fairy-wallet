import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Modal,
  Transition,
  Button,
  Icon,
  Image,
  Header,
  Dimmer,
  Loader
} from 'semantic-ui-react';
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
  open: boolean,
  loading: {},
  transaction: ?{},
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

function renderTransaction(transaction, goto, proceeded) {
  const { context, receipt, err, constructed, signed } = transaction;
  const { action } = context;
  const actionName = actionDisplayName[action];

  let icon = 'spinner';
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

  let content;
  if (action === 'transfer') {
    content = <TransferContext context={context} showDetails={proceeded} />;
  } else if (action === 'delegatebw' || action === 'undelegatebw') {
    content = <DelegateContext context={context} showDetails={proceeded} />;
  } else if (action === 'voteproducer') {
    content = <VoteContext context={context} showDetails={proceeded} />;
  } else if (action === 'buyram') {
    content = <BuyRamContext context={context} showDetails={proceeded} />;
  } else if (action === 'buyrambytes') {
    content = <BuyRamBytesContext context={context} showDetails={proceeded} />;
  } else if (action === 'sellram') {
    content = <SellRamContext context={context} showDetails={proceeded} />;
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
  state = { proceeded: false }

  componentWillReceiveProps(nextProps) {
    const { open } = this.props;
    if (!open && nextProps.open) {
      this.props.getPublicKey();
    }
  }

  renderContent = (header, content, action, image) => (
    <div>
      <p className="title">{header}</p>
      <br />
      <Image centered src={image} style={{ marginTop: '1em' }} />
      <br />
      <div className="subtitle no-top-bottom-margin">
        {content}
      </div>
      <br />
      <br />
      <div className="public-key-confirm-modal">{action}</div>
    </div>
  )

  handleProceed = () => {
    const { handleExecute } = this.props; 
    handleExecute();

    this.setState({ proceeded: true });
  }

  renderTransaction = () => {
    const { transaction, handleClose } = this.props;
    const { proceeded } = this.state;
    if (!transaction || transaction.context === null) {
      return undefined;
    }

    let image = confirmTransaction;

    let header = 'Use your device to verify transaction';
    let modalAction;
    if (!proceeded) {
      modalAction = (
        <span>
          <Button content='Cancel' onClick={handleClose} />
          <Button content='Proceed' onClick={this.handleProceed} />
        </span>
      )
    }
    if (transaction.receipt !== null) {
      header = 'Transaction Successful';
      modalAction = <Button onClick={handleClose} content="Close" />;
    } else if (transaction.err !== null) {
      header = 'Transaction Failed';
      modalAction = <Button onClick={handleClose} content="Close" />;
      image = confirmTransactionFailed;
    }

    return this.renderContent(header, renderTransaction(transaction, this.handleGoto, proceeded), modalAction, image);
  }

  renderInactivity = () => {
    const { handleClose } = this.props;
    const header = 'Unlock Device';
    const inactivity = <p>Cannot read device properties. Make sure your device is unlocked.</p>;
    const action = <Button onClick={handleClose} content="Close" />;

    return this.renderContent(header, inactivity, action, wakeupDevice);
  }

  renderLoader = () => (
    <Dimmer active inverted>
      <Loader inverted />  
    </Dimmer>
  )

  handleGoto = (e, { txid }) => {
    shell.openExternal(`https://eosflare.io/tx/${txid}`);
  };

  render() {
    const { open, states, loading } = this.props;
    let content;
    if (open) {
      if (loading.GET_PUBLIC_KEY === true) {
        content = this.renderLoader();
      } else if (states.publicKey) {
        content = this.renderTransaction();
      } else {
        content = this.renderInactivity()
      }
    }

    return (
      <Transition visible={open} animation="scale" duration={200}>
        <Modal
          open={open}
          size="small"
          onClose={this.onClose}
          style={{ textAlign: 'center' }}
        >
          <Modal.Content>
            { content }
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
