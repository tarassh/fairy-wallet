import React, { Component } from 'react';
import { connect } from 'react-redux';
import Settings from '../../../components/Wallet/Actions/Settings';

type Props = {
  settings: {},
  actions: {}
};

class SettingsContainer extends Component<Props> {
  render() {
    const { settings, actions } = this.props;

    return (
      <Settings
        settings={settings}
        actions={actions}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
  };
}

export default connect(mapStateToProps, null)(SettingsContainer);
