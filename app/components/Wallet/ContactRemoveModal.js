// @flow
import React, { Component } from 'react';
import { Button, Modal, Transition } from 'semantic-ui-react';

type Props = {
  contact: {},
  actions: {},
  open: boolean,
  handleClose: () => {}
};

class ContactRemove extends Component<Props> {
  removeContact = () => {
    const { handleClose, actions, contact } = this.props;
    actions.removeContact(contact.name);
    handleClose();
  };

  render() {
    const { open, handleClose, contact } = this.props;

    return (
      <Transition visible={open} animation="scale" duration={200}>
        <Modal open={open} size="mini">
          <Modal.Content>
            <Modal.Description>
              <p>
                Remove {contact.title} ({contact.name}) contact?
              </p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.removeContact}>Remove</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Modal.Actions>
        </Modal>
      </Transition>
    );
  }
}

export default ContactRemove;
