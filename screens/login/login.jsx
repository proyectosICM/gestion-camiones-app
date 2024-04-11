import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { loginStyles } from "./loginStyles";
import { useAuth } from "../../hooks/useAuth";


const backgroundImage = require("../login/loginFondo.jpg");

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth(); 

  const handleLogin = async () => {
    setError("");
    await login(username, password, setError);
  };

  return (
    <ImageBackground source={backgroundImage} style={loginStyles.backgroundImage}>
      <View style={loginStyles.container}>
        <Text style={loginStyles.title}>Inicio de Sesión</Text>
        <TextInput style={loginStyles.input} placeholder="Nombre de usuario" onChangeText={(text) => setUsername(text)} value={username} />
        <TextInput style={loginStyles.input} placeholder="Contraseña" onChangeText={(text) => setPassword(text)} value={password} secureTextEntry />
        <TouchableOpacity style={loginStyles.button} onPress={handleLogin}>
          <Text style={loginStyles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        {error && <Text style={loginStyles.errorText}>{error}</Text>}
      </View>
    </ImageBackground>
  );
}