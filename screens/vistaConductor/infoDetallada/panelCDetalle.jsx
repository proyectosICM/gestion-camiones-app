import React from "react";
import { StyleSheet, Text } from "react-native";
import { generalStyles } from "../../../styles/generalStyles";
import { Card } from "react-native-elements";

export function PanelCDetalle({ tipoc, placa, marca, modelo }) {
  return (
    <Card containerStyle={localStyles.card}>
      <Text style={[generalStyles.tittleText, { textAlign: "center" }]}>{tipoc}</Text>
      <Text style={generalStyles.tittleText}>Placa: {placa} </Text>
      <Text style={generalStyles.tittleText}>Marca: {marca} </Text>
      <Text style={generalStyles.tittleText}>Modelo: {modelo} </Text>
    </Card>
  );
}

const localStyles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    backgroundColor: "white",
    elevation: 4, // For Android shadow
    shadowColor: "rgba(0,0,0,0.2)", // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 1, // For iOS shadow
    shadowRadius: 4, // For iOS shadow
    width: "90%",
    alignItems: "center",
  },
});
