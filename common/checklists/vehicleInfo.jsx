import React, { useEffect, useState } from "react";
import { Alert, ImageBackground, StyleSheet, Text, View } from "react-native";
import { fondoGeneral } from "../../styles/paletaColores";
import { generalStyles } from "../../styles/generalStyles";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { expresoChecklistItems } from "./checklistDataArrays/expresoChecklistItems";
import { useGetAsyncStorage } from "../../hooks/asyncStorageUtils";
import { camionesURL } from "../../api/apiurls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useListarElementos } from "../../hooks/useListUtils";
import { carretaChecklistItems } from "./checklistDataArrays/carretaChecklistItems";

export function VehicleInfo() {
  const navigation = useNavigation();
  const [camionId, setCamionId] = useState();
  const [camionData, setCamionData] = useState();

  useGetAsyncStorage("camionid", setCamionId);

  const ListarData = useListarElementos(`${camionesURL}/${camionId}`, setCamionData);

  useEffect(() => {
    ListarData();
  }, [ListarData]);

  useEffect(() => {
    if (camionData) {
      if(camionData.tiposCModel.id == 1){
        AsyncStorage.setItem("tipoVehiculo", "camion");
      } else if(camionData.tiposCModel.id == 2){
        AsyncStorage.setItem("tipoVehiculo", "carreta");
      }

    }
  }, [camionData]);

  // await AsyncStorage.setItem("tipoVehiculo")

  return (
    <ImageBackground source={fondoGeneral} style={generalStyles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.cardRow}>
          <View style={styles.cardContainer}>
            <Text>Ver los registro de salida de los conductores (checklist camion - carreta)</Text>
            <Button
              title="Ver listas"
              buttonStyle={[generalStyles.styleButton, { marginTop: 15, width: "95%" }]}
              titleStyle={[generalStyles.textoButton, { textAlign: "center" }]}
              iconRight
              onPress={() => navigation.navigate("Listados checklist conductor")}
            />
          </View>
          <View style={styles.cardContainer}>
            <Text>Ver los checklist Expreso</Text>
            <Button
              title="Ver listas"
              buttonStyle={[generalStyles.styleButton, { marginTop: 15, width: "95%" }]}
              titleStyle={[generalStyles.textoButton, { textAlign: "center" }]}
              iconRight
              onPress={() => navigation.navigate("Listados checklist expreso")}
            />
          </View>
        </View>
        <View style={styles.cardRow}>
          <View style={styles.cardContainer}>
            <Text>Realizar checklist expreso</Text>
            <Button
              title="Realizar"
              buttonStyle={[generalStyles.styleButton, { marginTop: 15, width: "95%" }]}
              titleStyle={[generalStyles.textoButton, { textAlign: "center" }]}
              iconRight
              onPress={() =>
                navigation.navigate("CheckList Camion", {
                  tablesD: camionData.tiposCModel.id == 1 ? expresoChecklistItems : carretaChecklistItems,
                })
              }
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
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
    width: "40%", // Ajustado para que ocupe más espacio en la pantalla
    alignItems: "center",
  },
});
