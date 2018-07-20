// @flow
import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

export default class ModalComponent extends Component<Props> {
  props: Props;

  render() {
    const { open, content, actions, onActionClick } = this.props;

    return (
      <Modal
        content={content}
        actions={actions}
        open={open}
        onActionClick={onActionClick}
      />
    );
  }
}
