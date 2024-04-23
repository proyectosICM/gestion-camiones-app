import React from "react";

import { ColorIcono, QR_Logo, fondoGeneral } from "../../styles/paletaColores";
import { generalStyles } from "../../styles/generalStyles";
import { Button } from "react-native-elements";
import { Image, ImageBackground, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function VerificarChecklist() {
  const navigation = useNavigation();
  return (
    <ImageBackground source={fondoGeneral} style={generalStyles.backgroundImage}>
      <View style={generalStyles.container}>

      <Image source={QR_Logo} style={{ width: 100, height: 100, marginVertical: 20 }} />
        {/*   
             <Text style={generalStyles.tittleText}>Escanear QR de camion</Text>
        <Text></Text>
        <Button
          title=" Abrir Camara "
          type="outline"
          buttonStyle={generalStyles.styleButton}
          titleStyle={generalStyles.textoButton}
          icon={{
            name: "camera", 
            type: "font-awesome",
            size: 25,
            color: ColorIcono,
          }}
          iconRight
        />
        <Text style={generalStyles.tittleText}>O</Text> */}

        <Button
          title=" Buscar Camion en Menu "
          type="outline"
          buttonStyle={generalStyles.styleButton}
          titleStyle={generalStyles.textoButton}
          icon={{
            name: "search",
            type: "font-awesome",
            size: 25,
            color: ColorIcono,
          }}
          iconRight
          onPress={() => navigation.navigate("Menu camiones")}
        />
      </View>
    </ImageBackground>
  );
}
