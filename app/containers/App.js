// @flow
import * as React from 'react';
import { Segment } from 'semantic-ui-react';

type Props = {
  children: React.Node,
  settings: {}
};

class App extends React.Component<Props> {
  props: Props;

  componentDidMount() {
    const { settings } = this.props;

    if (settings.selectedTheme === 'dark')
      document.body.classList.add('dark-mode');
    else
      document.body.classList.remove('dark-mode');
  }

  render() {
    return (
      <Segment className="no-border no-padding no-background">
        {this.props.children}
      </Segment>
    );
  }
}

export default App;
