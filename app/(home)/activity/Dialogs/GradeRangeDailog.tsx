import { Portal, Dialog } from 'react-native-paper';

import GradeRangeSelector from '@/components/GradeRangeSelector';
import { useUser } from '@/contexts/UserContext';
interface IGradeRangeDialog {
  open: boolean;
  value: string[];
  setValue: (val: string[]) => void;
  onDismiss: (bol: boolean) => void;
}

const GradeRangeDialog = (props: IGradeRangeDialog) => {
  const { open, onDismiss, setValue, value } = props;
  const handleDismiss = () => onDismiss(false);
  const { user } = useUser();

  return (
    <Portal>
      {open && (
        <Dialog visible={open} onDismiss={handleDismiss}>
          <Dialog.Content>
            <GradeRangeSelector
              value={value}
              setValue={setValue}
              onDismiss={onDismiss}
              gradeStyle={user.grade_style}
            />
          </Dialog.Content>
        </Dialog>
      )}
    </Portal>
  );
};

export default GradeRangeDialog;
