import React, { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const QRScanner = ({ cerrar, navigate, tipoVehiculo }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    cerrar();

    await AsyncStorage.setItem("camionid", data);
    navigate("Detalles", { tipoVehiculo: tipoVehiculo, camionid: data });
  };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No se ha otorgado el permiso para acceder a la cámara.</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.preview}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      {scanned && (
        <TouchableOpacity onPress={() => setScanned(false)} style={styles.scanAgain}>
          <Text style={styles.scanAgainText}>Escanear de nuevo</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => cerrar()} style={styles.scanAgain}>
        <Text style={styles.scanAgainText}>Cerrar Cámara</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    scanAgain: {
      padding: 15, 
      backgroundColor: 'white',
      margin: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    scanAgainText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  
