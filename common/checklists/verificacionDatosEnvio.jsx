import React, { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { Button, Card, Icon } from "react-native-elements";
import { generalStyles } from "../../styles/generalStyles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useGetAsyncStorage } from "../../hooks/asyncStorageUtils";
import {
  checklistCamionURL,
  checklistCarretaURL,
  checklistExpresoCamionURL,
  checklistExpresoCarretaURL,
  rgsURL,
  usuarioURL,
} from "../../api/apiurls";
import { carretaChecklistItems } from "./checklistDataArrays/carretaChecklistItems";
import { camionChecklistItems } from "./checklistDataArrays/camionChecklistItems";
import { useAgregarElemento } from "../../hooks/useAgregarElemento";
import { useCustomAlert } from "../../hooks/useCustomAlert ";
import { useEditarUnElemento } from "../../hooks/useEditarUnElemento";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function VerificacionDatosEnvio() {
  const navigation = useNavigation();
  const showAlert = useCustomAlert();
  const route = useRoute();

  const datos = route.params.datos;
  const tiempo = route.params.tiempo;
  const tablesD = route.params.tablesD;

  const [tipoVehiculo, setTipoVehiculo] = useState(null);
  const [usuario, setUsuario] = useState();
  const [empresa, setEmpresa] = useState();
  const [sede, setSede] = useState();
  const [rol, setRol] = useState();
  const [camionid, setCamionid] = useState();
  const [carretaid, setCarretaid] = useState();
  const [camioncl, setCamionCl] = useState();
  const [carretacl, setCarretaCl] = useState();

  useGetAsyncStorage("usuario", setUsuario);
  useGetAsyncStorage("empresa", setEmpresa);
  useGetAsyncStorage("sede", setSede);
  useGetAsyncStorage("rol", setRol);
  useGetAsyncStorage("camionid", setCamionid);
  useGetAsyncStorage("carretaid", setCarretaid);
  useGetAsyncStorage("camioncl", setCamionCl);
  useGetAsyncStorage("carretacl", setCarretaCl);
  useGetAsyncStorage("tipoVehiculo", setTipoVehiculo);

  const convertirAMinutos = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos} minutos y ${segundosRestantes} segundos`;
  };

  const urlMap = {
    camion: checklistCamionURL,
    carreta: checklistCarretaURL,
  };

  const handleYes = (camion, carreta) => {
    const datosEnvio = {
      checkListCamionModel: {
        id: camion,
      },
      checkListCarretaModel:
        tipoVehiculo === "camion"
          ? null
          : {
              id: carreta,
            },
    };

    if (tipoVehiculo == "camion") {
      AsyncStorage.setItem("tipoVehiculo", "carreta");
      navigation.navigate("Adjuntar Fotos", { datos: datosEnvio, clop: true });
    } else if (tipoVehiculo == "carreta") {
      AsyncStorage.setItem("tipoVehiculo", "camion");
      navigation.navigate("Adjuntar Fotos", { datos: datosEnvio, clop: true });
    }
  };

  const handleNo = async () => {
    if (tipoVehiculo == "camion") {
      AsyncStorage.setItem("tipoVehiculo", "carreta");
      navigation.navigate("Inicio");
    } else if (tipoVehiculo == "carreta") {
      AsyncStorage.setItem("tipoVehiculo", "camion");
      navigation.navigate("Inicio");
    }
  };

  const handleRedirigir = async() => {
    if (tipoVehiculo == "camion") {
      AsyncStorage.setItem("tipoVehiculo", "carreta");
      navigation.navigate("Inicio");
    } else if (tipoVehiculo == "carreta") {
      AsyncStorage.setItem("tipoVehiculo", "camion");
      navigation.navigate("Inicio");
    }
  };
  

  const handleEnviar = async () => {
    try {
      if (rol == "CONDUCTOR") {
        const requestDataChecklist = {
          camionesModel: { id: tipoVehiculo == "camion" ? camionid : carretaid },
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
        const cl = await useAgregarElemento(url, requestDataChecklist);

        if (tipoVehiculo === "camion") {
          await AsyncStorage.setItem("camioncl", cl.data.id.toString());
        } else if (tipoVehiculo === "carreta") {
          await AsyncStorage.setItem("carretacl", cl.data.id.toString());
        }

        if (tipoVehiculo == "carreta") {
          const requestDataRGS = {
            usuariosModel: { id: usuario },
            checkListCamionModel: { id: camioncl },
            checkListCarretaModel: { id: cl.data.id },
            empresasModel: { id: empresa },
            sedesModel: { id: sede },
            enUso: true,
          };

          await useAgregarElemento(rgsURL, requestDataRGS);
        }
        /*
        const options = [
          { text: "Sí", onPress: handleYes(camioncl, carretacl) },
          { text: "No", onPress: handleNo, style: "cancel" },
        ];
        showAlert("Desea Agregar fotos", "", options);
        */

        handleRedirigir();
      } else if (rol == "MECANICO") {
        const requestDataExpreso = {
          camionesModel: { id: camionid },
          usuariosModel: { id: usuario },
          ...datos.reduce((acc, dataGroup, index) => {
            dataGroup.forEach((dataItem, itemIndex) => {
              const atributo = tablesD[index].datos[itemIndex].atributo;
              acc[atributo] = dataItem;
            });
            return acc;
          }, {}),
        };

        const response = await useAgregarElemento(
          tipoVehiculo == "camion" ? checklistExpresoCamionURL : checklistExpresoCarretaURL,
          requestDataExpreso
        );
        console.log(response.data);
        Alert.alert("CheckList creado Exitosamente");
        navigation.navigate("Vehicle Info");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
      <View>
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

        {tiempo && <Text style={generalStyles.tittleText}>Tiempo: {convertirAMinutos(tiempo)}</Text>}

        <Button title={"Confirmar Envio de datos"} onPress={() => handleEnviar()} />
      </View>
    </ScrollView>
  );
}
