import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Keyboard, Platform, Pressable } from 'react-native';
import { Card } from 'react-native-paper';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

export default function TemperaturaScreen() {
  const [abrirMax, setAbrirMax] = useState(false);
  const [abrirMin, setAbrirMin] = useState(false);
  const [tempMax, setTempMax] = useState(null);
  const [tempMin, setTempMin] = useState(null);
  const [itens, setItens] = useState(
    Array.from({ length: 131 }, (_, i) => ({ label: `${i}`, value: `${i}` }))
  );

  useEffect(() => {
    const carregarConfiguracoes = async () => {
      try {
        const response = await axios.get('http://192.168.178.143:8000/Controle/1');
        const config = response.data;
        setTempMax(config.alto.toString());
        setTempMin(config.baixo.toString());
      } catch (error) {
        console.error('Falha ao carregar configurações:', error);
      }
    };
    carregarConfiguracoes();
  }, []);

  const salvarConfiguracoesTemperatura = async () => {
    try {
      await axios.patch('http://192.168.178.143:8000/Controle/1', {
        alto: parseInt(tempMax, 10),
        baixo: parseInt(tempMin, 10)
      });
      Alert.alert('Sucesso', 'Configurações de temperatura salvas com sucesso!');
      Keyboard.dismiss();
    } catch (error) {
      console.error('Falha ao salvar configurações de temperatura:', error);
      Alert.alert('Erro', 'Falha ao salvar configurações de temperatura.');
    }
  };

  return (
    <View style={styles.fundo}>
      <Card style={styles.container2}>
        <Text style={styles.subtitletitle}>Legenda do Led:</Text>
        <Text><Text style={styles.text1}>Vermelho:</Text> Acima da temperatura máxima</Text>
        <Text><Text style={styles.text2}>Verde:</Text> Entre temperatura máxima e miníma</Text>
        <Text><Text style={styles.text3}>Azul:</Text> Abaixo da temperatura miníma</Text> 
      </Card>
      <Card style={styles.container} >
        <Card.Title title="Configuração de Temperatura" titleStyle={styles.title}/>
        <Card.Content>
          <Text>Temperatura Máxima</Text>
          <View style={abrirMax ? styles.dropdownAberto : styles.dropdownFechado}>
            <DropDownPicker
              placeholder=""
              open={abrirMax}
              value={tempMax}
              items={itens}
              setOpen={setAbrirMax}
              setValue={setTempMax}
              setItems={setItens}
              containerStyle={styles.dropdown}
              zIndex={5000}
              zIndexInverse={1000}
            />
          </View>
          <Text>Temperatura Mínima</Text>
          <View style={abrirMin ? styles.dropdownAberto : styles.dropdownFechado}>
            <DropDownPicker
              placeholder=""
              open={abrirMin}
              value={tempMin}
              items={itens}
              setOpen={setAbrirMin}
              setValue={setTempMin}
              containerStyle={styles.dropdown}
              zIndex={4000}
              zIndexInverse={900}
            />
          </View>
          <View style={styles.botao}>
            <Pressable style={styles.textoBotao} onPress={salvarConfiguracoesTemperatura}>
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
