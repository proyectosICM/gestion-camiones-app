import React, { useState } from "react";
import { View, Text, ImageBackground } from "react-native";
import { fondoGeneral } from "../../styles/paletaColores";
import { generalStyles } from "../../styles/generalStyles";

export function CamionSeleccionado() {
  const [userData, setUserData] = useState(); 

  return (
    <ImageBackground source={fondoGeneral} style={generalStyles.backgroundImage}>
      <View style={generalStyles.container}>
        {userData == "Valido" ? (
          <>
            <Text style={generalStyles.tittleText}>
              Placa Camion: {userData.rgsModel && userData.rgsModel.checkListCamionModel.camionesModel.placa}
            </Text>
            <Text style={generalStyles.tittleText}>
              Placa Tracto: {userData.rgsModel && userData.rgsModel.checkListCarretaModel.camionesModel.placa}
            </Text>
            <BotonesCamionAsignado datos={userData} />
          </>
        ) : (
          <>
            <Text style={generalStyles.tittleText}>No hay Camion Asignado</Text>
            <Text style={[generalStyles.tittleText, { textAlign: "center" }]}>Por favor escanee el QR de un camion libre</Text>
          </>
        )}
      </View>
    </ImageBackground>
  );
}
