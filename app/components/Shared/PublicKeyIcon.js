import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Modal, Transition, Button, Image, Icon } from 'semantic-ui-react';
import publicKeySvg from '../../../resources/images/verify-public-key.svg';

import { getPublicKey } from '../../actions/ledger';

type Props = {
  getPublicKey: () => {},
  publicKey: {},
  loading: {},
  states: {}
};

class PublicKeyComponent extends Component<Props> {
  state = { opened: false };

  verifyPublicKey = () => {
    this.props.getPublicKey(true);
    this.setState({ opened: true });
  };

  handleClose = () => this.setState({ opened: false });

  render() {
    const { publicKey, loading, states } = this.props;
    const { opened } = this.state;

    let header = 'Copy public key';
    let action;
    let tryAgainAction;
    let helperContent = (
      <div>
        <Image
          src={publicKeySvg}
          centered
          style={{ marginTop: '1em', marginBottom: '1em' }}
        />
        <p>Confirm that the public key on your device matches.</p>
        <p style={{ userSelect: 'none' }}>{publicKey.wif}</p>
      </div>
    );
    if (opened && loading.PUBLIC_KEY_DISPLAY === false) {
      if (states.displayPublicKey) {
        action = (
          <CopyToClipboard text={publicKey.wif}>
            <Button content="Copy to clipborad" onClick={this.handleClose} />
          </CopyToClipboard>
        );
      } else {
        action = <Button content="Close" onClick={this.handleClose} />;
        tryAgainAction = (
          <Button content="Try again" onClick={this.verifyPublicKey} />
        );
        helperContent = 'Please try again or contact wallet support';
        header = 'Receive public key rejected';
      }
    }

    return (
      <Button
        icon
        basic
        circular
        onClick={this.verifyPublicKey}
        className="publickeycontainer"
      >
        <Icon name="key" />
        <Transition animation="scale" duration={200}>
          <Modal open={opened} size="tiny" style={{ textAlign: 'center' }}>
            <Modal.Header>{header}</Modal.Header>
            <Modal.Content>
              <Modal.Description>{helperContent}</Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              {action}
              {tryAgainAction && tryAgainAction}
            </Modal.Actions>
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
