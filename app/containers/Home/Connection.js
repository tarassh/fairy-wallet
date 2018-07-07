// @flow
import React, { Component } from 'react';
import { Button, Container, Form, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createConnection } from '../../actions/connection';

class ConnectionContainer extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { nodeUrl: '' };
  }

  onConnect = () => this.props.createConnection(this.state.nodeUrl)

  getUrl = e => {
    this.state.nodeUrl = e.target.value;
  }

  render() {
    return (
      <Form>
        <Form.Field
          autoFocus
          control={Input}
          label="Node URL"
          onChange={this.getUrl}
          placeholder="https://"
        />
        <Container textAlign="center">
          <Button
            content="Connect"
            icon="exchange"
            primary
            onClick={this.onConnect}
            style={{ marginTop: '1em' }}
          />
        </Container>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createConnection
}, dispatch)

export default connect(null, mapDispatchToProps)(ConnectionContainer)