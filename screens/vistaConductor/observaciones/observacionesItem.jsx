import React from "react";
import { Text, View } from "react-native";
import { Card } from "react-native-elements";
import { ColorTexto } from "../../../styles/paletaColores";

export function ObservacionesItem({ name }) {
  return (
    <Card>
      <View style={{ width: 250 }}>
        <Card.Title>
          <Text style={{ color: ColorTexto }}>{name}</Text>
        </Card.Title>
      </View>
    </Card>
  );
}
