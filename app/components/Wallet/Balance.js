// @flow
import _ from 'lodash';
import React, { Component } from 'react';
import { Icon, Label, Table, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToken } from '../../actions/settings'

type Props = {
  accounts: {},
  actions: {}
};

class Balance extends Component<Props> {

  componentWillMount() {
  }

  componentDidUpdate() {
    const { account_name } = this.props.accounts.account;
    if (account_name) {
      this.addToken(account_name, 'JUNGLE');
      this.addToken(account_name, 'EOS');
    }
  }

  addToken = (account, token) => {
    this.props.actions.addToken(account, token);
  }

  render() {
    const {
      accounts
    } = this.props;

    const tableData = [
      { currency: 'EOS', total: 15000 },
      { currency: 'Amber', total: 40000 },
      { currency: 'ShittyToken', total: 2500 },
      { currency: 'EosDolliar', total: 700000 },
    ]

    return (
      <Segment.Group className='no-border no-padding'>
        <Segment>
          <Label>
            Account:
            <Label.Detail>
              {accounts.account.account_name}
            </Label.Detail>
          </Label>
        </Segment>
        <Segment>
          <Label>
            Balance:
            <Label.Detail>
              {accounts.account.core_liquid_balance}
            </Label.Detail>
          </Label>
        </Segment>
        <Segment>
          <Icon link name='plus square outline' onClick={this.addToken} />
        </Segment>
        <Segment>
          <Table celled basic='very' compact='very' unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  Currency
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Total
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_.map(tableData, ({ currency, total }) => (
                <Table.Row key={currency}>
                  <Table.Cell collapsing>{currency}</Table.Cell>
                  <Table.Cell collapsing>{total}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
      </Segment.Group>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addToken
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Balance);