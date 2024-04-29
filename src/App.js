//main imports
import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';
import CheckBox from 'expo-checkbox';
import { Text, View, Image, SafeAreaView, ImageBackground, TextInput, TouchableOpacity, Linking, AppState, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';

// Import database
import { supabase } from './db_service/supabase';

// import stylesheet from index file
import styles from '../src/index.js';

// package for svg images
import {SVG} from 'react-native-svg';
import FB from './assets/facebookicon.svg';
import Social2 from './assets/social2.svg'
import Pika from './assets/pikachu.svg';
import Login from './Login.js';
import Jogo from './Jogo.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { screensEnabled } from 'react-native-screens';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

const Stack = createStackNavigator();
//Image assets
const images = {
  'oip1': require('./assets/oip1.png'),
}
// Preload image cache
function loadImage(images){
  return Promise.all(Object.keys(images).map((i) => {
    let img = {
      ...Image.resolveAssetSource(images[i]),
      cache:'force-cache'
    };
    return Image.prefetch(img.uri);
  }))
}
// Navigation tools
export default function Main() {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    loadImage(images).then(() => setImagesLoaded(true));
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="App" component={AppScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Jogo" component={Jogo} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}registerRootComponent(Main);


function AppScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signUpWithEmail = async () => {
    if (email === '' || password === '') {
        Alert.alert('Preencha todos os campos!')
        return
    }
    if (!email.includes('@')) {
        Alert.alert('Email inválido.')
        return
    }
    setLoading(true);

    try {
        const response = await fetch('http://IP_DO_PC_RODANDO:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                senha: password
            }),
        });

        const data = await response.json();

        if (response.ok) {
            Alert.alert('Usuário registrado com sucesso!')
            navigation.navigate('Jogo')
        } else {
            Alert.alert('Erro ao registrar usuário', data.error || 'Algo deu errado.')
        }
    } catch (error) {
        Alert.alert('Erro ao registrar usuário', error.message || 'Algo deu errado.')
    }

    setLoading(false);
};
  //checkbox state
  const [isChecked, setChecked] = React.useState(false);
  // on press = goes to Login page
  const handleLinkPress = (screenName) => {
    navigation.navigate(screenName);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={images['oip1']} resizeMode="cover" style={styles.image}>
        <View style={styles.titleContainer}>
          <Pika style={styles.pika}/>
          <Text style={styles.titulo}>HealthGotchi</Text>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.containerLogin}>
            <Text style={styles.placeholder}>Email do Usuário</Text>
            <TextInput
            style={styles.input} value={email} onChangeText={(text) => setEmail(text)}/>
            <Text style={styles.placeholder2}>Senha</Text>
            
            <TextInput
            style={styles.input} value={password} onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}/>
            <View style={styles.buttoncontainer}>
              <TouchableOpacity onPress={() => signUpWithEmail()}>
                <Text style={styles.text}>Registrar</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => handleLinkPress('Login')}>
              <Text style={{color: '#4D73FA'}}>Ir para a tela de login</Text>
            </TouchableOpacity>
            <View style={styles.containerIcon}>
              <FB style={styles.imageLogo}/>
              <Social2 style={styles.imageLogo2}/>
            </View>
          </View>
        </View>
      </ImageBackground>      
    </SafeAreaView> 
  );
}