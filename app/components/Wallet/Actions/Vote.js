// @flow
import React, { Component } from 'react';
import { List, Segment, Icon, Checkbox, Button, Label } from 'semantic-ui-react';
import { shell } from 'electron';
import _ from 'lodash'; 
import TransactionsModal from '../../Shared/TransactionsModal';

const MAX_VOTES = 30;

type Props = {
  accounts: {},
  producers: {},
  loading: {},
  transactions: {},
  voteProducer: () => {},
  resetState: () => {},
  getAccount: string => {},
  getActions: string => {}
};

export default class Vote extends Component<Props> {
  props: Props;

  state = {
    openModal: false
  };

  vote = () => {
    const { voteProducer } = this.props;
    const producers = this.currentVotes();
    voteProducer(producers);
    this.setState({openModal: true});
  };

  isValidUrl = url => url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

  handleGoto = (e, { url }) => {
    shell.openExternal(url);
  }

  currentVotes = () => (_.filter(_.keys(this.state), (producer) => ( this.state[producer] )));

  toggle = (e, { id, checked } ) => {
    if (this.currentVotes().length < MAX_VOTES || this.state[id] === true){
      return this.setState({ [id]: checked })
    };
    this.forceUpdate();
  };

  handleClose = () => {
    const { accounts } = this.props;
    this.props.resetState();
    this.setState({ openModal: false });
    this.props.getAccount(accounts.account.account_name);
    this.props.getActions(accounts.account.account_name);
  };

  render() {
    const { producers, loading, transactions } = this.props;
    const { openModal } = this.state;

    let isLoading = false;
    _.forEach(loading, value => {
      if (value === true) {
        isLoading = true;
        return false;
      }
    });

    const producersRender = 
        _.map(producers.list, producer => (
          <List.Item as="a" key={producer.key} value={producer.owner} onClick={this.getInfo}>
            <List.Content floated='left'>
              <Checkbox id={producer.owner} onChange={this.toggle} checked={this.state[producer.owner] === true} />
              <Icon name='transgender alternate' />
            </List.Content>
            <List.Content floated='left'>
              <List.Description>{producer.owner}</List.Description>
            </List.Content>
            <List.Content floated='right'>
              {producer.url && this.isValidUrl(producer.url) ?
                <Button className='no-border' basic compact size='tiny' icon url={producer.url} onClick={this.handleGoto}>
                  {producer.url}
                  <Icon name='right arrow' />
                </Button> : ""}
            </List.Content>
          </List.Item>));

    return (
      <Segment loading={isLoading} className="no-border producers-list">
        <TransactionsModal
          open={openModal}
          transactions={transactions}
          handleClose={this.handleClose}
        />
        <Label>{this.currentVotes().length}\{MAX_VOTES}</Label>
        <List divided relaxed className="scrollable">
          {!isLoading ? producersRender : ""}
        </List>
        <Button fluid floated='right' basic onClick={this.vote}>Vote</Button>
      </Segment>);
  }
}