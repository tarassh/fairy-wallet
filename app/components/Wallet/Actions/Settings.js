import _ from 'lodash';
import React, { Component } from 'react';
import { Grid, Dropdown, List } from 'semantic-ui-react';
import MainContentContainer from './../../Shared/UI/MainContent';

type Props = {
  settings: {},
  actions: {}
};

export default class Settings extends Component<Props> {
  state = { }
  
  handleChange = (e, { value }) => { 
    const { actions } = this.props;
    actions.setDefaultExplorer(value);
    this.setState({ value }); 
  }

  renderExplorer = () => {
    const { settings } = this.props;
    const { value } = this.state;
    const explorers = _.map(settings.explorers, el => ({ key: el.key, value: el.key, text: el.key, path: el.path}));
    const defaultValue = explorers[0].value;

    return (
      <List.Item>
        <p className='title'>Blockchain Explorer</p>
        <List.Content>
          <Dropdown 
            selection 
            options={explorers} 
            defaultValue={defaultValue}
            value={value} 
            onChange={this.handleChange}
          />
        </List.Content>
      </List.Item>
    )    
  }

  renderSettings = () => (
    <span>
      <List divided>
        {this.renderExplorer()}
      </List>
    </span>
    )

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
