import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View } from "react-native";
import { fondoGeneral } from "../styles/paletaColores";
import { generalStyles } from "../styles/generalStyles";
import { useRoute } from "@react-navigation/native";
import { useListarElementos } from "../hooks/useListUtils";
import { camionesURL } from "../api/apiurls";
import { Button } from "react-native-elements";
import { carretaChecklistItems } from "./checklists/checklistDataArrays/carretaChecklistItems";
import { camionChecklistItems } from "./checklists/checklistDataArrays/camionChecklistItems";
import { useGetAsyncStorage } from "../hooks/asyncStorageUtils";

export function CamionDetalle({ navigation }) {
  const [camionData, setCamionData] = useState();
  const [camionid, setCamionid] = useState();
  const [carretaid, setCarretaid] = useState();
  const route = useRoute();
  const tipoVehiculo = route.params.tipoVehiculo;
  useGetAsyncStorage("camionid", setCamionid);
  useGetAsyncStorage("carretaid", setCarretaid);
  // const ListarCL = useListarElementos(`${baseURL}RGS/${camionid}`, setCamion);

  const idMap = {
    camion: camionid,
    carreta: carretaid,
  };

  const idData = idMap[tipoVehiculo];
  const ListarCamion = useListarElementos(`${camionesURL}/${idData}`, setCamionData);

  useEffect(() => {
    ListarCamion();
  }, [ListarCamion]);

  const handleListChecklist = () => {
    if (tipoVehiculo == "camion") {
      navigation.navigate("CheckList Camion", { tipoVehiculo: tipoVehiculo, tablesD: camionChecklistItems });
    } else if (tipoVehiculo == "carreta") {
      navigation.navigate("CheckList Camion", { tipoVehiculo: tipoVehiculo, tablesD: carretaChecklistItems });
    }
  };

  return (
    <ImageBackground source={fondoGeneral} style={generalStyles.backgroundImage}>
      <View style={generalStyles.container}>
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 15,
            alignItems: "center",
            width: 300,
          }}
        >
          {camionData ? (
            <View
              style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 15,
                alignItems: "center",
                width: 300,
              }}
            >
              <Text style={generalStyles.tittleText}>{camionData.tiposCModel?.nombre}</Text>
              <Text style={generalStyles.tittleText}>Placa {camionData.placa}</Text>
              <Text style={generalStyles.tittleText}>Marca {camionData.marcasModel?.nombre}</Text>
              <Text style={generalStyles.tittleText}>Modelo {camionData.modeloModel?.nombre}</Text>

              <Button
                title=" Realizar Checklist "
                type="outline"
                buttonStyle={generalStyles.styleButton}
                titleStyle={generalStyles.textoButton}
                icon={{
                  name: "check",
                  type: "font-awesome",
                  size: 25,
                  color: "white",
                }}
                iconRight
                onPress={() => handleListChecklist()}
              />
            </View>
          ) : (
            <View>
              <Text style={[generalStyles.tittleText, { textAlign: "center" }]}>Cargando...</Text>
              <Text style={[generalStyles.tittleText, { textAlign: "center" }]}>
                Si no es redirigido luego de 5 segundos posiblemente el QR escaneado no pertenece a un camion
              </Text>
              <Button
                title="Escanear QR nuevamente "
                type="outline"
                buttonStyle={generalStyles.styleButton}
                titleStyle={generalStyles.textoButton}
                icon={{
                  name: "camera",
                  type: "font-awesome",
                  size: 25,
                  color: "white",
                }}
                iconRight
                onPress={() => navigation.navigate("Scanner")}
              />
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}
