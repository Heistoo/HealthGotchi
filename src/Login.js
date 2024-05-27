// Library imports
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import CheckBox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Styles import
import styles from './index.js';

// Image import
import FB from './assets/facebookicon.svg';
import Social2 from './assets/social2.svg';
import Tinka from './assets/tinka-logo.svg';


const images = {
    'login': require('./assets/login-screen.jpg')
}

const handleLinkPress = (screenName, navigation) => {
    navigation.navigate(screenName);
};

const fetchUserId = async (email, senha) => {
    try {
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/get_user_id`, { email, senha });
        if (response.status === 200) {
            return response.data.usuario_id;
        } else {
            Alert.alert('Erro ao obter ID do usuário', response.data.error || 'Algo deu errado.');
            return null;
        }
    } catch (error) {
        Alert.alert('Erro ao obter ID do usuário', error.message || 'Algo deu errado.');
        return null;
    }
};

const signInWithEmail = async (email, senha, setLoading, navigation) => {
    if (email === '' || senha === '') {
        Alert.alert('Preencha todos os campos!');
        return;
    }
    if (!email.includes('@')) {
        Alert.alert('Email inválido.');
        return;
    }
    setLoading(true);

    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            senha: senha,
        }),
    });

    try {
        //busca o id do usuário após o login bem-sucedido
        const usuarioId = await fetchUserId(email, senha);

        if (usuarioId) {
            //guarda o id do usuário no AsyncStorage para uso futuro
            await AsyncStorage.setItem('usuario_id', usuarioId.toString());
            Alert.alert('Login bem-sucedido!');
            navigation.navigate('Jogo');
        }
    } catch (error) {
        console.error('Erro ao realizar login: usuarioId não é um inteiro', error);
        Alert.alert('Erro ao realizar login: usuarioId não é um inteiro', error.message);
    }
    finally{
        setLoading(false);
    }
   
};

const Login = () => {
    const navigation = useNavigation();
    const [isChecked, setChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 

    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    };
    
    return (
        <SafeAreaView style={styles.container2}>
            <ImageBackground source={images['login']} style={styles.containerbg}>
                <View style={styles.titleContainer2}>
                    <Tinka style={styles.tinka}/>
                    <Text style={styles.titulo2}>HealthGotchi</Text>
                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.containerLoginBox}>
                        <Text style={styles.placeholder}>Email do Usuário</Text>
                        <TextInput
                            style={[styles.input2, styles.roundedInput]}
                            value={email}
                            onChangeText={setEmail}
                        />
                        <Text style={styles.placeholder2}>Senha</Text>
                        <View style={styles.passwordContainer}>
                          <TextInput
                              style={[styles.input2, styles.roundedInput, styles.passwordInput]}
                              secureTextEntry={!showPassword}
                              value={senha}
                              onChangeText={setSenha}
                          />
                          <TouchableOpacity onPress={toggleShowPassword} style={styles.iconContainer}>
                                <MaterialCommunityIcons 
                                    name={showPassword ? 'eye-off' : 'eye'} 
                                    size={24} 
                                    color="#aaa"
                                    style={styles.icon} 
                                />
                            </TouchableOpacity>
                        </View>
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
                            <TouchableOpacity onPress={() => signInWithEmail(email, senha, setLoading, navigation)}>
                                <Text style={styles.text}>Login</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => handleLinkPress('App', navigation)}>
                            <Text style={{color: '#4D73FA'}}>Registrar-se</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleLinkPress('Jogo', navigation)}>
                            <Text style={{color: '#4D73FA'}}>TelaJogo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleLinkPress('Inicial', navigation)}>
                            <Text style={{color: '#4D73FA'}}>Escolhe Inicial</Text>
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
};

export default Login;