import React, { useState } from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { generalStyles } from "../../styles/generalStyles";
import { ColorIcono, ColorTexto, QR_Logo, fondoGeneral } from "../../styles/paletaColores";
import { Button } from "react-native-elements";
import { QRScanner } from "../../common/qrScanner";
import { useRoute } from "@react-navigation/native";

export function VerificacionCamion({ navigation }) {
  const [abrir, setAbrir] = useState(false);

  const route = useRoute();
  const tipoVehiculo = route.params ? route.params.tipoVehiculo : "";

  const handleAbrirCamera = () => {
    setAbrir(true);
  };
 
  const handleCerrarCamera = () => {
    setAbrir(false);
  };

  return abrir ? (
    <QRScanner cerrar={handleCerrarCamera} navigate={navigation.navigate} tipoVehiculo={tipoVehiculo} />
  ) : (
    <ImageBackground source={fondoGeneral} style={generalStyles.backgroundImage}>
      <View style={generalStyles.container}>
        {tipoVehiculo == "camion" && <Image source={QR_Logo} style={{ width: 100, height: 100, marginVertical: 20 }} />}

        <Text style={generalStyles.tittleText}>Escanear QR de {tipoVehiculo}</Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
            marginVertical: 12,
            color: ColorTexto,
          }}
        >
          {tipoVehiculo == "camion" ? "scanee el codigo QR de un camion para empezar a realizar el CheckList" : "Escanee el codigo QR de una carreta"}
        </Text>
        <Button
          title=" Abrir Camara "
          type="outline"
          buttonStyle={generalStyles.buttonPalette}
          titleStyle={generalStyles.textoButton}
          icon={{
            name: "camera",
            type: "font-awesome",
            size: 25,
            color: ColorIcono,
          }}
          iconRight
          onPress={handleAbrirCamera}
        />
      </View>
    </ImageBackground>
  );
}
