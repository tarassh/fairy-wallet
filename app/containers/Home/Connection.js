// @flow
import React, { Component } from 'react';
import { Button, Container, Form, Message, Search } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { createConnection } from '../../actions/connection';

class ConnectionContainer extends Component<Props> {
  state = {
    value: '',
    results: []
  };

  onConnect = () => {
    this.props.createConnection(this.state.value);
  };

  onResultSelect = (e, { result }) => {
    this.setState({ value: result.text });
  };

  onChange = (e, { value }) => {
    const { nodes } = this.props.settings;
    const source = [];

    nodes.forEach(element => {
      source.push(Object.assign({}, element, { title: element.text }));
    });

    this.setState({ value });

    setTimeout(() => {
      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.text);

      this.setState({ results: _.filter(source, isMatch) });
    }, 300);
  };

  render() {
    const { loading, connection } = this.props;

    const { results } = this.state;

    let disabled = false;
    if (loading.CREATE_CONNECTION) {
      disabled = true;
    }

    let errorMessage = '';
    if (!disabled && connection.err !== null) {
      errorMessage = (
        <Message
          error
          header="Failed to connect"
          content={connection.err ? connection.err.message : 'error'}
        />
      );
    }

    return (
      <Form error>
        <Form.Field
          autoFocus
          control={Search}
          label="Node URL"
          onSearchChange={this.onChange}
          onResultSelect={this.onResultSelect}
          placeholder="https://"
          disabled={disabled}
          loading={disabled}
          results={results}
          resultRenderer={({ text }) => text}
          icon={false}
        />
        {errorMessage}
        <Container textAlign="center">
          <Button
            loading={disabled}
            content="Connect"
            disabled={disabled}
            primary
            onClick={this.onConnect}
            style={{ marginTop: '1em' }}
          />
        </Container>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    connection: state.connection,
    settings: state.settings
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createConnection
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  ConnectionContainer
);
