import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View, ScrollView } from "react-native";
import { ColorIcono, fondoGeneral } from "../styles/paletaColores";
import { generalStyles } from "../styles/generalStyles";
import { useListarElementosPaginados } from "../hooks/useListUtils";
import { useGetAsyncStorage } from "../hooks/asyncStorageUtils";
import { camionesByEmpresaAndSedeAndTypeURL, camionesByEmpresaAndSedeURL } from "../api/apiurls";
import { Button } from "react-native-elements";
import { Picker } from "@react-native-picker/picker"; // Importar desde @react-native-picker/picker
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function MenuCamionPaginado() {
  const navigation = useNavigation();
  const [sedeId, setSedeId] = useState(null);
  const [empresaId, setEmpresaId] = useState(null);
  const [camionesData, setCamionesData] = useState(null);
  const [filtro, setFiltro] = useState("Todos");
  const [botonSeleccionado, setBotonSeleccionado] = useState("Todos");

  useGetAsyncStorage("sede", setSedeId);
  useGetAsyncStorage("empresa", setEmpresaId);

  const urlMap = {
    Todos: `${camionesByEmpresaAndSedeURL}?empresasId=${empresaId}&sedesId=${sedeId}&estado=0&page=0`,
    Camion: `${camionesByEmpresaAndSedeAndTypeURL}?empresasId=${empresaId}&sedesId=${sedeId}&estado=0&tiposCId=1&page=0`,
    Carreta: `${camionesByEmpresaAndSedeAndTypeURL}?empresasId=${empresaId}&sedesId=${sedeId}&estado=0&tiposCId=2&page=0`,
  };

  const ListarCamiones = useListarElementosPaginados(
    urlMap[filtro], // Utiliza la URL correspondiente al filtro seleccionado
    setCamionesData
  );

  useEffect(() => {
    ListarCamiones();
  }, [filtro]);

  const handleFiltroChange = (value) => {
    setFiltro(value);
    setBotonSeleccionado(value);

  };
 
  const handleVerInfo = async(id) => {
    await AsyncStorage.setItem("camionid", id.toString())

    navigation.navigate('Vehicle Info')
  }

  return ( 
    <ImageBackground source={fondoGeneral} style={generalStyles.backgroundImage}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={generalStyles.tittleText}>Mostrar por: </Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Todos"
              type="outline"
              buttonStyle={[
                generalStyles.styleButton,
                botonSeleccionado === "Todos" ? { borderColor: "green", borderWidth: 2 } : null,
                { marginTop: 15, marginRight: 10 },
              ]}
              titleStyle={generalStyles.textoButton}
              iconRight
              onPress={() => handleFiltroChange("Todos")}
            />
            <Button
              title="Camion"
              type="outline"
              buttonStyle={[
                generalStyles.styleButton,
                botonSeleccionado === "Camion" ? { borderColor: "green", borderWidth: 2 } : null,
                { marginTop: 15, marginRight: 10 },
              ]}
              titleStyle={generalStyles.textoButton}
              iconRight
              onPress={() => handleFiltroChange("Camion")}
            />
            <Button
              title="Carreta"
              type="outline"
              buttonStyle={[
                generalStyles.styleButton,
                botonSeleccionado === "Carreta" ? { borderColor: "green", borderWidth: 2 } : null,
                { marginTop: 15 },
              ]}
              titleStyle={generalStyles.textoButton}
              iconRight
              onPress={() => handleFiltroChange("Carreta")}
            />
          </View>
          <View style={styles.cardRow}>
            {camionesData ? (
              camionesData.map((camion, index) => (
                <View key={index} style={styles.cardContainer}>
                  <Text>ID: {camion.id}</Text>
                  <Text>Placa: {camion.placa}</Text>
                  <Text>Marca: {camion.marcasModel.nombre}</Text>
                  <Text>Modelo: {camion.modeloModel.nombre}</Text>
                  <Text>Tipo: {camion.tiposCModel.nombre}</Text>
                  <Button
                    title="Ver datos "
                    type="outline"
                    buttonStyle={[generalStyles.styleButton, { marginTop: 15 }]}
                    titleStyle={generalStyles.textoButton}
                    iconRight
                    onPress={() => handleVerInfo(camion.id)}
                  />
                </View>
              ))
            ) : (
              <Text>No hay datos de camiones disponibles</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row", // Mostrar los botones en una sola línea
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 10,
    marginBottom: 10,
    elevation: 2, // Para sombra en Android
    shadowColor: "#000", // Para sombra en iOS
    shadowOffset: { width: 0, height: 2 }, // Para sombra en iOS
    shadowOpacity: 0.2, // Para sombra en iOS
    shadowRadius: 4, // Para sombra en iOS
    width: "40%",
    alignContent: "center",
    alignItems: "center",
  },
});
