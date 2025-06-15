import { useState } from 'react';
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

  const [selectedGrades, setSelectedGrades] = useState(['']);

  return (
    <Portal>
      <Dialog visible={open} onDismiss={handleDismiss}>
        <Dialog.Title>GradeRange</Dialog.Title>
        <Dialog.Content>
          <GradeRangeSelector selectedGrades={selectedGrades} onChange={setSelectedGrades} />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default GradeRangeDialog;
