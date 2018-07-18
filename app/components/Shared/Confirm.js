// @flow
import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

type Props = {
  open: false,
  content: '',
  actions: {},
  closable: true
};

export default class Confirm extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = { 
      open: props.open, 
      content: props.content, 
      actions: props.actions, 
      closable: props.closable 
    }
  }

  componentWillReceiveProps() {
    const { open, content, actions, closable } = this.props;
    this.setState({ open, content, actions, closable });
  }


  onActionClick = (event, data) => {
    this.setState({ open: false });
  }

  render() {
    const { open, content, actions, closable } = this.state

    return (
      <Modal
        content={content}
        actions={actions}
        open={open}
        closeOnDimmerClick={closable}
        closeOnDocumentClick={closable}
        onActionClick={this.onActionClick}
      />
    );
  }
}