import React, { useEffect, useState } from "react";
import { generalStyles } from "../../styles/generalStyles";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { fondoGeneral } from "../../styles/paletaColores";
import { Button } from "react-native-elements";
import { useGetAsyncStorage } from "../../hooks/asyncStorageUtils";
import { rgsURL } from "../../api/apiurls";
import { useListarElementos, useListarElementosPaginados } from "../../hooks/useListUtils";
import { useNavigation } from "@react-navigation/native";
import { camionChecklistItems } from "./checklistDataArrays/camionChecklistItems";
import { carretaChecklistItems } from "./checklistDataArrays/carretaChecklistItems";

export function ListadosChecklistConductorInfo() {
  const [rgsId, setRgsId] = useState();
  const [rgsData, setRgsData] = useState();
  const navigation = useNavigation();
 
  useGetAsyncStorage("rgsId", setRgsId);

  const ListarRgs = useListarElementos(`${rgsURL}/${rgsId}`, setRgsData);

  useEffect(() => {
    ListarRgs();
  }, [ListarRgs]);

  // datos: rgsData.checkListCamionModel,

  const handleVer = (data) => {
    if(data == "camion"){
        navigation.navigate("Ver CL", { datos: rgsData.checkListCamionModel, tablesD: camionChecklistItems });
    } else if(data == "carreta"){
        navigation.navigate("Ver CL", { datos: rgsData.checkListCarretaModel, tablesD: carretaChecklistItems });
    }

  };
  return (
    <ImageBackground source={fondoGeneral} style={generalStyles.backgroundImage}>
      <View style={generalStyles.container}>
        <View style={styles.cardRow}>
          <View style={styles.cardContainer}>
            <Text style={styles.cardText}>Ver checklist del camion</Text>
            <Button
              title="Ver datos "
              type="outline"
              buttonStyle={[generalStyles.styleButton, { marginTop: 15 }]}
              titleStyle={generalStyles.textoButton}
              iconRight
              onPress={() => handleVer("camion")}
            />
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.cardText}>Ver checklist de la carreta</Text>
            <Button
              title="Ver datos "
              type="outline"
              buttonStyle={[generalStyles.styleButton, { marginTop: 15 }]}
              titleStyle={generalStyles.textoButton}
              iconRight
              onPress={() => handleVer("carreta")}
            />
          </View>
        </View>
        <View style={styles.cardRow}>
          <View style={styles.cardContainer}>
            <Text style={styles.cardText}>Ver las imagenes de falla asociadas al registro</Text>
            <Button
              title="Ver datos "
              type="outline"
              buttonStyle={[generalStyles.styleButton, { marginTop: 15 }]}
              titleStyle={generalStyles.textoButton}
              iconRight
              onPress={() => navigation.navigate("Galeria", { dato1: rgsData.checkListCamionModel.id, dato2: rgsData.checkListCarretaModel.id, dt: "conductor" })}
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
    flexWrap: "wrap",
    justifyContent: "center",
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: "40%",
    alignItems: "center",
  },
  cardText: {
    textAlign: "center",
  },
});
