import { Button, Modal, Text, useModal } from '@nextui-org/react';
import React from 'react';

const ReplaceModal: React.FC<
  Pick<ReturnType<typeof useModal>, 'bindings' | 'setVisible'>
> = ({ setVisible, bindings }) => {
  return (
    <Modal
      scroll
      width="80%"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      {...bindings}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Modal for replacing components
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text id="modal-description">TODO list of options for conversion</Text>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={() => setVisible(false)}>
          Close
        </Button>
        <Button auto onPress={() => setVisible(false)}>
          Agree
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ReplaceModal;
