// @flow
import React, { Component } from 'react';
import { Button, Container, Form, Input } from 'semantic-ui-react';

class ConnectionContainer extends Component<Props> {
    render() {
      return (
        <Form>
          <Form.Field
            autoFocus
            control={Input}
            label="Node URL"
            placeholder="https://"
          />
          <Container textAlign="center">
            <Button
              content="Connect"
              icon="exchange"
              primary
              style={{ marginTop: '1em' }}
            />
          </Container>
        </Form>
      );
    }
}

export default ConnectionContainer;