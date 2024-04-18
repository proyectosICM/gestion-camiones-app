import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Cuenta } from "../../common/cuenta";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { VerificarChecklist } from "./verificarChecklist";
import { Taller } from "./talller";

export function MechanicBottonTabBar() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#A69677",
        tabBarInactiveTintColor: "#9CA4A6",
      }}
    >
      <Tab.Screen
        name="Verificar Checklist"
        component={VerificarChecklist}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Taller"
        component={Taller}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="wrench" color={color} size={size} />,
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
