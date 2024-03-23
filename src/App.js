import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, ImageBackground, TextInput, TouchableOpacity } from 'react-native';

// import stylesheet from index file
import styles from '../src/index.js';

// package for svg images
import {SVG} from 'react-native-svg';
import FB from './assets/facebookicon.svg';
import Social2 from './assets/social2.svg'
import Pika from './assets/pikachu.svg';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("./assets/oip1.png")} resizeMode="cover" style={styles.image}>
        <Pika style={styles.pika}/>
        <Text style={styles.titulo}>HealthGotchi</Text>
        <TextInput
        style={styles.input}
        placeholder="Nome do Usuário:"/>
      <TextInput
        style={styles.input}
        placeholder="Senha:"
        secureTextEntry={true}/>
        <View style={styles.buttoncontainer}>
          <TouchableOpacity onPress={() => console.log("Registrado")}>
            <Text style={styles.text}>Registrar</Text>
          </TouchableOpacity>
        </View>
        <FB style={styles.imageLogo}/>
        <Social2 style={styles.imageLogo2}/>
      </ImageBackground>      
    </SafeAreaView>
  );
}
