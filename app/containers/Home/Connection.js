// @flow
import React, { Component } from 'react';
import { Button, Container, Form, Message, Search } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { createConnection } from '../../actions/connection';

class ConnectionContainer extends Component<Props> {
  constructor(props) {
    super(props);

    const { nodes } = this.props.settings;

    this.state = {
      value: nodes.length === 0 ? '' : nodes[0].text,
      changing: false,
      results: []
    };
  }

  onConnect = () => {
    this.props.createConnection(this.state.value);
    this.setState({ changing: false });
  };

  onResultSelect = (e, { result }) => {
    this.setState({ value: result.text, changing: true });
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
    const { results, changing, value } = this.state;

    const disabled = !!loading.CREATE_CONNECTION;

    let errorMessage = '';
    if (!changing && !disabled && connection.err !== null) {
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
          resultRenderer={({ text }) => <p>{text}</p>}
          icon={false}
          value={value}
        />
        {errorMessage}
        <Container textAlign="center">
          <Button
            loading={disabled}
            content="Connect"
            disabled={disabled}
            onClick={this.onConnect}
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
