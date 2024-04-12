import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


export async function useEditarUnElemento(url, id, est, value) {
    const nurl = `${url}/${id}`;
    const token = await AsyncStorage.getItem("token");
  
    try {
      const response = await axios.get(nurl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const elemento = response.data;
      elemento[est] = value;
      await axios.put(nurl, elemento, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }