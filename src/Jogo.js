import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './index.js';
import CheckBox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';

import Pika from './assets/pikachu.svg';
import Fundo from './assets/jogo-background.png';

const Jogo = () => {
    const navigation = useNavigation();
    const [isChecked, setChecked] = useState(false);
    const [buttonPressed, setIfPressed] = useState(false);
    const images = {
        'fundo' : require('./assets/jogo-background.png'),
        'menu' : require('./assets/menu-button.png'),
        'camera' : require('./assets/camera-button.png'),
        'logo': require('./assets/main-logo.png'),
        'decorative': require('./assets/decorative-button.png'),
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.secondBackground}></View>
            <LinearGradient
            colors={['#FA9A43','#F4475A']}
            style={styles.background}
            locations={[0.1, 1]}
            >
                <Image style={styles.verticalLight}/>
                <Image style={styles.horizontalLight}/>
                    <View style={styles.cameraContainer}>
                        <ImageBackground source={images['fundo']} style={styles.fundoContainer}>
                            <Pika style={styles.pika2}/>
                        </ImageBackground>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Image source={images['camera']} style={styles.cameraButton} onPress={() => setIfPressed(!buttonPressed)}/>
                        <Image source={images['menu']} style={styles.menuButton}/>
                    </View>
                    <View style={styles.decorativeButtonContainer}>
                        <Image source={images['decorative']} style={styles.decorativeButton}/>
                        <Image source={images['decorative']}/>
                    </View>
                    <View>
                        <Image source={images['logo']} style={styles.logoButton}/>
                    </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default Jogo;