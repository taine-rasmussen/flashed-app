import { Dialog, Portal } from 'react-native-paper';

interface IAddClimbDialog {
  open: boolean;
  onDismiss: (bol: boolean) => void;
}

const AddClimbDialog = (props: IAddClimbDialog) => {
  const { open, onDismiss } = props;
  return (
    <Portal>
      {open && (
        <Dialog visible={open} onDismiss={() => onDismiss(false)}>
          <Dialog.Title>Add Climb</Dialog.Title>
        </Dialog>
      )}
    </Portal>
  );
};

export default AddClimbDialog;
