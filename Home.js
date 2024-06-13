import * as React from 'react';
import { View, Text, Image, Button, StyleSheet, BackHandler, Pressable } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.containerFundo} >
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./assets/icon-temp.png')} />
      </View>
      <View style={styles.button}>
        <Pressable style={styles.textoBotao} onPress={() => navigation.navigate('Temperatura')}> 
          <Text style={styles.texto}>Temperatura</Text>
        </Pressable>      
      </View>
      <View style={styles.button}>
        <Pressable style={styles.textoBotao} onPress={() => navigation.navigate('Umidade')}> 
          <Text style={styles.texto}>Umidade</Text>
        </Pressable>      
      </View>
      <View style={styles.button}>
        <Pressable style={styles.textoBotao} onPress={() => navigation.navigate('Historico')}> 
          <Text style={styles.texto}>Histórico</Text>
        </Pressable>      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerFundo: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightblue'
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
  },
  logo: {
    height: 250,
    width: 250,
  },
  title: {
    padding: 30,
    fontSize: 18,
  },
  button: {
    padding: 10,
    margin: 8,
    color: 'black',
    // backgroundColor: "#fc4133",
    // backgroundColor: "#03BB85",
    // backgroundColor: "#005B8F",
    backgroundColor: "#0ABAB5",
    borderRadius: 15,
    height: 44,
    width: 300
  },
  textoBotao: {
    alignItems: 'center'
  },
  texto: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
});