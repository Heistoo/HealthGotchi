// ## WARNING
// IF APPLYING PACKAGES UTILIZING NPX EXPO INSTALL OR YARN, MAKE SURE TO CHANGE AppEntry.JS MAIN APP PATH TO: 
// "'../../src/App';"

import { StatusBar } from 'expo-status-bar';
import CheckBox from 'expo-checkbox';
import { StyleSheet, Text, View, Image, SafeAreaView, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

// import stylesheet from index file
import styles from '../src/index.js';

// package for svg images
import {SVG} from 'react-native-svg';
import FB from './assets/facebookicon.svg';
import Social2 from './assets/social2.svg'
import Pika from './assets/pikachu.svg';

export default function App() {
  const [isChecked, setChecked] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("./assets/oip1.png")} resizeMode="cover" style={styles.image}>
        <View style={styles.titleContainer}>
          <Pika style={styles.pika}/>
          <Text style={styles.titulo}>HealthGotchi</Text>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.containerLogin}>
            <Text style={styles.placeholder}>Nome do Usuário</Text>
            <TextInput
            style={styles.input}/>
            <Text style={styles.placeholder2}>Senha</Text>
            
            <TextInput
            style={styles.input}
            secureTextEntry={true}/>
            <View style={styles.section}>
              <CheckBox 
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? '#4630EB' : undefined}
              />
              <Text>Lembrar de mim</Text>
            </View>
            <View style={styles.buttoncontainer}>
              <TouchableOpacity onPress={() => console.log("Registrado")}>
                <Text style={styles.text}>Registrar</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FB style={styles.imageLogo}/>
          <Social2 style={styles.imageLogo2}/>
        </View>
      </ImageBackground>      
    </SafeAreaView>
  );
}
