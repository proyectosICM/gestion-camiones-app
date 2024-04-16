import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View } from "react-native";
import { fondoGeneral } from "../../styles/paletaColores";
import { generalStyles } from "../../styles/generalStyles";
import { ScrollView } from "react-native";
import { TablaChecklist } from "./tablaChecklist";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "react-native-elements";
import { useGetAsyncStorage } from "../../hooks/asyncStorageUtils";

export function CheckListCamion() {
  const navigate = useNavigation();

  const route = useRoute();
  const [tipoVehiculo, setTipoVehiculo] = useState(null);
  useGetAsyncStorage("tipoVehiculo", setTipoVehiculo);
  const tables = route.params.tablesD;

  const [currentTable, setCurrentTable] = useState(0);
  const [marcar, setMarcar] = useState(() => tables.map((table) => Array(table.datos.length).fill(null)));

  const allTablesMarked = () => {
    return marcar.every((table) => allItemsMarked(table));
  };

  const handleBack = () => {
    if (currentTable > 0) {
      setCurrentTable(currentTable - 1);
    }
  };

  const allItemsMarked = (marcarArr) => {
    return marcarArr.every((item) => item !== null);
  };

  const handleNext = () => {
    if (currentTable < tables.length - 1 && allItemsMarked(marcar[currentTable])) {
      setCurrentTable(currentTable + 1);
    }
  };

  const [tiempo, setTiempo] = useState(0);
  const actualizarTiempo = () => {
    setTiempo((prevTiempo) => prevTiempo + 1);
  };

  useEffect(() => {
    const interval = setInterval(actualizarTiempo, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleEnviar = () => {
    navigate.navigate("CheckDatos", { datos: marcar, tiempo: tiempo, tablesD: tables });
  };

  return (
    <ImageBackground source={fondoGeneral} style={generalStyles.backgroundImage}>
      <ScrollView>
        <View style={[generalStyles.container, { width: "95%", marginHorizontal: "2.5%" }]}>
          <Text style={[generalStyles.tittleText, { marginTop: 10 }]}>CheckList</Text>

          <TablaChecklist
            titulo={tables[currentTable].titulo}
            datos={tables[currentTable].datos}
            marcar={marcar[currentTable]}
            setMarcar={(estado) => {
              const newMarcar = [...marcar];
              newMarcar[currentTable] = estado;
              setMarcar(newMarcar);
            }}
          />
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button
              title="Atras"
              type="outline"
              onPress={handleBack}
              buttonStyle={{ backgroundColor: "#ccc", width: 150, margin: 10 }}
              titleStyle={{ color: "black" }}
              disabled={currentTable === 0}
            >
              Anterior
            </Button>
            <Button
              title="Siguiente"
              type="outline"
              onPress={handleNext}
              buttonStyle={{ backgroundColor: "white", width: 150, margin: 10 }}
              disabled={currentTable === tables.length - 1 || !allItemsMarked(marcar[currentTable])}
            >
              Siguiente
            </Button>
          </View>
          {currentTable === tables.length - 1 && allTablesMarked() && (
            <Button
              title="Enviar datos"
              type="solid"
              buttonStyle={{ backgroundColor: "blue", width: 200, marginTop: 20 }}
              titleStyle={{ color: "white" }}
              onPress={() => handleEnviar()}
            />
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
