import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { generalStyles } from "../../styles/generalStyles";
import { BotonCard, ColorTexto, ColorTextoBoton, fondoGeneral } from "../../styles/paletaColores";
import { Button, Card } from "react-native-elements";

export function Taller() { 
  return (
    <ImageBackground source={fondoGeneral} style={generalStyles.backgroundImage}>
      <View style={generalStyles.container}>
        <Text style={styles.tittleText}>Buenos días, Mecanico</Text>
        <Card containerStyle={styles.cardContainer}>
          <Card.Title style={{ color: ColorTexto }}>Ver Camiones pendientes a reparacion</Card.Title>
          <Card.Divider />
          <Text style={styles.cardText}>Camiones y carretas con alguna falla pendientes para pasar a reparacion</Text>
          <Button title="Ver más" buttonStyle={styles.cardButton} onPress={() => handlePendiente()} titleStyle={{ color: ColorTextoBoton }} />
        </Card>

        <Card containerStyle={styles.cardContainer}>
          <Card.Title style={{ color: ColorTexto }}>Ver camiones en reparacion</Card.Title>
          <Card.Divider />
          <Text style={styles.cardText}>Camiones y carretas que estan actualmente siendo reparados</Text>
          <Button title="Ver más" buttonStyle={styles.cardButton} titleStyle={{ color: ColorTextoBoton }}  />
        </Card>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    //backgroundColor: "#f0f0f0",
  },
  tittleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: ColorTexto,
  },
  cardContainer: {
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
    padding: 10,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
    color: ColorTexto,
  },
  cardButton: {
    backgroundColor: BotonCard,
    borderRadius: 5,
  },
});
