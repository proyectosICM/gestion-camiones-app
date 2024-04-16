import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import { BotonColorOscuro, ColorIcono, ColorTextoBoton } from "../../styles/paletaColores";
import { useNavigation } from "@react-navigation/native";

export function BotonesCamionAsignado({datos}) { 
  const navigation = useNavigation();
  return (
    <>
      <View style={localStyles.buttonRow}>
        <View style={localStyles.buttonContainer}>
          <Button
            title={"Informacion detallada del camion"}
            titleStyle={localStyles.buttonText} 
            buttonStyle={localStyles.button}
            onPress={() => navigation.navigate("InfoDetallada", { datos: datos })}
            icon={<Icon name="info" size={20} color={ColorIcono} />}
          />

          <Button
            title={"Registrar cambio de llantas"}
            titleStyle={localStyles.buttonText}
            buttonStyle={localStyles.button}
            icon={<Icon name="edit" size={20} color={ColorIcono} />}
            onPress={() => navigation.navigate("Cambio de llantas", { datos: datos })}
          />
        </View>

        <View style={localStyles.buttonContainer}>
          <Button
            title={"Reportar una falla"}
            titleStyle={localStyles.buttonText} 
            buttonStyle={localStyles.button}
            icon={<Icon name="build" size={20} color={ColorIcono} />}
            onPress={() => navigation.navigate("Adjuntar Fotos", { datos: datos, clop: false })}
          />

          <Button
            title={"Observaciones"}
            titleStyle={localStyles.buttonText}
            buttonStyle={localStyles.button}
            icon={<Icon name="comment" size={20} color={ColorIcono} />}
            onPress={() => navigation.navigate("Observaciones", { rgs: datos.id })}
          />
        </View>
      </View>

      <View style={localStyles.buttonRow}>
        <View style={localStyles.buttonContainer}>
          <Button
            title={"Ver fotos asociadas al Registro"}
            titleStyle={localStyles.buttonText}
            buttonStyle={localStyles.button}
            icon={<Icon name="photo" size={20} color={ColorIcono} />}
            onPress={() => navigation.navigate("Galeria", { idRgs: datos.rgsModel.id })}
          />
        </View>
      </View>
    </>
  );
}

const localStyles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    width: "40%",
    marginHorizontal: 10,
    /*
      borderColor: "red",
      borderWidth: 2,
   */
  },
  button: {
    backgroundColor: BotonColorOscuro,
    flexDirection: "column",
    borderRadius: 8,
    padding: 10,
    width: 150,
    height: 100,
    marginTop: 10,
  },
  buttonText: {
    color: ColorTextoBoton,
    marginTop: 8,
    fontSize: 18,
  },
  iconoColor: {
    color: ColorIcono,
  },
});
