import React, { Component } from 'react';
import { Button, Modal, Transition } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeToken } from '../../actions/settings';

class TokenRemove extends Component<Props> {
  removeToken = () => {
    const { account, handleClose, symbol } = this.props;
    this.props.actions.removeToken(account.account_name, symbol);
    handleClose();
  };

  render() {
    const { open, handleClose, symbol } = this.props;

    return (
      <Transition visible={open} animation="scale" duration={500}>
        <Modal open={open} size="mini">
          <Modal.Content>
            <Modal.Description>
              <p>Remove {symbol} token?</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.removeToken}>Remove</Button>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Actions>
        </Modal>
      </Transition>
    );
  }
}

const mapStateToProps = state => ({
  account: state.accounts.account
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      removeToken
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(TokenRemove);
