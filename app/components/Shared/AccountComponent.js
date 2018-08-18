import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, Button } from 'semantic-ui-react';
import _ from 'lodash';
import PublicKeyIcon from './PublicKeyIcon';
import { setActiveAccount } from '../../actions/accounts';
import FairyDataBlock from './UI/FairyDataBlock';
import FairyMenu from './UI/FairyMenu'; 

type Props = {
  accounts: {},
  loading: {},
  actions: {}
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
      <Dropdown.Item key={option} text={option} onClick={this.handleChange} />
    ));

    const trigger = <Button circular basic icon="user" loading={isLoading} />;

    return (
      <FairyMenu>
        <FairyMenu.MenuItem>
          <FairyDataBlock 
            data={
              <Dropdown icon={null} trigger={trigger} pointing='top left'>
                <Dropdown.Menu>{options}</Dropdown.Menu>
              </Dropdown>
            }
            description={
              <p className="subtitle">{text}</p>
            }
          />
        </FairyMenu.MenuItem>
        <FairyMenu.MenuItem>
          <FairyDataBlock 
            data={
              <PublicKeyIcon />
              }
            description={
              <p className="subtitle">Public Key</p>
              }
          />
        </FairyMenu.MenuItem>
      </FairyMenu>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ setActiveAccount }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(AccountComponent);
