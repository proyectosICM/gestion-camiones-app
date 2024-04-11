import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Card } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function TablaChecklist({ titulo, datos, marcar, setMarcar }) {
  const navigation = useNavigation();
  const handlePress = (index, estado) => {
    const newMarcar = [...marcar];
    newMarcar[index] = estado;
    setMarcar(newMarcar); 
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>{titulo}</Card.Title>
        <Card.Divider />
        <View style={styles.user}>
          <Text style={styles.name}>Revise</Text>
          <Text style={styles.buttonContainer}>Marque</Text>
          <Text style={styles.name2}>Estado</Text>
        </View>

        {datos.map((u, i) => {
          return (
            <View key={i} style={styles.user}>
              <Text style={styles.name}>{u.nombre}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.successButton, marcar[i] === true ? styles.selectedButton : null]}
                  onPress={() => handlePress(i, true)}
                >
                  <FontAwesome name="check" size={10} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.dangerButton, marcar[i] === false ? styles.selectedButton : null]}
                  onPress={() => handlePress(i, false)}
                >
                  <FontAwesome name="times" size={10} color="white" />
                </TouchableOpacity>
              </View>

              <View style={styles.name2}>
                {marcar[i] === null ? (
                  <Text style={{ color: "black" }}>Sin estado</Text>
                ) : marcar[i] ? (
                  <Text style={{ color: "green" }}>Buen estado</Text>
                ) : (
                  <Text style={{ color: "red" }}>Mal estado</Text>
                )}
              </View>
            </View>
          );
        })}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  container: {
    alignItems: "center",
  },
  card: {
    width: "82%",
  },
  buttonContainer: {
    flexDirection: "row",

    width: "30%",
    marginTop: 5,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 3,
    padding: "auto",
    paddingHorizontal: "auto",
  },
  successButton: {
    borderColor: "green",
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    margin: 2,
    width: "40%",
  },
  dangerButton: {
    borderColor: "red",
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    margin: 2,
    width: "40%",
    textAlign: "center",
  },
  buttonTitle: {
    color: "black",
  },
  user: {
    flexDirection: "row",
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    width: "40%",
    marginTop: 5,
    textAlign: "center",
  },
  name2: {
    fontSize: 16,
    width: "30%",
    marginTop: 5,
    textAlign: "center",
    justifyContent: "center",
    marginHorizontal: 3,
    paddingHorizontal: 6,
  },
});
