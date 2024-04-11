import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useGetAsyncStorage = (key, setData) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem(key);
        setData(data);
      } catch (error) {
        console.error('Error al obtener datos de AsyncStorage:', error);
      }
    };

    fetchData();
  }, [key, setData]);
};