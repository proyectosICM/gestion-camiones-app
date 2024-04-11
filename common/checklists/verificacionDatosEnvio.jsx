import React from "react";
import { Alert, ScrollView, View } from "react-native";
import { Card } from "react-native-elements";
import { generalStyles } from "../../styles/generalStyles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useGetAsyncStorage } from "../../hooks/asyncStorageUtils";
import { checklistCamionURL, checklistCarretaURL, rgsURL } from "../../api/apiurls";

export function VerificacionDatosEnvio() {
  const navigation = useNavigation();
  const route = useRoute();

  const datos = route.params.datos;
  const tiempo = route.params.tiempo;

  const tipoVehiculo = route.params.tipoVehiculo;
  const tablesD = route.params.tablesD;
  const ide = route.params.ide;

  const [empresa, setEmpresa] = useState();
  const [sede, setSede] = useState();
  const [camionid, setCamionid] = useState();

  useGetAsyncStorage("empresa", setEmpresa);
  useGetAsyncStorage("sede", setSede);
  useGetAsyncStorage("camionid", setCamionid);

  const convertirAMinutos = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos} minutos y ${segundosRestantes} segundos`;
  };

  const urlMap = {
    camion: checklistCamionURL,
    carreta: checklistCarretaURL,
  };

  const handleEnviar = async () => {
    try {
      const requestDataChecklist = {
        camionesModel: { id: camionid },
        tiempo: tiempo,
        ...datos.reduce((acc, dataGroup, index) => {
          dataGroup.forEach((dataItem, itemIndex) => {
            const atributo = tablesCam[index].datos[itemIndex].atributo;
            acc[atributo] = dataItem;
          });
          return acc;
        }, {}),
      };

      const url = urlMap[tipoVehiculo];
      await useAgregarElemento(url, requestDataChecklist);

      Alert.alert(
        "Desea Agregar fotos",
        "",
        [
          {
            text: "Sí",
            onPress: () => navigation.navigate("Adjuntar Fotos", { rgs: RGS.data.id, clc: "continuar" }), 
          },
          {
            text: "No",
            onPress: () => navigation.navigate("VerificacionCarreta"), 
            style: "cancel",
          },
        ],
        { cancelable: false }
      );

      if(tipoVehiculo == "camion"){

      } else if (tipoVehiculo == "carreta") {
        const requestDataRGS = {
          usuariosModel: { id: data.id },
          camionesModel: { id: data.id },
          carretaModel: { id: data.id },
          sedesModel: {
            id: sede,
          },
          empresasModel: {
            id: empresa,
          },
        };
        await useAgregarElemento(rgsURL, requestDataRGS);
      }
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
