import React, { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { Button, Card, Icon } from "react-native-elements";
import { generalStyles } from "../../styles/generalStyles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useGetAsyncStorage } from "../../hooks/asyncStorageUtils";
import { checklistCamionURL, checklistCarretaURL, rgsURL, usuarioURL } from "../../api/apiurls";
import { carretaChecklistItems } from "./checklistDataArrays/carretaChecklistItems";
import { camionChecklistItems } from "./checklistDataArrays/camionChecklistItems";
import { useAgregarElemento } from "../../hooks/useAgregarElemento";
import { useCustomAlert } from "../../hooks/useCustomAlert ";
import { useEditarUnElemento } from "../../hooks/useEditarUnElemento";

export function VerificacionDatosEnvio() {
  const navigation = useNavigation();
  const showAlert = useCustomAlert();
  const route = useRoute();

  const datos = route.params.datos;
  const tiempo = route.params.tiempo;

  const tipoVehiculo = route.params.tipoVehiculo;
  const tablesD = route.params.tablesD;

  const [usuario, setUsuario] = useState();
  const [empresa, setEmpresa] = useState();
  const [sede, setSede] = useState();
  const [camionid, setCamionid] = useState();
  const [carretaid, setCarretaid] = useState();

  useGetAsyncStorage("usuario", setUsuario);
  useGetAsyncStorage("empresa", setEmpresa);
  useGetAsyncStorage("sede", setSede);
  useGetAsyncStorage("camionid", setCamionid);
  useGetAsyncStorage("carretaid", setCarretaid);

  const convertirAMinutos = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos} minutos y ${segundosRestantes} segundos`;
  };

  const urlMap = {
    camion: checklistCamionURL,
    carreta: checklistCarretaURL,
  };

  const handleYes = () => {
    navigation.navigate("Adjuntar Fotos", {  clc: "continuar" });
  };

  const handleNo = () => {
    if (tipoVehiculo == "camion") {
      navigation.navigate("Inicio", { tipoVehiculo: "carreta" });
    } else if (tipoVehiculo == "carreta") {
      navigation.navigate("Inicio", { tipoVehiculo: "camion" });
    }
  };

  const handleEnviar = async () => {
    try {
      const requestDataChecklist = {
        camionesModel: { id: camionid },
        tiempo: tiempo,
        ...datos.reduce((acc, dataGroup, index) => {
          dataGroup.forEach((dataItem, itemIndex) => {
            const atributo = tablesD[index].datos[itemIndex].atributo;
            acc[atributo] = dataItem;
          });
          return acc;
        }, {}),
      };

      const url = urlMap[tipoVehiculo];
      await useAgregarElemento(url, requestDataChecklist);

      if (tipoVehiculo == "carreta") {
        const requestDataRGS = {
          usuariosModel: { id: usuario },
          camionesModel: { id: camionid },
          carretasModel: { id: carretaid },
          empresasModel: { id: empresa },
          sedesModel: { id: sede },
        };

        await useAgregarElemento(rgsURL, requestDataRGS);
      }

      const options = [
        { text: "Sí", onPress: handleYes },
        { text: "No", onPress: handleNo, style: "cancel" },
      ];
      showAlert("Desea Agregar fotos", "", options);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
      <View>
        <Text>Su rol es:</Text>
        {tablesD &&
          tablesD.map((table, index) => (
            <View key={index} style={{ alignItems: "center" }}>
              <Card>
                <Text style={generalStyles.tittleText}>{table.titulo}</Text>
                <View style={{ alignItems: "center" }}>
                  {table.datos.map((dato, datoIndex) => (
                    <View key={datoIndex}>
                      <>
                        <Text>
                          <Card.Title> {dato.nombre}</Card.Title>
                          {datos[index][datoIndex] ? (
                            <>
                              <Text style={{ color: "green" }}>
                                Buen estado <Icon name="check" size={20} color="green" />
                              </Text>
                            </>
                          ) : (
                            <Text style={{ color: "red" }}>
                              Mal estado <Icon name="close" size={20} color="red" />
                            </Text>
                          )}
                        </Text>
                      </>
                    </View>
                  ))}
                </View>
              </Card>
            </View>
          ))}
        <Text style={generalStyles.tittleText}>Tiempo: {convertirAMinutos(tiempo)}</Text>
        <Button title={"Confirmar Envio de datos"} onPress={() => handleEnviar()} />
      </View>
    </ScrollView>
  );
}
