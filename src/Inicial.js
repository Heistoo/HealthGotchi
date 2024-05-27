//Para fazer:
/*Basicamente, falta adicionar um pop up perguntando para o usuário se o pet que ele escolheu é o que ele realemente quer,
mas também falta pegar a escolha do usuário e realmente implementar ela na tela de jogo*/

// Library
import React, { useState, useRef, useEffect } from 'react';
import { Text, Modal, Button, View, Alert, Animated, TouchableOpacity, TextInput, ImageBackground, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';


// StyleSheet import
import styles from '../src/index.js';
import axios from 'axios';

// Image Imports

// Image Usage

const Inicial = () => {
  const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(true); // Definindo modalVisible como true para que o pop-up apareça automaticamente
    const [escolha, setEscolha] = useState(0);
    const [nomePet, setNomePet] = useState('');
    const [usuarioId, setUsuarioId] = useState(null);

    //função que busca o id do usuário no AsyncStorage
    useEffect(() => {
      const fetchUsuarioId = async () => {
        try {
          const id = await AsyncStorage.getItem('usuario_id');
          if (id) {
            setUsuarioId(id);
          } else {
            Alert.alert('Erro', 'Não foi possível obter o ID do usuário');
          }
        } catch (error) {
          console.error('Erro ao buscar o ID do usuário:', error);
          Alert.alert('Erro ao buscar o ID do usuário:', error.message);
        }
      };
      fetchUsuarioId();
    }, []);

    const popUp = () => {
      Alert.alert('Pop-up fechado');
      setModalVisible(false); // Fechando o pop-up quando o usuário clica em Fechar
    };

    const images = {
      'tinkazilla': require('./assets/pets/tinkazilla.png'),
      'rocked': require('./assets/pets/rocked.png'),
      'heradummy': require('./assets/pets/heradummy.png'),
    }

    const selected = async (screenName) => {
      if (escolha == 0){
        Alert.alert('Por favor, selecione um dos pets antes de avançar.')
        return
      }else{
        Alert.alert("Pet selecionado: " + nomePet);
        const especies = ['Tinkazilla', 'Rocked', 'Heradummy'];
        const especie = especies[escolha - 1];

        // Chame a função para criar o bichinho no backend
        try {
          await AsyncStorage.setItem('escolha', escolha.toString());
          const resultado = await criarBichinho(especie, usuarioId);
          if (resultado) {
            navigation.navigate('Jogo');
          }
        } catch (error) {
          console.error('Erro ao criar bichinho:', error);
          Alert.alert('Erro ao criar bichinho:', error.message);
        }
      };
    }

    //Tinkazilla
    const handleTink = () => {
      Alert.alert('Tinkazilla');
      setNomePet('Tinkazilla');
      setEscolha(1);
        return
      
    };
    //Rocked
    const handleRock = () => {
      Alert.alert('Rocked');
      setNomePet('Rocked');
      setEscolha(2);
        return
      
    };
    //Heradummy
    const handleHera = () => {
      Alert.alert('Heradummy');
      setNomePet('Heradummy');
      setEscolha(3);
        return
      
    };
  
    const buttonStyle = escolha === 0 ? styles.button : styles.buttonSelected;

    const criarBichinho = async (nome, usuario_id) => {
      const url = `${process.env.EXPO_PUBLIC_API_URL}/create_pet`;  // Substitua 'seu-backend-url' pelo URL real do seu backend
    
      const data = {
        nome: nome,
        usuarioId: usuario_id
      };
    
      try {
        const response = await axios.post(url, data);
        if (response.status === 201) {
          console.log('Bichinho criado com sucesso:', response.data);
          return response.data; // Você pode retornar os dados para fazer algo mais se precisar
        } else {
          console.error('Erro ao criar bichinho:', response.data);
          Alert.alert('Erro ao criar bichinho:', response.data.error);
          return null;
        }
      } catch (error) {
        console.error('Erro na solicitação:', error);
        Alert.alert('Erro na solicitação:', error.message);
        return null;
      }
    };

    return (
      <SafeAreaView style={styles.containerInicial}>
      <View style={styles.modalBackground}></View>
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        popUp();
      }}
      >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Bem Vindo ao HeathGotchi, com o nosso aplicativo você escaneia alimentos para deixar seu pet e você saudáveis, dito isso, você pode apertar o botão da câmera para escanear alimentos a cada 3 horas, se você não alimentar seu pet em certo tempo os status dele cairão, e se fizer tudo certo ele vai evoluir, dito isso vamos escolher um pet para você.</Text>
          <Button title="OK" onPress={() => setModalVisible(false)} color="#26295E" />
        </View>
      </View>
      </Modal>

      <Text style={styles.titulo3}>Escolha seu Inicial</Text>

      <View style={styles.petSelectionContainer}>
        <TouchableOpacity onPress={handleTink} style={styles.petTouchable}>
          <Image source={images['tinkazilla']} style={styles.petImage}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRock} style={styles.petTouchable}>
          <Image source={images['rocked']} style={styles.petImage}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHera} style={styles.petTouchable}> 
          <Image source={images['heradummy']} style={styles.petImage}/>
        </TouchableOpacity>
      </View>

      <View style={styles.buttoncontainer2}>
        <TouchableOpacity onPress={() => selected("Jogo")} style={buttonStyle}>
          <Text style={styles.text}>Escolha</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    );
}; 
  export default Inicial;