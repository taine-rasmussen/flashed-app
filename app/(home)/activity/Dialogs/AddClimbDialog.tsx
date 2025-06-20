import { useState } from 'react';
import { Dialog, Portal } from 'react-native-paper';

import GradeRangeSelector from '@/components/GradeRangeSelector';
import { GradeStyle } from '@/types';

interface IAddClimbDialog {
  open: boolean;
  gradeStyle: GradeStyle;
  onDismiss: (bol: boolean) => void;
}

const AddClimbDialog = (props: IAddClimbDialog) => {
  const { open, onDismiss, gradeStyle } = props;
  const [stagedClimb, setStagedClimb] = useState({ grade: [''], attempts: 0 });

  const setGrade = (grade: string[]) => {
    setStagedClimb(prev => ({ ...prev, grade }));
  };

  return (
    <Portal>
      {open && (
        <Dialog visible={open} onDismiss={() => onDismiss(false)}>
          <Dialog.Content>
            <GradeRangeSelector
              value={stagedClimb.grade}
              setValue={setGrade}
              gradeStyle={gradeStyle}
              multiSelect={false}
            />
          </Dialog.Content>
        </Dialog>
      )}
    </Portal>
  );
};

export default AddClimbDialog;
