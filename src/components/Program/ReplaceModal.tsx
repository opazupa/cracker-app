import { Button, Modal, Row, Text, useModal } from '@nextui-org/react';
import React from 'react';

import { useAppContext } from '../../hooks/useAppContext';
import { calculateAmount, convert, REPLACEMENTS } from '../../meals';
import { Food, Replacement } from '../../types';
import CodeLink from '../CodeLink';

const ReplaceModal: React.FC<
  Pick<ReturnType<typeof useModal>, 'bindings' | 'setVisible'> & {
    component?: Food;
    onReplace: (toReplace: string, replacement: Replacement) => void;
  }
> = ({ setVisible, onReplace, bindings, component }) => {
  const { mealMultiplier, programDay } = useAppContext();
  if (!component || !component.amount) return null;

  const handleReplace = (replacement: Replacement) => {
    onReplace(component.name, replacement);
    setVisible(false);
  };

  const amountToBeReplaced = calculateAmount(
    component,
    mealMultiplier,
    programDay,
  );

  return (
    <Modal
      scroll
      width="80%"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      {...bindings}
    >
      <Modal.Header>
        <Row align="center" css={{ gap: '$3' }}>
          <Text size={18} b>
            Replacing:
          </Text>
          {`${amountToBeReplaced}g ${component.name}`}
        </Row>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {/* TODO look replacements */}
          {/* TODO use conversions */}
          {REPLACEMENTS.filter((r) => r.category === component.category).map(
            (replacement) => {
              const convertedAmount = convert(
                amountToBeReplaced,
                component.name,
                replacement.name,
              );
              return (
                <li key={replacement.name}>
                  <Row
                    align="center"
                    justify="space-between"
                    css={{ gap: '$3' }}
                  >
                    {/* Convert amount from */}
                    {amountToBeReplaced && `${convertedAmount}g`}{' '}
                    {replacement.name}
                    <CodeLink
                      text="Replace"
                      onClick={() => handleReplace(replacement)}
                    />
                  </Row>
                </li>
              );
            },
          )}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={() => setVisible(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ReplaceModal;
