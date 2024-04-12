import { Alert } from 'react-native';

export const useCustomAlert = () => {
  const showAlert = (title, message, options) => {
    Alert.alert(
      title,
      message,
      options,
      { cancelable: false }
    );
  };

  return showAlert;
};

