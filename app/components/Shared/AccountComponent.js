import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, Segment, Button, Grid } from 'semantic-ui-react';
import _ from 'lodash';
import PublicKeyIcon from './PublicKeyIcon';
import { setActiveAccount } from '../../actions/accounts';

type Props = {
  accounts: {},
  loading: {},
  actions: { setActiveAccount: {} }
};

class AccountComponent extends Component<Props> {
  constructor(props) {
    super(props);
    const { accounts } = this.props;
    this.state = {
      text: accounts.names[accounts.activeAccount]
    };
  }

  handleChange = (e, { text }) => {
    const { accounts } = this.props;
    if (this.state.text !== text) {
      const index = accounts.names.indexOf(text);
      this.props.actions.setActiveAccount(index);
      this.setState({ text });
    }
  };

  render() {
    const { accounts, loading } = this.props;
    const { text } = this.state;
    let isLoading = false;
    _.forEach(loading, value => {
      if (value === true) {
        isLoading = true;
        return false;
      }
    });

    const options = _.map(accounts.names, option => (
      <Dropdown.Item text={option} onClick={this.handleChange} />
    ));

    const trigger = <Button circular basic icon="user" loading={isLoading} />;

    return (
      <Segment className="no-border account">
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Dropdown icon={null} trigger={trigger}>
                <Dropdown.Menu>{options}</Dropdown.Menu>
              </Dropdown>
              <p className="subtitle">{text}</p>
            </Grid.Column>
            <Grid.Column>
              <PublicKeyIcon />
              <p className="subtitle">Public Key</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ setActiveAccount }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(AccountComponent);
