import { Portal, Dialog } from 'react-native-paper';

import GradeRangeSelector from '@/components/GradeRangeSelector';
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
        <Dialog.Content>
          <GradeRangeSelector />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default GradeRangeDialog;
