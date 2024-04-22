import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './index.js';
import CheckBox from 'expo-checkbox';
import FB from './assets/facebookicon.svg';
import Social2 from './assets/social2.svg'

// Import database
import { supabase } from './db_service/supabase';

const Login = () => {
    const navigation = useNavigation();
    const [isChecked, setChecked] = React.useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const images = {
        'login': require('./assets/login-screen.jpg')
    }

    const handleLinkPress = (screenName) => {
        navigation.navigate(screenName);
    };

    async function signInWithEmail(){
        if (email === '' || password === ''){
            Alert.alert('Preencha todos os campos!')
            return
        }
        if (!email.includes('@')) {
            Alert.alert('Email inválido.')
            return
        }
        setLoading(true)
        const {error, data} = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error){
            Alert.alert(error.message)
        } else if (data){
            Alert.alert('Usuário logado com sucesso!')
            navigation.navigate('Jogo')
        }
        setLoading(false)
    }

    return (
        // to do: linear gradient expo
        <SafeAreaView style={styles.container2}>
            <ImageBackground source={images['login']}style={styles.container2}>
                <View style={styles.titleContainer2}>
                    <Text style={styles.titulo}>HealthGotchi</Text>
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
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}/>
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
