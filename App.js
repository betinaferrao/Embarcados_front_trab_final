import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UmidadeScreen from './Umidade';
import HistoricoScreen from './Historico';
import HomeScreen from './Home';
import TemperaturaScreen from './Temperatura';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Temperatura" component={TemperaturaScreen} />
            <Stack.Screen name="Umidade" component={UmidadeScreen} />
            <Stack.Screen name="Historico" component={HistoricoScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}