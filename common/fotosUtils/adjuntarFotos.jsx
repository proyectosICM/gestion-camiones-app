import React, { useEffect, useState } from "react";
import { Alert, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { fondoGeneral } from "../../styles/paletaColores";
import { generalStyles } from "../../styles/generalStyles";
import { Button } from "react-native-elements";
import { Camera } from "expo-camera";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useGetAsyncStorage } from "../../hooks/asyncStorageUtils";
import { useAgregarElemento } from "../../hooks/useAgregarElemento";
import { EnviarImagenURL, FallasImagenURL } from "../../api/apiurls";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function AdjuntarFotos() {
  const route = useRoute();
  const navigation = useNavigation();

  const datos = route.params.datos;
  const clop = route.params.clop;
  const [tipoVehiculo, setTipoVehiculo] = useState(null);
  useGetAsyncStorage("tipoVehiculo", setTipoVehiculo);
  console.log("Llego")
  useEffect(() => {

   /* if (tipoVehiculo == "camion") {
      console.log("Si")
      AsyncStorage.setItem("tipoVehiculo", "carreta");
    } else if (tipoVehiculo == "carreta") {
      AsyncStorage.setItem("tipoVehiculo", "camion");
    }*/
  })

  const [image, setImage] = useState(null);
  const [observacion, setObservacion] = useState(null);
  const [camera, setCamera] = useState(null);
  const [usuario, setUsuario] = useState();
  const [empresa, setEmpresa] = useState();
  const [token, setToken] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useGetAsyncStorage("usuario", setUsuario);
  useGetAsyncStorage("empresa", setEmpresa);
  useGetAsyncStorage("token", setToken);

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
  };

  const handleEnviar = async () => {
    if (image && observacion) {
      try {
        setIsLoading(true);

        const formData = new FormData();
        formData.append("file", {
          uri: image,
          type: "image/jpeg",
          name: "nombre_imagen.jpg",
        });
        formData.append("observacion", observacion);
        formData.append("empresaId", empresa);
        formData.append("camionId", 1);

        const response = await axios.post(EnviarImagenURL, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        const requestData = {
          urlImage: response.data,
          observacion: observacion,
          usuariosModel: {
            id: 1,
          },
          empresaModel: {
            id: empresa,
          },
          checkListCamionModel: {
            id: datos.checkListCamionModel.id,
          },
          checkListCarretaModel: datos.checkListCarretaModel
            ? {
                id: datos.checkListCarretaModel.id,
              }
            : null,
        }

        useAgregarElemento(FallasImagenURL, requestData);

        // Reiniciar la cámara
        handleResetCamera();

        // console.log("Respuesta del servidor:", response.data);

        setIsLoading(false);
      } catch (error) {
        console.log("Error al enviar la imagen:", error);
        setIsLoading(false);

        if (error.response) {
          // Si hay una respuesta del servidor, mostrar el mensaje de error
          console.error("Mensaje de error:", error.response.data);
        } else if (error.request) {
          // Si la solicitud se realizó pero no se recibió respuesta, mostrar un mensaje de error genérico
          console.error("No se recibió respuesta del servidor");
        } else {
          // Si ocurrió un error durante la configuración de la solicitud, mostrar el error
          console.error("Error de configuración de la solicitud:", error.message);
        }
      }
    } else {
      Alert.alert("Agregue detalle a la observacion", "Por favor describa la falla");
    }
  };

  const handleResetCamera = () => {
    setImage(null);
    setObservacion(null);
  };

  const handleContinueChecklist = () => {
    console.log("Se ejecuta")
    if (tipoVehiculo == "camion") {
      //AsyncStorage.setItem("tipoVehiculo", "carreta");
      navigation.navigate("Inicio");
    } else if (tipoVehiculo == "carreta") {
      //AsyncStorage.setItem("tipoVehiculo", "camion");
      navigation.navigate("Inicio");
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
            {clop && (
              <TouchableOpacity onPress={handleContinueChecklist} style={styles.captureButton}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Continuar checklist</Text>
              </TouchableOpacity>
            )}
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
    marginVertical: "2.5%",
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
