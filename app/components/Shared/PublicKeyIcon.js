import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Modal, Transition, Button, Image, Icon } from 'semantic-ui-react';
import publicKeySvg from '../../../resources/images/verify-public-key.svg';
import publicKeyErrorSvg from '../../../resources/images/verify-public-key-error.svg';

import { getPublicKey } from '../../actions/ledger';

type Props = {
  getPublicKey: () => {},
  publicKey: {},
  loading: {},
  states: {}
};

class PublicKeyComponent extends Component<Props> {
  state = {
    opened: false,
    step: 'open'
  };

  openModality = () => {
    this.setState({ opened: true });
  };

  verifyPublicKey = () => {
    this.setState({ step: 'verify' });
    this.props.getPublicKey(true);
  };

  handleClose = () => this.setState({ opened: false, step: 'open' });

  renderStep0 = () => {
    const header = <p className="title">Get Public Key</p>;
    const content = (
      <div>
        <p className="subtitle no-top-bottom-margin">
          To get public key, you have to verify it on the device.
        </p>
        <p className="subtitle no-top-bottom-margin">
          Carefully verify that it matches the public key on your computer.
        </p>
      </div>
    );
    const action = (
      <div className="public-key-confirm-modal">
        <Button content="Close" onClick={this.handleClose} />
        <Button content="verify" onClick={this.verifyPublicKey} />
      </div>
    );

    return (
      <div>
        {header}
        <br />
        {content}
        <br />
        <br />
        {action}
      </div>
    );
  };

  renderStep1 = () => {
    const { publicKey, loading, states } = this.props;
    let header = <p className="title">Get Public Key</p>;
    let image = publicKeySvg;
    let desc = (
      <div className="verify-content">
        <p className="subtitle">EOS public key</p>
        <p className="public-key">{publicKey.wif}</p>
        <p className="device-hint">
          Verify public key on your device. Press the right button to confirm.
        </p>
      </div>
    );

    let action;
    if (loading.PUBLIC_KEY_DISPLAY === false) {
      if (states.displayPublicKey) {
        image = publicKeySvg;

        action = (
          <CopyToClipboard text={publicKey.wif}>
            <Button content="Copy to clipborad" onClick={this.handleClose} />
          </CopyToClipboard>
        );
      } else {
        header = <p className="title">Receive Public Key Rejected</p>;
        image = publicKeyErrorSvg;

        desc = (
          <div>
            <p className="subtitle no-top-bottom-margin">
              Please try again or contact Wallet Support.
            </p>
          </div>
        );

        action = (
          <div className="public-key-confirm-modal">
            <Button content="Close" onClick={this.handleClose} />
            <Button content="Try again" onClick={this.verifyPublicKey} />
          </div>
        );
      }
    }

    const content = (
      <div>
        <Image
          src={image}
          centered
          style={{ marginTop: '1em', marginBottom: '1em' }}
        />
        {desc}
      </div>
    );

    return (
      <div>
        {header}
        <br />
        {content}
        <br />
        <br />
        {action}
      </div>
    );
  };

  render() {
    const { opened, step } = this.state;

    let content = this.renderStep0();
    if (step === 'verify') {
      content = this.renderStep1();
    }

    return (
      <Button
        icon
        basic
        circular
        onClick={this.openModality}
        className="publickeycontainer"
      >
        <Icon name="key" />
        <Transition animation="scale" duration={200}>
          <Modal open={opened} className="public-key-modality">
            <Modal.Content>{content}</Modal.Content>
          </Modal>
        </Transition>
      </Button>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  states: state.states,
  publicKey: state.accounts.publicKey
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPublicKey
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PublicKeyComponent);
