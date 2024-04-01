import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './index.js';
import CheckBox from 'expo-checkbox';
import { LinearGradient } from 'react-native-svg';
// I'm not sure if the gradient worked, since I wasn't able to reach this screen

const Jogo = () => {
    const navigation = useNavigation();
    const [isChecked, setChecked] = React.useState(false);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(1,62,217,1)', 'rgba(12,227,240,1)']}
                    style={styles.background}
                />
            </View>
        </SafeAreaView>
    );
};

export default Jogo;