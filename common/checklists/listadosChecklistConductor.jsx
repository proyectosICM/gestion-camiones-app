import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";

import { Button } from "react-native-elements";
import { fondoGeneral } from "../../styles/paletaColores";
import { generalStyles } from "../../styles/generalStyles";
import { useListarElementosPaginados } from "../../hooks/useListUtils";
import { useGetAsyncStorage } from "../../hooks/asyncStorageUtils";
import { rgsChecklistURL } from "../../api/apiurls";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function ListadosChecklistConductor() {
  const navigation = useNavigation();
  const [rgsData, setRgsData] = useState();
  const [camionId, setCamionId] = useState();

  useGetAsyncStorage("camionid", setCamionId);

  const ListarRgs = useListarElementosPaginados(`${rgsChecklistURL}?camionId=${camionId}`, setRgsData);

  useEffect(() => {
    ListarRgs();
  }, [ListarRgs]); 

  const handleDetailsRgs = async (id) => {
    await AsyncStorage.setItem("rgsId", id.toString());
    navigation.navigate("Listados checklist conductor info");
  };

  return (
    <ImageBackground source={fondoGeneral} style={generalStyles.backgroundImage}>
      <ScrollView>
        <View style={generalStyles.container}>
          <Text>Listados</Text>
          <View style={styles.cardRow}>
            {rgsData ? (
              rgsData.map((rgs, index) => (
                <View key={index} style={styles.cardContainer}>
                  <Text>ID: {rgs.id}</Text>
                  <Text>Placa camion: {rgs.checkListCamionModel.camionesModel.placa} </Text>
                  <Text>Placa carreta: {rgs.checkListCarretaModel.camionesModel.placa} </Text>
                  <Button
                    title="Ver datos "
                    type="outline"
                    buttonStyle={[generalStyles.styleButton, { marginTop: 15 }]}
                    titleStyle={generalStyles.textoButton}
                    iconRight
                    onPress={() => handleDetailsRgs(rgs.id)}
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
