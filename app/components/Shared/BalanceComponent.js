import React, { Component } from 'react';
import { Button, Label, Icon } from 'semantic-ui-react';

type Props = {
  account: {}
};

class BalanceComponent extends Component<Props> {
  render() {
    const { account } = this.props;
    const staked = `${parseFloat(account.voter_info.staked / 10000).toFixed(
      4
    )} EOS`;

    return (
      <Button as="div" labelPosition="right">
        <Button icon="dollar" basic />
        <Label as="div" basic style={{ borderRadius: 'unset' }}>
          <Icon name="lock open" color="grey" />
          {account.core_liquid_balance}
        </Label>
        <Label as="div" basic>
          <Icon name="lock" color="grey" />
          {staked}
        </Label>
      </Button>
    );
  }
}

export default BalanceComponent;
