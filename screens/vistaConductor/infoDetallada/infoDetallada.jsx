import React from "react";
import { ImageBackground, View } from "react-native";
import { fondoGeneral } from "../../../styles/paletaColores";
import { generalStyles } from "../../../styles/generalStyles";
import { useRoute } from "@react-navigation/native";
import { PanelCDetalle } from "./panelCDetalle";

export function InfoDetallada() {
  const route = useRoute();
  const datos = route.params.datos;
  return (
    <ImageBackground source={fondoGeneral} style={generalStyles.backgroundImage}>
      <View style={generalStyles.container}>
        <PanelCDetalle
          tipoc={datos.camionesModel.tiposCModel.nombre}
          placa={datos.camionesModel.placa}
          marca={datos.camionesModel.marcasModel.nombre}
          modelo={datos.camionesModel.modeloModel.nombre}
        />

        <PanelCDetalle
          tipoc={datos.carretasModel.tiposCModel.nombre}
          placa={datos.carretasModel.placa}
          marca={datos.carretasModel.marcasModel.nombre}
          modelo={datos.carretasModel.modeloModel.nombre}
        />
      </View>
    </ImageBackground>
  );
}
