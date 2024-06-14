import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';
import { Card } from 'react-native-paper';
import axios from 'axios';

export default function ModoScreen() {
  const [modoAtual, setModoAtual] = useState(null);

  useEffect(() => {
    const carregarModoAtual = async () => {
      try {
        const response = await axios.get('http://192.168.178.143:8000/Controle/Modo');
        const modo = response.data.modo;
        setModoAtual(modo);
      } catch (error) {
        console.error('Falha ao carregar modo atual:', error);
      }
    };
    carregarModoAtual();
  }, []);

  const alterarModo = async (novoModo) => {
    try {
      await axios.patch(`http://192.168.178.143:8000/Controle/Modo/${novoModo}`);
    //   Alert.alert('Sucesso', 'Modo atualizado com sucesso!');
      setModoAtual(novoModo);
    } catch (error) {
      console.error('Falha ao alterar modo:', error);
      Alert.alert('Erro', 'Falha ao alterar modo.');
    }
  };

  return (
    <View style={styles.fundo}>
      <Text style={styles.title}>Configuração de Modo</Text>
      <Card style={styles.container}>
        <Card.Content>
          <Text style={styles.titleContainer}>Modo Atual: {modoAtual === 0 ? 'Umidade' : 'Temperatura'}</Text>
          <View style={[styles.botao, { backgroundColor: modoAtual === 0 ? '#0ABAB5' : '#FF6347' }]}>
            <Pressable style={styles.textoBotao} onPress={() => alterarModo(modoAtual === 0 ? 1 : 0)}>
              <Text style={styles.texto}>Alterar Modo</Text>
            </Pressable>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    margin: 10,
    width: '90%',
  },
  botao: {
    marginTop: 20,
    width: '100%',
    padding: 10,
    borderRadius: 15,
  },
  textoBotao: {
    alignItems: 'center'
  },
  texto: {
    color: 'white',
    fontSize: 16
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  titleContainer: {
    fontSize: 16,
  }
});
