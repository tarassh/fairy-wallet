import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

type Props = {
  accounts: {},
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
    const { accounts } = this.props;
    const { text } = this.state;

    return (
      <Dropdown
        icon="user"
        floating
        labeled
        button
        basic
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
