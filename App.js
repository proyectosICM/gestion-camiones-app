import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login/login';
import { Redirect } from './screens/login/redirect';
import { DriverBottomTabBar } from './screens/vistaConductor/driverBottomTabBar';
import { CamionDetalle } from './common/camionDetalle';
import { QRScanner } from './common/qrScanner';
import { CheckListCamion } from './common/checklists/checklistCamion';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Redirigir' component={Redirect} />

        <Stack.Screen
          name="Inicio Conductor"
          component={DriverBottomTabBar}
          options={{ headerShown: false }}
        />

        <Stack.Screen name='Scanner' component={QRScanner} />
        <Stack.Screen name='Detalles' component={CamionDetalle} />

        <Stack.Screen name='CheckList Camion' component={CheckListCamion} /> 

      </Stack.Navigator>
    </NavigationContainer>
  );
}

