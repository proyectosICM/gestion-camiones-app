import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect } from "react";

export function useListarElementos(url, setDatos) {
  const navigation = useNavigation();
  const fetchData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const results = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDatos(results.data);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        await AsyncStorage.clear();
        navigation.navigate("Login");
      }
    }
  }, [navigation, setDatos, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return fetchData;
}

export function useListarElementosPaginados(url, setDatos) {
  const navigation = useNavigation();
  const fetchData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const results = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDatos(results.data.content);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        await AsyncStorage.clear();
        navigation.navigate("Login");
      }
    }
  }, [navigation, setDatos, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return fetchData;
}
