// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Button, Select, Segment } from 'semantic-ui-react';
import _ from 'lodash';
import { getActions } from '../../../actions/accounts';

type Props = {
  settings: {},
  accounts: {},
  actions: {}
};

class SendContainer extends Component<Props> {
  props: Props;

  getValue = (e, prop) => {
    prop = e.target.value;
  }

  render() {
    const {
      accounts,
      settings
    } = this.props;

    const tokens = _.map(settings.tokens[accounts.account.account_name], (token) => ({ text: token, value: token }));

    return (
      <Segment className='no-border'>
        <Form>
          <Form.Field
            id='form-input-control-recipient'
            control={Input}
            label='Recipient'
          />
          <Form.Group widths='equal'>
            <Form.Field
              id='form-textarea-control-amount'
              control={Input}
              label='Amount'
              placeholder='0.0000'
            />
            <Form.Field
              id='form-input-control-token'
              control={Select}
              label='Select token'
              options={tokens}
              defaultValue={['EOS']}
            />
          </Form.Group>
          <Form.Field
            id='form-button-control-public'
            control={Input}
            content='Memo'
            label='Memo'
          />
          <Form.Field
            id='form-button-control-public'
            control={Button}
            content='Next'
          />
        </Form>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    settings: state.settings
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SendContainer);
