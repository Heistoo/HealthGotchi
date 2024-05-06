
// Library Imports
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import CheckBox from 'expo-checkbox';

// StyleSheet
import styles from './index.js';

// Image Imports
import FB from './assets/facebookicon.svg';
import Social2 from './assets/social2.svg';
import Tinka from './assets/tinka-logo.svg';

const Login = () => {
    const navigation = useNavigation();
    const [isChecked, setChecked] = React.useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 
    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    };

    const images = {
        'login': require('./assets/login-screen.jpg')
    }

    const handleLinkPress = (screenName) => {
        navigation.navigate(screenName);
    };

    const signInWithEmail = async () => {
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
            const response = await fetch('http://54.167.89.222:5000/login', {
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
                Alert.alert('Usuário logado com sucesso!')
                navigation.navigate('Jogo')
            } else {
                Alert.alert('Erro ao fazer login', data.error || 'Algo deu errado.')
            }
        } catch (error) {
            Alert.alert('Erro ao fazer login', error.message || 'Algo deu errado.')
        }

        setLoading(false);
    };


    return (
        // to do: linear gradient expo
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
                        onChangeText={(text) => setEmail(text)}/>
                        <Text style={styles.placeholder2}>Senha</Text>
                        
                        <TextInput
                        style={[styles.input2, styles.roundedInput]}
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={(text) => setPassword(text)}/>
                        <MaterialCommunityIcons 
                        name={showPassword ? 'eye-off' : 'eye'} 
                        size={24} 
                        color="#aaa"
                        style={styles.icon} 
                        onPress={toggleShowPassword}/> 
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
                            <TouchableOpacity onPress={() => signInWithEmail()}>
                                <Text style={styles.text}>Login</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => handleLinkPress('App')}>
                                <Text style={{color: '#4D73FA'}}>Registrar-se</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleLinkPress('Jogo')}>
                                <Text style={{color: '#4D73FA'}}>TelaJogo</Text>
                        </TouchableOpacity>
                        <View style={styles.containerIcon}>
                            <FB style={styles.imageLogo}/>
                            <Social2 style={styles.imageLogo2}/>
                        </View>
                        <View>
                            
                        </View>
                    </View>
                        
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default Login;
