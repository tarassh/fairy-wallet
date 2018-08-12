// @flow
import React, { Component } from 'react';
import {
  List,
  Segment,
  Icon,
  Checkbox,
  Button,
  Divider,
  Grid,
  Form
} from 'semantic-ui-react';
import { shell } from 'electron';
import _ from 'lodash';
import TransactionsModal from '../../Shared/TransactionsModal';
import { InputAccount } from '../../Shared/EosComponents';

const numeral = require('numeral');

const MAX_VOTES = 30;
const HAPPY_PRODUCERS = 21;

type Props = {
  accounts: {},
  producers: {},
  loading: {},
  transactions: {},
  voteProducer: () => {},
  resetState: () => {},
  getAccount: string => {}
};

export default class Vote extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      openModal: false
    };

    const { account } = props.accounts;
    let { producers } = account.voter_info;
    if (!producers || producers === null) {
      producers = [];
    }

    const votes = {};

    _.map(producers, producer => (
      Object.assign(votes, { [producer]: true })
    ));

    const producersList = _.map(props.producers.list, (producer, index) => (
      <List.Item key={producer.key} value={producer.owner}>
        <List.Content>
          {this.renderProducer(producer, index + 1 <= HAPPY_PRODUCERS)}
        </List.Content>
      </List.Item>
    ));

    Object.assign(this.state, {
      initialVotes: _.clone(votes),
      actualVotes: _.clone(votes),
      disabled: true,
      producersList
    });
  }

  componentWillReceiveProps(nextProps) {
    const producersList = _.map(nextProps.producers.list, (producer, index) => (
      <List.Item key={producer.key} value={producer.owner}>
        <List.Content>
          {this.renderProducer(producer, index + 1 <= HAPPY_PRODUCERS)}
        </List.Content>
      </List.Item>
    ));
    Object.assign(this.state, {
      producersList
    });
  }

  vote = () => {
    const { voteProducer } = this.props;
    const producers = this.currentVotes();
    this.setState({ openModal: true });
    voteProducer(producers);
  };

  isValidUrl = url =>
    url.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
    );

  handleGoto = url => {
    shell.openExternal(url);
  };

  currentVotes = () => _.keys(this.state.actualVotes);

  toggle = (e, { id, checked }) => {
    if (this.currentVotes().length < MAX_VOTES || this.state.actualVotes[id] === true) {
      const { actualVotes } = this.state;
      if (checked === true) {
        actualVotes[id] = checked
      } else {
        delete actualVotes[id];
      }
      const disabled = _.isEqual(this.state.initialVotes, actualVotes);
      const { producersList } = this.state;

      const index = producersList.findIndex(el => el.props.value === id);
      const producer = this.props.producers.list[index];
      producersList[index] = (
        <List.Item key={producer.key} value={producer.owner}>
          <List.Content>
            {this.renderProducer(producer, index + 1 <= HAPPY_PRODUCERS)}
          </List.Content>
        </List.Item>
      );

      return this.setState({ actualVotes, disabled, producersList });
    }
    this.forceUpdate();
  };

  handleClose = () => {
    const { accounts } = this.props;
    this.props.resetState();
    this.setState({ openModal: false });
    this.props.getAccount(accounts.account.account_name);
  };

  handleChange = (e, { name, value }) => {
  };

  renderProducer = (producer, producing) => (
    <Grid>
      <Grid.Row>
        <Grid.Column widht={1}>
          <Checkbox
            id={producer.owner}
            onChange={this.toggle}
            checked={this.state.actualVotes[producer.owner] === true}
          />
        </Grid.Column>
        <Grid.Column widht={1}>
          {producing ? (
            <Icon name="smile outline" />
          ) : (
            <Icon name="frown outline" />
          )}
        </Grid.Column>
        <Grid.Column width={4}>{producer.owner}</Grid.Column>
        <Grid.Column
          width={7}
          onClick={() => this.handleGoto(producer.url)}
          style={{ cursor: 'pointer' }}
        >
          {producer.url && this.isValidUrl(producer.url)
            ? producer.url
            : undefined}
        </Grid.Column>
        <Grid.Column width={3} textAlign="center">
          {numeral(producer.percent).format('0.00%')}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  render() {
    const { loading, transactions } = this.props;
    const { openModal, disabled, producersList } = this.state;

    const isLoading = loading.GET_PRODUCERS === true;

    return (
      <Form>
        <Segment loading={isLoading} className="no-border producers-list">
          <TransactionsModal
            open={openModal}
            transactions={transactions}
            handleClose={this.handleClose}
          />
          <InputAccount 
            placeholder="Search block producer..." 
            fluid 
            size='tiny' 
            onChange={this.handleChange} 
            icon='search' 
          />
          <Button fluid floated="right" onClick={this.vote} size='tiny' disabled={disabled}>
            Vote
          </Button>
          <Divider horizontal style={{ padding: '1em' }}>
            <h5>
              {this.currentVotes().length} / {MAX_VOTES}
            </h5>
          </Divider>
          <List divided relaxed className="scrollable">
            {!isLoading ? producersList : undefined}
          </List>
        </Segment>
      </Form>
    );
  }
}
