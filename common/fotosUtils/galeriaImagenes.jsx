import React, { useEffect, useState } from "react";
import { Dimensions, Image, ImageBackground, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { generalStyles } from "../../styles/generalStyles";
import { useListarElementos } from "../../hooks/useListUtils";
import { FallasImagenURL, imagenesNombresURL } from "../../api/apiurls";
import axios from "axios";
import { useGetAsyncStorage } from "../../hooks/asyncStorageUtils";
import { useRoute } from "@react-navigation/native";

export default function GaleriaImagenes() {
  const [imagesData, setImagesData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [empresa, setEmpresa] = useState(null);

  useGetAsyncStorage("empresa", setEmpresa);
  const route = useRoute();
  const { dato1, dato2, dt } = route.params;
  const ListarNombres = useListarElementos(`${imagenesNombresURL}?empresaId=${empresa}&dt=${dt}&dato1=${dato1}&dato2=${dato2}`, setImagesData);

  useEffect(() => {
    ListarNombres();
  }, [ListarNombres]);

  const handleImagePress = (imageInfo, index) => {
    setSelectedImage(imageInfo);
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const renderImages = () => {
    return imagesData.map((imageInfo, index) => (
      <TouchableOpacity key={index} style={styles.imageContainer} onPress={() => handleImagePress(imageInfo, index)}>
        <Image source={{ uri: `${FallasImagenURL}/images?company=1&filename=${imageInfo.urlImage}` }} style={styles.image} />
        <Text style={styles.observation}>{imageInfo.observacion}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <ImageBackground style={generalStyles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.row}>{renderImages()}</View>
      </ScrollView>

      <Modal visible={selectedImage !== null} transparent={true} onRequestClose={closeModal}>
        <ScrollView
          contentContainerStyle={styles.modalScrollView}
          horizontal
          pagingEnabled
          onScroll={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get("window").width);
            setSelectedIndex(index);
          }}
          scrollEventThrottle={200}
        >
          {imagesData.map((imageInfo, index) => (
            <View key={index} style={styles.modalImageContainer}>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeText}>Cerrar</Text>
              </TouchableOpacity>
              <Image source={{ uri: `${FallasImagenURL}/images?company=1&filename=${imageInfo.urlImage}` }} style={styles.modalImage} />
              {selectedIndex === index && (
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionText}>{imageInfo.observacion}</Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    marginTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
    flexWrap: "wrap",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
    width: "45%",
  },
  image: {
    width: "100%",
    height: Dimensions.get("window").height / 3,
    marginBottom: 10,
  },
  observation: {
    textAlign: "center",
    marginTop: 5,
  },
  modalScrollView: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 20,
    padding: 10,
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
  },
  modalImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  descriptionContainer: {
    position: "absolute",
    bottom: 40,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    width: "80%",
  },
  descriptionText: {
    fontSize: 16,
    color: "#000",
  },
});
