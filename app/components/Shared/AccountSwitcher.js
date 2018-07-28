import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import _ from 'lodash';

type Props = {
  accounts: {},
  loading: {},
  onAccountSwitch: string => {}
};

class AccountSwitcher extends Component<Props> {
  constructor(props) {
    super(props);
    const { accounts } = this.props;
    this.state = {
      text: accounts.names[accounts.activeAccount]
    };
  }

  handleChange = (e, { text }) => {
    if (this.state.text !== text) {
      const { onAccountSwitch } = this.props;
      onAccountSwitch(text);
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

    return (
      <Dropdown
        icon="user"
        floating
        labeled
        button
        basic
        loading={isLoading}
        className="icon"
        text={text}
      >
        <Dropdown.Menu>
          {accounts.names.map(option => (
            <Dropdown.Item
              key={option}
              value={option}
              text={option}
              onClick={this.handleChange}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default AccountSwitcher;
