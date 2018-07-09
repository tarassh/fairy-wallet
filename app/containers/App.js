// @flow
import * as React from 'react';
import { Segment, Container } from 'semantic-ui-react';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
        <Container>{this.props.children}</Container>
    );
  }
}
