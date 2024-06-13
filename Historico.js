import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoricoScreen() {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const carregarHistorico = async () => {
      const historico = await AsyncStorage.getItem('historico');
      setHistorico(historico ? JSON.parse(historico) : []);
    };
    carregarHistorico();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Data: {item.data}</Text>
      <Text>Temperatura Máxima: {item.tempMax} °C</Text>
      <Text>Temperatura Mínima: {item.tempMin} °C</Text>
    </View>
  );

  return (
    <View style={styles.fundo}>
      <Card style={styles.container}>
        <Card.Title title="Histórico" />
        <Card.Content>
          <FlatList
            data={historico}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
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
    padding: 15,
    margin: 10,
    width: '90%',
    backgroundColor: '#f0f0f0',
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
});
