import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import { View } from "react-native";
import { Text, Icon, Divider, Button } from "react-native-elements";
import { FontAwesome } from "react-native-vector-icons";
import { ColorIcono, ColorTexto, ColorTextoBoton, fondoGeneral } from "../styles/paletaColores";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { infoUserURL } from "../api/apiurls";
import { useListarElementos } from "../hooks/useListUtils";
import { useLogout } from "../hooks/useLogout";
import { useGetAsyncStorage } from "../hooks/asyncStorageUtils";

export function Cuenta() {
  const [username, setUsername] = useState("");
  const [userData, setuserData] = useState("");

  useGetAsyncStorage("username", setUsername);

  const ListarUsuarios = useListarElementos(`${infoUserURL}${username}`, setuserData);

  useEffect(() => {
    ListarUsuarios();
  }, [ListarUsuarios]);

  const handleLogout = useLogout();

  return (
    <ImageBackground source={fondoGeneral} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.iconContainer}>
          <Icon name="user-circle" type="font-awesome" size={80} color="#333" />
        </View>
        <Text style={[styles.title, { textAlign: "center" }]}> {username ? `¡Hola, ${username}!` : ""}</Text>
        <Divider style={{ backgroundColor: "#333", marginVertical: 10 }} />
        <Text style={styles.subtitle}>{userData ? `  Nombre: ${userData.nombre} ${userData.apellido}` : "Cargando..."}</Text>
        <Text style={styles.subtitle}>Rol: {userData.rolesModel?.nombre}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title=" Cambiar Contraseña"
            onPress={() => {
              alert("Este modulo aun no esta disponible");
            }}
            icon={<FontAwesome name="key" size={20} color={ColorIcono} />}
            buttonStyle={{ backgroundColor: "#007bff", marginBottom: 10 }}
            titleStyle={{ color: ColorTextoBoton }}
          />
          <Button
            title=" Editar Perfil"
            onPress={() => {
              alert("Este modulo aun no esta disponible");
            }}
            icon={<FontAwesome name="edit" size={20} color={ColorIcono} />}
            buttonStyle={{ backgroundColor: "#28a745", marginBottom: 10 }}
            titleStyle={{ color: ColorTextoBoton }}
          />
          <Button
            title=" Historial de Actividades"
            onPress={() => {
              alert("Este modulo aun no esta disponible");
            }}
            icon={<FontAwesome name="history" size={20} color={ColorIcono} />}
            buttonStyle={{ backgroundColor: "#6c757d" }}
            titleStyle={{ color: ColorTextoBoton }}
          />
          <Button
            title=" Cerrar Sesión"
            onPress={() => handleLogout()}
            icon={<FontAwesome name="sign-out" size={20} color={ColorIcono} />}
            buttonStyle={{ backgroundColor: "#ff6347", marginTop: 20 }}
            titleStyle={{ color: ColorTextoBoton }}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#f4f4f4",
    padding: 80,
  },
  iconContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: ColorTexto,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    color: ColorTexto,
  },
  buttonContainer: {
    marginTop: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
});
