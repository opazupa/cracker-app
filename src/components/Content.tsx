import {
  Button,
  Collapse,
  Grid,
  Modal,
  Text,
  useModal,
} from '@nextui-org/react';
import confetti from 'canvas-confetti';
import React from 'react';
import { useSwipeable } from 'react-swipeable';

export const Content = () => {
  const { setVisible, bindings } = useModal();
  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      console.log('User Swiped!', eventData);
      confetti();
    },
  });
  return (
    <div {...handlers}>
      <Button auto shadow color="secondary" onPress={() => setVisible(true)}>
        Open modal
      </Button>
      <Modal
        scroll
        width="80%"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Modal with a lot of content
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text id="modal-description">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
          </Text>
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
      <Grid.Container gap={2}>
        <Grid>
          <Collapse
            shadow
            title="Option"
            subtitle="More description about Option"
          >
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </Collapse>
        </Grid>
        <Grid>
          <Collapse.Group shadow>
            <Collapse title="Option A">
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Text>
            </Collapse>
            <Collapse title="Option B">
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Text>
            </Collapse>
            <Collapse title="Option C">
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Text>
              <Button
                auto
                shadow
                color="secondary"
                onPress={() => setVisible(true)}
              >
                Open modal
              </Button>
            </Collapse>
          </Collapse.Group>
        </Grid>
      </Grid.Container>
    </div>
  );
};
