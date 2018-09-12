import _ from 'lodash';
import React, { Component } from 'react';
import { Dropdown, List, Icon, Grid } from 'semantic-ui-react';
import MainContentContainer from './../../Shared/UI/MainContent';
import ScrollingTable from './../../Shared/UI/ScrollingTable';

type Props = {
  settings: {},
  actions: {}
};

export default class Settings extends Component<Props> {
  state = {};

  setMode() {
    const { settings } = this.props;

    if (settings.selectedTheme === 'dark')
      document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
  }

  handleChange = (e, { name, value }) => {
    const { actions } = this.props;
    if (name === 'explorer') {
      actions.setDefaultExplorer(value);
      this.setState({ value });
    }

    if (name === 'theme') {
      actions
        .setTheme(value)
        .then(() => this.setMode())
        .catch();
    }
  };

  renderSelectTheme = () => {
    const { settings } = this.props;
    const themes = [
      {
        key: 'light',
        value: 'light',
        text: 'Light'
      },
      {
        key: 'dark',
        value: 'dark',
        text: 'Dark'
      }
    ];

    const defaultValue =
      settings && settings.selectedTheme
        ? _.find(themes, theme => theme.value === settings.selectedTheme).value
        : themes[0].value;

    return (
      <List.Item>
        <p className="tableheadertitle">
          <Icon name="paint brush" />Themes
        </p>
        <List.Content>
          <Grid columns={2} style={{ paddingBottom: '1rem' }}>
            <Grid.Column verticalAlign="middle" width={5}>
              Selected Theme
            </Grid.Column>
            <Grid.Column>
              <Dropdown
                name="theme"
                selection
                basic
                floating
                options={themes}
                defaultValue={defaultValue}
                onChange={this.handleChange}
              />
            </Grid.Column>
          </Grid>
        </List.Content>
      </List.Item>
    );
  };

  renderExplorer = () => {
    const { settings } = this.props;
    const { value } = this.state;
    const explorers = _.map(settings.explorers, el => ({
      key: el.key,
      value: el.key,
      text: el.key,
      path: el.path
    }));
    const defaultValue = explorers[0].value;

    return (
      <List.Item>
        <p className="tableheadertitle">
          <Icon name="chain" />Blockchain Explorer
        </p>
        <List.Content>
          <Grid columns={2} style={{ paddingBottom: '1rem' }}>
            <Grid.Column verticalAlign="middle" width={5}>
              Blockchain Explorer
            </Grid.Column>
            <Grid.Column>
              <Dropdown
                name="explorer"
                selection
                floating
                options={explorers}
                defaultValue={defaultValue}
                value={value}
                text={value}
                onChange={this.handleChange}
              />
            </Grid.Column>
          </Grid>
        </List.Content>
      </List.Item>
    );
  };

  renderSettings = () => (
    <ScrollingTable
      content={
        <span>
          <List divided relaxed>
            {this.renderExplorer()}
            {this.renderSelectTheme()}
          </List>
        </span>
      }
    />
  );

  render() {
    return (
      <MainContentContainer
        title="Settings"
        subtitle="Configure your wallet"
        className="adjust-content"
        content={this.renderSettings()}
      />
    );
  }
}
