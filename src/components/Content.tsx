import {
  Button,
  Collapse,
  Grid,
  Input,
  Modal,
  Spacer,
  Text,
  useModal,
} from '@nextui-org/react';
import React from 'react';

import { useAppContext } from '../hooks/useAppContext';

export const Content = () => {
  const { setVisible, bindings } = useModal();
  const { selectedDay, setSelectedDay, mealMultiplier, setMealMultiplier } =
    useAppContext();

  return (
    <>
      <Text b>Today is day {selectedDay === 1 ? '1-3' : selectedDay}</Text>
      <Button.Group color="secondary">
        <Button light={selectedDay > 3} onPress={() => setSelectedDay(1)}>
          1-3
        </Button>
        <Button light={selectedDay !== 4} onPress={() => setSelectedDay(4)}>
          4
        </Button>
        <Button light={selectedDay !== 5} onPress={() => setSelectedDay(5)}>
          5
        </Button>
      </Button.Group>
      <Text b>Meal multiplier {mealMultiplier / 100}</Text>
      <Input
        type="range"
        value={mealMultiplier}
        min={100}
        step={10}
        max={200}
        onChange={(e) => setMealMultiplier(parseInt(e.target.value, 10))}
      />
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
      <Spacer x={2} />
      <Button auto shadow color="secondary" onPress={() => setVisible(true)}>
        Open modal
      </Button>
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
            </Collapse>
          </Collapse.Group>
        </Grid>
      </Grid.Container>
    </>
  );
};
