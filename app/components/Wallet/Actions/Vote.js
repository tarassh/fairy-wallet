// @flow
import React, { Component } from 'react';
import {
  List,
  Icon,
  Checkbox,
  Button,
  Grid,
  Form,
  Menu
} from 'semantic-ui-react';
import { shell } from 'electron';
import _ from 'lodash';
import TransactionsModal from '../../Shared/TransactionsModal';
import { InputAccount } from '../../Shared/EosComponents';
import MainContentContainer from './../../Shared/UI/MainContent';
import ScrollingTable from './../../Shared/UI/ScrollingTable';

const numeral = require('numeral');

const MAX_VOTES = 30;
const HAPPY_PRODUCERS = 21;

type Props = {
  accounts: {},
  producers: { list: {} },
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

    _.map(producers, producer => Object.assign(votes, { [producer]: true }));

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
      producersList,
      activeItem: 'all'
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

    const { account } = nextProps.accounts;
    let { producers } = account.voter_info;
    if (!producers || producers === null) {
      producers = [];
    }

    const votes = {};

    _.map(producers, producer => Object.assign(votes, { [producer]: true }));

    if (!_.isEqual(votes, this.state.initialVotes)) {
      Object.assign(this.state, {
        initialVotes: _.clone(votes),
        actualVotes: _.clone(votes),
        disabled: true
      });
    }

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

  isExponential = number =>
    !!number.toString().match(/[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)/g);

  parsePercent = percent =>
    numeral(this.isExponential(percent) ? 0 : percent).format('0.00%');

  isValidUrl = url =>
    url.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
    );

  handleGoto = url => {
    shell.openExternal(url);
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  currentVotes = () => _.keys(this.state.actualVotes);

  toggle = (e, { id, checked }) => {
    if (
      this.currentVotes().length < MAX_VOTES ||
      this.state.actualVotes[id] === true
    ) {
      const { actualVotes } = this.state;
      if (checked === true) {
        actualVotes[id] = checked;
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

  handleChange = (e, { value }) => {
    this.setState({ filter: value });
  };

  renderProducer = (producer, producing) => (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Checkbox
            id={producer.owner}
            onChange={this.toggle}
            checked={
              this.state.actualVotes &&
              this.state.actualVotes[producer.owner] === true
            }
          />
        </Grid.Column>
        <Grid.Column width={1}>
          {producing ? (
            <Icon name="smile outline" />
          ) : (
            <Icon name="frown outline" />
          )}
        </Grid.Column>
        <Grid.Column width={4}>{producer.owner}</Grid.Column>
        <Grid.Column
          width={6}
          onClick={() => this.handleGoto(producer.url)}
          style={{ cursor: 'pointer' }}
        >
          {producer.url && this.isValidUrl(producer.url)
            ? producer.url
            : undefined}
        </Grid.Column>
        <Grid.Column width={3} textAlign="center">
          {this.parsePercent(producer.percent)}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  render() {
    const { loading, transactions } = this.props;
    const {
      openModal,
      disabled,
      producersList,
      filter,
      activeItem
    } = this.state;

    const isLoading = loading.GET_PRODUCERS === true;
    let filteredList = producersList;
    if (activeItem === 'checked') {
      filteredList = _.filter(
        filteredList,
        el => this.state.actualVotes[el.props.value] === true
      );
    }
    if (filter && filter.length > 0) {
      filteredList = _.filter(
        producersList,
        el => el.props.value.indexOf(filter) !== -1
      );
    }

    const menuFilter = (
      <Menu text widths={5}>
        <Menu.Item
          name="all"
          active={activeItem === 'all'}
          onClick={this.handleItemClick}
        >
          All
        </Menu.Item>
        <Menu.Item
          name="checked"
          active={activeItem === 'checked'}
          onClick={this.handleItemClick}
        >
          Selected
        </Menu.Item>
      </Menu>
    );

    return (
      <MainContentContainer 
        title="Vote for block producers" 
        subtitle="You can vote up to 30"
        content={
          <ScrollingTable 
            header={
              <Form loading={isLoading}>
                <TransactionsModal
                  open={openModal}
                  transactions={transactions}
                  handleClose={this.handleClose}
                />
                <Form.Group inline widths="equal">
                  <p className="tableheadertitle">
                    {this.currentVotes().length}/{MAX_VOTES}
                  </p>
                  {menuFilter}
                  <InputAccount
                    placeholder="Search block producer..."
                    size="tiny"
                    onChange={this.handleChange}
                    icon="search"
                  />
                  <Button onClick={this.vote} disabled={disabled}>
                    Vote
                  </Button>
                </Form.Group>
              </Form>
              }
            content={
              <List divided relaxed className="scrollable">
                {!isLoading ? filteredList : undefined}
              </List>
              }
          />

          // </Form>
      }
      />

      // <div>
      //   <p className="title">Vote for block producers</p>
      //   <p className="subtitle">You can vote up to 30</p>
      //   <br />
      //   <Form loading={isLoading} className="producers-list">
      //     <TransactionsModal
      //       open={openModal}
      //       transactions={transactions}
      //       handleClose={this.handleClose}
      //     />
      //     <Form.Group inline widths="equal">
      //       <p className="tableheadertitle">
      //         {this.currentVotes().length}/{MAX_VOTES}
      //       </p>
      //       {menuFilter}
      //       <InputAccount
      //         placeholder="Search block producer..."
      //         size="tiny"
      //         onChange={this.handleChange}
      //         icon="search"
      //       />
      //       <Button onClick={this.vote} disabled={disabled}>
      //         Vote
      //       </Button>
      //     </Form.Group>
      //     <List divided relaxed className="scrollable">
      //       {!isLoading ? filteredList : undefined}
      //     </List>
      //   </Form>
      // </div>
    );
  }
}
