import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Keyboard, Platform, Pressable } from 'react-native';
import { Button, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';

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
        const max = await AsyncStorage.getItem('umidadeMax');
        const min = await AsyncStorage.getItem('umidadeMin');
        if (max !== null) setUmidadeMax(max);
        if (min !== null) setUmidadeMin(min);
      } catch (error) {
        console.error('Falha ao carregar configurações:', error);
      }
    };
    carregarConfiguracoes();
  }, []);

  const salvarConfiguracoesUmidade = async () => {
    try {
      await AsyncStorage.setItem('umidadeMax', umidadeMax);
      await AsyncStorage.setItem('umidadeMin', umidadeMin);

      // Salva a leitura atual no histórico
      const novaLeitura = {
        data: new Date().toISOString(),
        umidadeMax,
        umidadeMin,
      };
      await salvarLeitura(novaLeitura);

      Alert.alert('Sucesso', 'Configurações de umidade salvas com sucesso!');
      Keyboard.dismiss();
    } catch (error) {
      console.error('Falha ao salvar configurações de umidade:', error);
      Alert.alert('Erro', 'Falha ao salvar configurações de umidade.');
    }
  };

  const salvarLeitura = async (leitura) => {
    try {
      const historico = await AsyncStorage.getItem('historicoUmidade');
      const historicoArray = historico ? JSON.parse(historico) : [];
      historicoArray.push(leitura);
      await AsyncStorage.setItem('historicoUmidade', JSON.stringify(historicoArray));
    } catch (error) {
      console.error('Erro ao salvar leitura:', error);
    }
  };

  return (
    <View style={styles.fundo}>
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
              setItems={setItens}
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
  }
});
