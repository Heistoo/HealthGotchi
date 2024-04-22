import React from 'react';
import { Text, View, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
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
    const image = {
        'fundo' : require('./assets/jogo-background.png')
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
            colors={['#FA9943','#F44E58']}
            style={styles.background}
            locations={[0.1, 0.9]}
            >
                <View style={styles.cameraContainer}>
                    <ImageBackground source={image['fundo']} style={styles.fundoContainer}>
                        <Pika style={styles.pika2}/>
                    </ImageBackground>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default Jogo;