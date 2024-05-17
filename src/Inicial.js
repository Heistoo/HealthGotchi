//Para fazer:
/*Basicamente, falta adicionar um pop up perguntando para o usuário se o pet que ele escolheu é o que ele realemente quer,
mas também falta pegar a escolha do usuário e realmente implementar ela na tela de jogo*/

// Library
import React, { useState, useRef, useEffect } from 'react';
import { Text, Modal, Button, View, Alert, Animated, TouchableOpacity, TextInput, ImageBackground, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


// StyleSheet import
import styles from '../src/index.js';

// Image Imports

// Image Usage

const Inicial = () => {
  const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(true); // Definindo modalVisible como true para que o pop-up apareça automaticamente
    const [escolha, setEscolha] = useState(0);
    const [nomePet, setNomePet] = useState('');

    const popUp = () => {
      Alert.alert('Pop-up fechado');
      setModalVisible(false); // Fechando o pop-up quando o usuário clica em Fechar
    };

    const images = {
      'tinkazilla': require('./assets/pets/tinkazilla.png'),
      'rocked': require('./assets/pets/rocked.png'),
      'heradummy': require('./assets/pets/heradummy.png'),
    }

    const selected = (screenName) => {
      if (escolha == 0){
        Alert.alert('Por favor, selecione um dos pets antes de avançar.')
        return
      }
      else{
        Alert.alert("Pet selecionado: " + nomePet);
        navigation.navigate(screenName);
      }
    };


    //Tinkazilla
    const handleTink = () => {
      Alert.alert('Tinkazilla');
      setNomePet('Tinkazilla');
      setEscolha(1);
        return
      
    };
    //Tinkazilla
    const handleRock = () => {
      Alert.alert('Rocked');
      setNomePet('Rocked');
      setEscolha(1);
        return
      
    };
    //Tinkazilla
    const handleHera = () => {
      Alert.alert('Heradummy');
      setNomePet('Heradummy');
      setEscolha(1);
        return
      
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

      <TouchableOpacity onPress={handleTink}>
        <Image source={images['tinkazilla']} style={styles.ini1}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRock}>
        <Image source={images['rocked']} style={styles.ini2}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleHera}> 
        <Image source={images['heradummy']} style={styles.ini3}/>
      </TouchableOpacity>

        <View style={styles.buttoncontainer2}>
          <TouchableOpacity onPress={() => selected("Jogo")}>
            <Text style={styles.text}>Escolha</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  export default Inicial;