import { Portal, Dialog } from 'react-native-paper';

interface IGradeRangeDialog {
  open: boolean;
  setValue: any; // update when known
  onDismiss: (bol: boolean) => void;
}

const GradeRangeDialog = (props: IGradeRangeDialog) => {
  const { open, onDismiss } = props;
  const handleDismiss = () => onDismiss(false);

  return (
    <Portal>
      <Dialog visible={open} onDismiss={handleDismiss}>
        <Dialog.Title>GradeRange</Dialog.Title>
      </Dialog>
    </Portal>
  );
};

export default GradeRangeDialog;
