import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const useLogout = () => {
  const navigation = useNavigation();

  const handleLogout = useCallback(async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error al cerrar la sesión:', error);
    }
  }, [navigation]);

  return handleLogout;
};
