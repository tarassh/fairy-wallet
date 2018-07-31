// @flow
import * as React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Segment, Modal, Button, Message } from 'semantic-ui-react';
import { reset } from '../actions/failure';

type Props = {
  children: React.Node,
  failure: {},
  actions: {}
};

class App extends React.Component<Props> {
  props: Props;

  handleClose = () => {
    const { actions } = this.props;
    actions.reset();
  };

  render() {
    const { failure } = this.props;

    const messages = [];
    _.forEach(failure, (value, key) => {
      messages.push(`${key} - ${value}`);
    });

    return (
      <Segment className="no-border no-padding no-background">
        <Modal
          open={!_.isEmpty(failure)}
          onClose={this.handleClose}
          as={Message}
          negative
          size="tiny"
        >
          <Modal.Content>{messages.toString()}</Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Actions>
        </Modal>
        {this.props.children}
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    failure: state.failure
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        reset
      },
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
