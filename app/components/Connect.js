// @flow
import React, { Component } from 'react';
import { Button, Container, Form, Input } from 'semantic-ui-react';

class Connect extends Component<Props> {
    render() {
        return (
          <Form>
            <Form.Field
              autoFocus
              control={Input}
              placeholder="https://"
            />
            <Container textAlign="center">
              <Button
                content="Connect"
                primary
                size="small"
              />
            </Container>
          </Form>
        );
    }
}

export default Connect;