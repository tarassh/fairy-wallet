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
        this.props.children
    );
  }
}
