import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { VerificacionCamion } from "./verificacionCamion";
import { Cuenta } from "../../common/cuenta";
import { CamionAsignado } from "./camionAsignado";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

export function DriverBottomTabBar() {

  return (
    <Tab.Navigator 
      screenOptions={{ 
        tabBarActiveTintColor: "#A69677", 
        tabBarInactiveTintColor: "#9CA4A6", 
      }}
    >
      <Tab.Screen 
        name="Inicio"
        component={VerificacionCamion}
        initialParams={{ tipoVehiculoParam: 'camion' }} 
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" color={color} size={size} />,
        }}
      />


      <Tab.Screen
        name="Asignado"
        component={CamionAsignado}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="truck" color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Cuenta"
        component={Cuenta}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person-circle" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
