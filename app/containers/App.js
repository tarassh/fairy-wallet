// @flow
import * as React from 'react';
import { Segment } from 'semantic-ui-react';

type Props = {
  children: React.Node
};

class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <Segment className="no-border no-padding no-background">
        {this.props.children}
      </Segment>
    );
  }
}

export default App;
