import { Button, Modal, Row, Text, useModal } from '@nextui-org/react';
import React from 'react';

import { useAppContext } from '../../hooks/useAppContext';
import { getConversions } from '../../services';
import { Food, Replacement } from '../../types';
import { convert } from '../../utils';
import CodeLink from '../CodeLink';

const ReplaceModal: React.FC<
  Pick<ReturnType<typeof useModal>, 'bindings' | 'setVisible'> & {
    component?: Food;
    onReplace: (toReplace: string, replacement: Replacement) => void;
  }
> = ({ setVisible, onReplace, bindings, component }) => {
  const { calculateAmount } = useAppContext();
  if (!component || !component.amount) return null;

  const handleReplace = (replacement: Replacement) => {
    onReplace(component.name, replacement);
    setVisible(false);
  };

  const amountToBeReplaced = calculateAmount(component);
  const conversions = getConversions();

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
          {Object.keys(conversions[component.category]).map((replacement) => {
            const convertedAmount = convert(
              amountToBeReplaced,
              component.name,
              replacement,
            );
            return (
              <li key={replacement}>
                <Row align="center" justify="space-between" css={{ gap: '$3' }}>
                  {convertedAmount ? `${convertedAmount}g` : '-'} {replacement}
                  <CodeLink
                    text="replace"
                    onClick={() =>
                      handleReplace({
                        name: replacement,
                        category: component.category,
                      })
                    }
                  />
                </Row>
              </li>
            );
          })}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Row justify="center">
          <Button auto color="gradient" onPress={() => setVisible(false)}>
            close
          </Button>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};
export default ReplaceModal;
