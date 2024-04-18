import React, { useEffect, useState } from "react";
import { fondoGeneral } from "../../styles/paletaColores";
import { generalStyles } from "../../styles/generalStyles";
import { ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useGetAsyncStorage } from "../../hooks/asyncStorageUtils";
import { useListarElementosPaginados } from "../../hooks/useListUtils";
import { clecarrfindByCamionesModelIdURL, clecfindByCamionesModelIdURL } from "../../api/apiurls";
import { Button } from "react-native-elements";
import { expresoChecklistItems } from "./checklistDataArrays/expresoChecklistItems";
import { carretaChecklistItems } from "./checklistDataArrays/carretaChecklistItems";

export function ListadosChecklistExpreso() {
  const navigation = useNavigation();
  const [clData, setClData] = useState();
  const [camionId, setCamionId] = useState();
  const [tipoVehiculo, setTipoVehiculo] = useState();

  useGetAsyncStorage("camionid", setCamionId);
  useGetAsyncStorage("tipoVehiculo", setTipoVehiculo);

  const urlMap = {
    camion: clecfindByCamionesModelIdURL,
    carreta: clecarrfindByCamionesModelIdURL,
  };

  const ListarCL = useListarElementosPaginados(`${urlMap[tipoVehiculo]}?camionId=${camionId}`, setClData);

  useEffect(() => {
    if (tipoVehiculo && camionId) {
      ListarCL();
    }
  }, [tipoVehiculo, camionId]);

  console.log(`${urlMap[tipoVehiculo]}?camionId=${camionId}`);
  console.log(tipoVehiculo)

  return (
    <ImageBackground source={fondoGeneral} style={generalStyles.backgroundImage}>
      <ScrollView>
        <View style={generalStyles.container}>
          <Text>Listados</Text>
          <View style={styles.cardRow}>
            {clData ? (
              clData.map((cl, index) => (
                <View key={index} style={styles.cardContainer}>
                  <Text>ID: {cl.id}</Text>
                  <Text>Fecha de creacion</Text>
                  <Button
                    title="Ver datos"
                    type="outline"
                    buttonStyle={[generalStyles.styleButton, { marginTop: 15 }]}
                    titleStyle={generalStyles.textoButton}
                    iconRight
                    onPress={() => navigation.navigate("Ver CL", { datos: cl, tablesD: tipoVehiculo == "camion" ? expresoChecklistItems : carretaChecklistItems })}
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
