import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Keyboard, Platform, Pressable } from 'react-native';
import { Button, Card } from 'react-native-paper';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
const { IP_ADDRESS } = require('./config');

const ip = '192.168.178.143';

export default function UmidadeScreen() {
  const [abrirMax, setAbrirMax] = useState(false);
  const [abrirMin, setAbrirMin] = useState(false);
  const [umidadeMax, setUmidadeMax] = useState(null);
  const [umidadeMin, setUmidadeMin] = useState(null);
  const [itens, setItens] = useState(
    Array.from({ length: 101 }, (_, i) => ({ label: `${i}`, value: `${i}` }))
  );

  useEffect(() => {
    const carregarConfiguracoes = async () => {
      try {
        const response = await axios.get(`http://${IP_ADDRESS}:8000/Controle/0`); 
        const config = response.data;
        setUmidadeMax(config.alto.toString());
        setUmidadeMin(config.baixo.toString());
      } catch (error) {
        console.error('Falha ao carregar configurações de umidade:', error);
      }
    };
    carregarConfiguracoes();
  }, []);


  const salvarConfiguracoesUmidade = async () => {
    try {
      await axios.patch(`http://${IP_ADDRESS}:8000/Controle/0`, {
        alto: parseInt(umidadeMax, 10),
        baixo: parseInt(umidadeMin, 10)
      });
      Alert.alert('Sucesso', 'Configurações de umidade salvas com sucesso!');
      Keyboard.dismiss();
    } catch (error) {
      console.error('Falha ao salvar configurações de umidade:', error);
      Alert.alert('Erro', 'Falha ao salvar configurações de umidade.');
    }
  };

  return (
    <View style={styles.fundo}>
      <Card style={styles.container2}>
        <Text style={styles.subtitletitle}>Legenda do Led:</Text>
        <Text><Text style={styles.text1}>Vermelho:</Text> Acima da umidade máxima</Text>
        <Text><Text style={styles.text2}>Verde:</Text> Entre umidade máxima e miníma</Text> 
        <Text><Text style={styles.text3}>Azul:</Text> Abaixo da umidade miníma</Text>
      </Card>
      <Card style={styles.container}>
        <Card.Title title="Configuração de Umidade" titleStyle={styles.title}/>
        <Card.Content>
          <Text>Umidade Máxima</Text>
          <View style={abrirMax ? styles.dropdownAberto : styles.dropdownFechado}>
            <DropDownPicker
              placeholder=""
              open={abrirMax}
              value={umidadeMax}
              items={itens}
              setOpen={setAbrirMax}
              setValue={setUmidadeMax}
              containerStyle={styles.dropdown}
              zIndex={5000}
              zIndexInverse={1000}
            />
          </View>
          <Text>Umidade Mínima</Text>
          <View style={abrirMin ? styles.dropdownAberto : styles.dropdownFechado}>
            <DropDownPicker
              placeholder=""
              open={abrirMin}
              value={umidadeMin}
              items={itens}
              setOpen={setAbrirMin}
              setValue={setUmidadeMin}
              setItems={setItens}
              containerStyle={styles.dropdown}
              zIndex={4000}
              zIndexInverse={900}
            />
          </View>
          <View style={styles.botao}>
            <Pressable style={styles.textoBotao} onPress={salvarConfiguracoesUmidade}>
              <Text style={styles.texto}>Salvar Configurações</Text>
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
  container2: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    margin: 10,
    width: '90%',
  },
  dropdown: {
    marginVertical: 10,
    width: '100%',
  },
  dropdownAberto: {
    zIndex: 1000,
    ...(Platform.OS === 'android' && { elevation: 3 }),
  },
  dropdownFechado: {
    zIndex: 1,
    ...(Platform.OS === 'android' && { elevation: 0 }),
  },
  botao: {
    backgroundColor: '#0ABAB5',
    marginTop: 15,
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
    fontSize: 18,
    fontWeight: 'bold'
  },
  subtitletitle: {
    fontWeight: 'bold'
  },
  text1: {
    fontWeight: 'bold',
    color: 'red'
  },
  text2: {
    fontWeight: 'bold',
    color: 'green'
  },
  text3: {
    fontWeight: 'bold',
    color: 'blue'
  }
});
