import { Portal, Dialog } from 'react-native-paper';

import GradeRangeSelector from '@/components/GradeRangeSelector';
interface IGradeRangeDialog {
  open: boolean;
  value: string[];
  setValue: (val: string[]) => void;
  onDismiss: (bol: boolean) => void;
}

const GradeRangeDialog = (props: IGradeRangeDialog) => {
  const { open, onDismiss, setValue, value } = props;
  const handleDismiss = () => onDismiss(false);

  console.log(value);

  return (
    <Portal>
      {open && (
        <Dialog visible={open} onDismiss={handleDismiss}>
          <Dialog.Content>
            <GradeRangeSelector setValue={setValue} onDismiss={onDismiss} value={value} />
          </Dialog.Content>
        </Dialog>
      )}
    </Portal>
  );
};

export default GradeRangeDialog;
