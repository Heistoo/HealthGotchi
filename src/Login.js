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
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/get_user_id`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            senha: senha,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        return data.usuario_id;
    } else {
        throw new Error('Failed to fetch user ID');
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

    try {
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

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro ao realizar login');
        }

        // Busca o ID do usuário após o login bem-sucedido
        const usuarioId = await fetchUserId(email, senha);

        if (usuarioId) {
            // Guarda o ID do usuário no AsyncStorage para uso futuro
            await AsyncStorage.setItem('usuario_id', usuarioId.toString());
            Alert.alert('Login bem-sucedido!');
            navigation.navigate('Jogo');
        }
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        Alert.alert('Erro ao realizar login', error.message);
    } finally {
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
                    <Tinka style={styles.tinka} />
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
                            {/* Se os componentes FB e Social2 forem imagens ou outros componentes, certifique-se de que não estão causando problemas */}
                            {/* <FB style={styles.imageLogo} />
                            <Social2 style={styles.imageLogo2} /> */}
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};
export default Login;