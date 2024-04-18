import React, { useEffect, useState, useCallback } from "react";
import { Text } from "react-native";
import { View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import { ActivityIndicator } from "react-native";
import { useGetAsyncStorage } from "../../hooks/asyncStorageUtils";
import { infoUserURL } from "../../api/apiurls";
import { useListarElementos } from "../../hooks/useListUtils";
import { generalStyles } from "../../styles/generalStyles";
import { useLogout } from "../../hooks/useLogout";

export function Redirect() {
  const navigation = useNavigation();
  const [info, setInfo] = useState();
  const [user, setUser] = useState(null);
  const [showText, setShowText] = useState(false);

  useGetAsyncStorage("username", setUser);

  const ListarInfo = useListarElementos(`${infoUserURL}${user}`, setInfo);

  useEffect(() => {
    if (user) {
      ListarInfo();
    }
  }, [user]);

  useEffect(() => {
    const obtenerDatosUser = async () => {
      if (info) {
        await AsyncStorage.setItem("rol", info.rolesModel.nombre);
        await AsyncStorage.setItem("empresa", info.empresasModel.id.toString());
        await AsyncStorage.setItem("sede", info.sedesModel.id.toString());
        await AsyncStorage.setItem("usuario", info.id.toString());

        if (info.rolesModel.id == 1) {
          navigation.navigate("Inicio Conductor");
        } else if (info.rolesModel.id == 2) {
          navigation.navigate("Inicio Mecanico");
        }
      }
    };
    obtenerDatosUser();
  }, [info, navigation]);

  const handleLogout = useLogout();

  return (
    <View style={generalStyles.container}>
      <ActivityIndicator size={100} color="black" style={{ marginVertical: 15 }} />
      {showText && (
        <>
          <Text style={generalStyles.tittleText}>Algo a fallado en su inico de sesion</Text>
          <Text style={generalStyles.tittleText}>Por favor cierra sesion </Text>
          <Text style={generalStyles.tittleText}>y comunicate con tu administrador</Text>
          <Button
            title="Cerrar Sesión"
            buttonStyle={generalStyles.styleButton}
            titleStyle={generalStyles.tittleText}
            onPress={() => handleLogout()}
          />
        </>
      )}
    </View>
  );
}
