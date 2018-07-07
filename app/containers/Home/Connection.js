// @flow
import React, { Component } from 'react';
import { Button, Container, Form, Input } from 'semantic-ui-react';
import * as states from '../../actions/states';
import { createConnection, test } from '../../actions/connection';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ConnectionContainer extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = { nodeUrl: '' };
    }
    
    onConnect = () => {
        return this.props.createConnection(this.state.nodeUrl);
    }
    
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

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        createConnection: createConnection
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(ConnectionContainer)