import React, { useState } from "react";
import { Alert, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { fondoGeneral } from "../../styles/paletaColores";
import { generalStyles } from "../../styles/generalStyles";
import { Button } from "react-native-elements";
import { Camera } from "expo-camera";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useGetAsyncStorage } from "../../hooks/asyncStorageUtils";

export function AdjuntarFotos() {
  const route = useRoute();
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [observacion, setObservacion] = useState(null);
  const [camera, setCamera] = useState(null);
  const [usuario, setUsuario] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useGetAsyncStorage("usuario", setUsuario);

  const handleImagePicker = async () => {
    if (camera) {
      try {
        const { uri } = await camera.takePictureAsync();

        if (uri) {
          setImage(uri);
        }
      } catch (error) {
        console.log("Error al tomar la foto:", error);
      }
    }
  };

  const handleVerImagen = () => {
    // Aquí puedes mostrar la imagen en pantalla completa o realizar cualquier otra acción que desees.
    // Por ejemplo, puedes usar un componente de visor de imágenes.
    // Puedes abrir un modal o navegar a una nueva pantalla para mostrar la imagen en pantalla completa.
    // Esto depende de la implementación específica de tu aplicación.

    console.log("Si");
  };

  const handleEnviar = () => {
    if (image && observacion) {
      try {
        setIsLoading(true);
      } catch (error) {
        console.log("Error al enviar la imagen:", error);
        setIsLoading(false);
      }
    } else {
      Alert.alert("Agregue detalle a la observacion", "Por favor describa la falla");
    }
  };

  return (
    <ImageBackground source={fondoGeneral} style={generalStyles.backgroundImage}>
      <View style={generalStyles.container}>
        {image ? (
          <>
            <Image source={{ uri: image }} style={styles.image} resizeMode="contain" onPress={handleVerImagen} />
            <Text style={[generalStyles.tittleText, { margin: 2 }]}>Agregar una observación</Text>
            <TextInput
              style={[styles.input, { backgroundColor: "#EBEFF2" }]}
              placeholder="Detalle la observación"
              onChangeText={(text) => setObservacion(text)}
              value={observacion}
            />
            <Button
              title={isLoading ? "Cargando..." : "Enviar"}
              onPress={handleEnviar}
              buttonStyle={generalStyles.styleButton}
              titleStyle={generalStyles.tittleText}
              disabled={isLoading}
            />
          </>
        ) : (
          <View style={styles.previewContainer}>
            <Camera
              style={{ flex: 1, width: "90%", height: "90%", marginTop: "10%" }}
              type={Camera.Constants.Type.back}
              ref={(ref) => setCamera(ref)}
            ></Camera>
            <TouchableOpacity onPress={handleImagePicker} style={styles.captureButton}>
              <Text style={styles.captureButtonText}>Tomar Foto</Text>
            </TouchableOpacity>
            {/* clc == "continuar" && (
              <TouchableOpacity onPress={() => navigation.navigate("VerificacionCarreta")} style={styles.continuar}>
                <Text style={styles2.captureButtonText}>Continuar checklist</Text>
              </TouchableOpacity>
            ) */}

            {/* clc == "cerrar" && (
              <TouchableOpacity onPress={() => navigation.navigate("Asignado")} style={styles.continuar}>
                <Text style={styles.captureButtonText}>Cerrar</Text>
              </TouchableOpacity>
            )*/}
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
