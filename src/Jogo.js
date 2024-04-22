import React from 'react';
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
    const [isChecked, setChecked] = React.useState(false);
    const images = {
        'fundo' : require('./assets/jogo-background.png'),
        'menu' : require('./assets/menu-button.png'),
        'camera' : require('./assets/camera-button.png'),
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
            colors={['#FA9943','#F44E58']}
            style={styles.background}
            locations={[0.1, 0.9]}
            >
                <View style={styles.cameraContainer}>
                    <ImageBackground source={images['fundo']} style={styles.fundoContainer}>
                        <Pika style={styles.pika2}/>
                    </ImageBackground>
                </View>
                <View style={styles.buttonContainer}>
                    <Image source={images['camera']} style={styles.cameraButton}/>
                    <Image source={images['menu']} style={styles.menuButton}/>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default Jogo;