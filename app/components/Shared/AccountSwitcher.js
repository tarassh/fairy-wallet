import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

type Props = {
  accounts: {},
  onChange: () => {}
};

class AccountSwitcher extends Component<Props> {
  render() {
    const { accounts, onChange } = this.props;

    return (
      <Dropdown
        icon="user"
        floating
        labeled
        button
        basic
        className="icon"
        text={accounts.names[accounts.activeAccount]}
        onChange={onChange}
      >
        <Dropdown.Menu>
          {accounts.names.map(option => (
            <Dropdown.Item key={option} value={option} text={option} />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default AccountSwitcher;
