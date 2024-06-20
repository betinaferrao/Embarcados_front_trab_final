import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';

const ip = '192.168.178.143';

export default function HistoricoScreen() {
    const [registros, setRegistros] = useState([]);

    useEffect(() => {
        carregarRegistros();
    }, []);

    const carregarRegistros = async () => {
        try {
            const response = await axios.get(`http://${ip}:8000/Registro`);
            setRegistros(response.data);
        } catch (error) {
            console.error('Erro ao carregar histórico:', error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Title style={styles.title}>Histórico de Registros</Title>
            {registros.map((registro, index) => (
                <Card key={index} style={styles.card}>
                    <Card.Content>
                        <Paragraph><Text style={styles.title2}>Data/Hora:</Text> {registro.data_hora}</Paragraph>
                        <Paragraph><Text style={styles.title2}>Temperatura:</Text> {registro.temperatura} °C</Paragraph>
                        <Paragraph><Text style={styles.title2}>Umidade:</Text> {registro.umidade} %</Paragraph>
                    </Card.Content>
                </Card>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        padding: 10,
    },
    title: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    title2: {
        fontWeight: 'bold', 
    },
    card: {
        marginBottom: 10,
    },
});

