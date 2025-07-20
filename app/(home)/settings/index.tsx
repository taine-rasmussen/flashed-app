import { Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

interface ISettings {
  open: boolean;
  handleDismiss: () => void;
}

const Settings = (props: ISettings) => {
  const { open, handleDismiss } = props;

  return (
    <Modal
      isVisible={open}
      onBackdropPress={() => handleDismiss()}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={750}
      animationOutTiming={750}
      useNativeDriver
      avoidKeyboard
    >
      <Text>SETTINGS</Text>
    </Modal>
  );
};

export default Settings;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
