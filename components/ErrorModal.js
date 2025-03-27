import React from 'react';
import { Portal, Dialog, Paragraph, Button } from 'react-native-paper';

const ErrorModal = ({ visible, onDismiss, message }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Erro</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ErrorModal;