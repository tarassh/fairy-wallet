import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import BalanceComponent from './BalanceComponent';

type Props = {
  accounts: {},
  onChange: () => {}
};

class AccountSwitcher extends Component<Props> {
  render() {
    const { accounts, onChange } = this.props;

    return (
      <div>
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
        <BalanceComponent account={accounts.account} />
      </div>
    );
  }
}

export default AccountSwitcher;
