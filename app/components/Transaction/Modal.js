// @flow
import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

type Props = {
  title: string,
  action: {}
};

export default class Home extends Component<Props> {
  props: Props;
  state = { open: false };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open } = this.state;
    const { title } = this.props;

    return (
      <Modal centered open={open}>
        <Modal.Header content={title} />
      </Modal>
    );
  }
}
