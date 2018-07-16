// @flow
import React, { Component } from 'react';
import { Button, Container, Form, Input, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createConnection } from '../../actions/connection';

class ConnectionContainer extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { nodeUrl: '' };
  }

  onConnect = () => {
    this.props.createConnection(this.state.nodeUrl)
  }

  getUrl = (e, { value }) => {
    this.setState({
      nodeUrl: value
    });
  }

  render() {
    const {
      loading,
      connection,
      settings
    } = this.props;

    let disabled = false;
    if (loading.CREATE_CONNECTION) {
      disabled = true;
    }

    let errorMessage = '';
    if (!disabled && connection.err !== null) {
      errorMessage = (<Message
        error
        header="Failed to connect"
        content={connection.err ? connection.err.message : 'error'}
      />);
    }

    return (
      <Form error>
        <Form.Field
          autoFocus
          control={Input}
          label="Node URL"
          onChange={this.getUrl}
          placeholder="https://"
          disabled={disabled}
        />
        {errorMessage}
        <Container textAlign="center">
          <Button
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
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createConnection
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionContainer)