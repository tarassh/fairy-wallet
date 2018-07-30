// @flow
import React, { Component } from 'react';
import { Button, Form, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPublicKey } from '../../actions/ledger';
import wakeupDevice from '../../../resources/images/wakeup-device.svg';

class InactivityContainer extends Component<Props> {
  retry = () => {
    this.props.getPublicKey();
  };

  render() {
    const { loading } = this.props;

    const noAccountsText = `Cannot read device properties. Make sure your device is unlocked.`;

    let disabled = false;
    if (loading.CREATE_CONNECTION) {
      disabled = true;
    }

    return (
      <Form>
        <Image src={wakeupDevice} centered />
        <p>{noAccountsText}</p>
        <Button
          content="Retry"
          disabled={disabled}
          onClick={this.retry}
          style={{ paddingTop: '1em' }}
        />
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPublicKey
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  InactivityContainer
);
