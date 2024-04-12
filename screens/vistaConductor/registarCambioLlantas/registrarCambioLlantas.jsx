import React, { useState } from "react";
import { fondoGeneral } from "../../../styles/paletaColores";
import { generalStyles } from "../../../styles/generalStyles";
import { ImageBackground, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import { CambiarCamion } from "./cambiarCamion";
import { CambiarCarreta } from "./cambiarCarreta";

export function RegistrarCambioLlantas() {
  const [mostrar, setMostrar] = useState(null);

  const SelectTC = (op) => {
    if (op == "camion") {
      setMostrar("camion");
    } else if (op == "carreta") {
      setMostrar("carreta");
    }
  };

  return (
    <ImageBackground source={fondoGeneral} style={generalStyles.backgroundImage}>
      <View style={generalStyles.container}>
        <Button
          title={"Camion"}
          titleStyle={generalStyles.tittleText}
          buttonStyle={generalStyles.buttonPalette}
          onPress={() => SelectTC("camion")}
          icon={<FontAwesome5 name="truck" size={20} color="white" />} // Agrega el icono aquí
        />

        <Button
          title={" Carreta"}
          titleStyle={generalStyles.tittleText}
          buttonStyle={generalStyles.buttonPalette}
          onPress={() => SelectTC("carreta")}
          icon={<FontAwesome5 name="truck-moving" size={20} color="white" />} // Agrega el icono aquí
        />
        {mostrar != null && (
          <>
            <Text style={generalStyles.tittleText}>Cambio de llantas</Text>
            <Text style={generalStyles.tittleText}>Seleccione la llanta cambiada en ruta {mostrar}</Text>

            { mostrar === "camion" ? <CambiarCamion /> : mostrar === "carreta" ? <CambiarCarreta /> : <Text>Seleccione un boton</Text>}
          </>
        )}
      </View>
    </ImageBackground>
  );
}
