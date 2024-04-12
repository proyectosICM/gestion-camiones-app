import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login/login';
import { Redirect } from './screens/login/redirect';
import { DriverBottomTabBar } from './screens/vistaConductor/driverBottomTabBar';
import { CamionDetalle } from './common/camionDetalle';
import { QRScanner } from './common/qrScanner';
import { CheckListCamion } from './common/checklists/checklistCamion';
import { VerificacionDatosEnvio } from './common/checklists/verificacionDatosEnvio';
import { InfoDetallada } from './screens/vistaConductor/infoDetallada/infoDetallada';
import { RegistrarCambioLlantas } from './screens/vistaConductor/registarCambioLlantas/registrarCambioLlantas';
import { Observaciones } from './screens/vistaConductor/observaciones/observaciones';
import { AdjuntarFotos } from './common/fotosUtils/adjuntarFotos';

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
        <Stack.Screen name='CheckDatos' component={VerificacionDatosEnvio} />


        <Stack.Screen name='InfoDetallada' component={InfoDetallada} />
        <Stack.Screen name='Cambio de llantas' component={RegistrarCambioLlantas} />
        <Stack.Screen name='Observaciones' component={Observaciones} />

        
        <Stack.Screen name='Adjuntar Fotos' component={AdjuntarFotos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

