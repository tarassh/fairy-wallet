import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeToken } from '../../actions/settings';

class TokenRemove extends Component<Props> {

  removeToken = () => {
    const { account, handleClose, symbol } = this.props;
    this.props.actions.removeToken(account.account_name, symbol);
    handleClose();
  }

  render() {
    const {
      open,
      handleClose,
      symbol
    } = this.props;
  
    return (
      <Modal
        open={open}
        size='tiny'
      >
        <Modal.Content>
          <Modal.Description>
            <p>Remove {symbol} token?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={this.removeToken}>Remove</Button>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  account: state.accounts.account
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    removeToken
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TokenRemove);