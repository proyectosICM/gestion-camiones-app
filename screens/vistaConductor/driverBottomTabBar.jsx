import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { VerificacionCamion } from "./verificacionCamion";
import { CamionSeleccionado } from "./camionSeleccionado";
import { Cuenta } from "../../common/cuenta";

const Tab = createBottomTabNavigator();

export function DriverBottomTabBar({ navigation }) {
 
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
        initialParams={{ tipoVehiculo: 'camion' }} 
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" color={color} size={size} />,
        }}
      />


      <Tab.Screen
        name="Asignado"
        component={CamionSeleccionado}
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
