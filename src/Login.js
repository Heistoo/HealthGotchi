import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './index.js';
import CheckBox from 'expo-checkbox';
import FB from './assets/facebookicon.svg';
import Social2 from './assets/social2.svg'

const Login = () => {
    const navigation = useNavigation();
    const [isChecked, setChecked] = React.useState(false);
    const handleLinkPress = (screenName) => {
        navigation.navigate(screenName);
    };

    return (
        // to do: linear gradient expo
        <SafeAreaView style={styles.container2}>
            <View style={styles.titleContainer2}>
                <Text style={styles.titulo}>HealthGotchi</Text>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.containerLoginBox}>
                    <Text style={styles.placeholder}>Nome do Usuário</Text>
                    <TextInput
                    style={[styles.input2, styles.roundedInput]}/>
                    <Text style={styles.placeholder2}>Senha</Text>
                    
                    <TextInput
                    style={[styles.input2, styles.roundedInput]}
                    secureTextEntry={true}/>
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
                        <TouchableOpacity onPress={() => handleLinkPress('Jogo')}>
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
        </SafeAreaView>
    );
};

export default Login;
