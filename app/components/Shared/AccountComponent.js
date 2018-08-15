import React, { Component } from 'react';
import { Dropdown, Segment, Button, Grid } from 'semantic-ui-react';
import _ from 'lodash';
import PublicKeyIcon from './PublicKeyIcon';

type Props = {
  accounts: {},
  loading: {},
  onAccountSwitch: string => {}
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

    /*
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
    */
    
    return (
      <Segment className='no-border account'>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Button circular basic icon='user' loading={isLoading} />
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

export default AccountComponent;
