import  axios  from 'axios';
import { useNavigation } from '@react-navigation/native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { useCallback, useEffect } from 'react';

export async function useAgregarElemento(url, requestData) {
    // const handleLogout = useLogout();
    try {
      const token = await AsyncStorage.getItem("token");
      
      const response = await axios.post(url, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response; // Retorna el resultado de la solicitud POST
    } catch (error) {
      console.log("dd")
      throw error; // 
    }
  }