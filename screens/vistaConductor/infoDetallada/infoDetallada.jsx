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
          tipoc={datos.checkListCamionModel.camionesModel.tiposCModel.nombre}
          placa={datos.checkListCamionModel.camionesModel.placa}
          marca={datos.checkListCamionModel.camionesModel.marcasModel.nombre}
          modelo={datos.checkListCamionModel.camionesModel.modeloModel.nombre}
        />

        <PanelCDetalle
          tipoc={datos.checkListCarretaModel.camionesModel.tiposCModel.nombre}
          placa={datos.checkListCarretaModel.camionesModel.placa}
          marca={datos.checkListCarretaModel.camionesModel.marcasModel.nombre}
          modelo={datos.checkListCarretaModel.camionesModel.modeloModel.nombre}
        />
      </View>
    </ImageBackground>
  );
}
