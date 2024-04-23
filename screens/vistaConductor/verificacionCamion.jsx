import React, { useEffect, useState } from "react";
import { Alert, Image, ImageBackground, Text, View, StyleSheet } from "react-native";
import { generalStyles } from "../../styles/generalStyles";
import { ColorIcono, ColorTexto, QR_Logo, fondoGeneral } from "../../styles/paletaColores";
import { Button } from "react-native-elements";
import { QRScanner } from "../../common/qrScanner";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAutoFetchAsyncStorage, useGetAsyncStorage } from "../../hooks/asyncStorageUtils";

export function VerificacionCamion() {
  const navigation = useNavigation();
  const route = useRoute();

  const [abrir, setAbrir] = useState(false);
  const [tipoVehiculo, setTipoVehiculo] = useState(null);

  useAutoFetchAsyncStorage("tipoVehiculo", setTipoVehiculo);

  const handleAbrirCamera = () => {
    setAbrir(true);
  };

  const handleCerrarCamera = () => {
    setAbrir(false);
  };

  const handleReiniciarCl = async () => {
    Alert.alert("Reiniciar Checklist", "¿Estás seguro de que deseas reiniciar el checklist?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Aceptar",
        onPress: async () => {
          await AsyncStorage.setItem("tipoVehiculo", "camion");
        },
      },
    ]);
  };

  return abrir ? (
    <QRScanner cerrar={handleCerrarCamera} />
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

        {tipoVehiculo == "carreta" && (
          <Button
            title=" Reiniciar Checklist "
            type="outline"
            buttonStyle={[generalStyles.buttonPalette, styles.marginTop]}
            titleStyle={generalStyles.textoButton}
            icon={{
              name: "refresh",
              type: "font-awesome",
              size: 25,
              color: ColorIcono,
            }}
            iconRight
            onPress={handleReiniciarCl}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  marginTop: {
    marginTop: 80,
  },
});
