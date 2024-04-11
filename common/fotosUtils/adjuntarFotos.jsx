import React, { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { fondoGeneral } from "../../styles/paletaColores";
import { generalStyles } from "../../styles/generalStyles";

export function AdjuntarFotos() {
  const [image, setImage] = useState(null);
  const [observacion, setObservacion] = useState(null);

  return (
    <ImageBackground source={fondoGeneral} style={generalStyles.backgroundImage}>
      <View style={generalStyles.container}></View>
    </ImageBackground>
  );
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  previewContainer: {
    width: "80%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  image: {
    width: "50%",
    height: "50%",
  },
  input: {
    width: 240,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  captureButton: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    width: "50%",
    alignItems: "center",
    marginHorizontal: "25%",
    marginVertical: "10%",
  },
  captureButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  continuar: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    width: "70%",
    alignItems: "center",
    marginHorizontal: "25%",
    marginBottom: "10%",
  },
});
