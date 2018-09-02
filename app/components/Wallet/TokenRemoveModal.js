import _ from 'lodash';
import React, { Component } from 'react';
import { Button, Modal, Transition, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeToken } from '../../actions/settings';
import { tokenList } from '../Shared/TokenList';

class TokenRemove extends Component<Props> {
  removeToken = () => {
    const { account, handleClose, symbol, contract } = this.props;
    this.props.actions.removeToken(account.account_name, symbol, contract);
    handleClose();
  };

  render() {
    const { open, handleClose, symbol } = this.props;
    const token = _.find(tokenList, el => symbol === el.symbol);
    const logo = token ? token.logo : undefined;

    return (
      <Transition visible={open} animation="scale" duration={500}>
        <Modal open={open} size="mini">
          <Modal.Content>
            <Modal.Description>
              <p>
                Remove <Image src={logo} avatar /> {symbol} token?
              </p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.removeToken}>Remove</Button>
            <Button onClick={handleClose}>Cancel</Button>
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
