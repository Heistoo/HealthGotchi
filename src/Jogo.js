import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './index.js';
import CheckBox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';
// I'm not sure if the gradient worked, since I wasn't able to reach this screen

const Jogo = () => {
    const navigation = useNavigation();
    const [isChecked, setChecked] = React.useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
            colors={['#013ED9','#0C9EF0']}
            style={styles.background}
            locations={[0.1, 0.9]}
            >
                <View style={styles.cameraContainer}>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default Jogo;