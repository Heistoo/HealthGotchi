// Library Imports
import React, { useState, useRef, useEffect } from 'react';
import { Text, Button, View, TouchableOpacity, TextInput, ImageBackground, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera } from 'expo-camera';
import OpenAI from 'openai';
import * as FileSystem from 'expo-file-system';

// Stylesheet
import styles from './index.js';

// Image Imports
import Pika from './assets/pikachu.svg';
import Fundo from './assets/jogo-background.png';
import { parse } from 'expo-linking';

const Jogo = () => {
    const navigation = useNavigation();
    const [food, setFood] = useState("");
    const [foodGroup, setFoodGroup] = useState("");

    // Image Usage
    const images = {
        'fundo': require('./assets/jogo-background.png'),
        'menu': require('./assets/menu-button.png'),
        'camera': require('./assets/camera-button.png'),
        'logo': require('./assets/main-logo.png'),
        'direcional' : require('./assets/direcional.png'),
        'sticker' : require('./assets/sticker.png'),
        'decorative': require('./assets/decorative-button.png'),
    }

    //Camera
    const [camera, setCamera] = useState(null)

    const handleCam = () => {
        setCamera(!camera);
    }

    //Menu
    const handleMenu = () => {
        console.log('Menu Aberto...');
        // Adicione aqui o que deseja fazer quando o botão de menu for pressionado
    }

    //Direcional
    const handleDir = () => {
        console.log('Interagindo com o pet...');
        // Adicione aqui o que deseja fazer quando a imagem for pressionada
    };

    // OpenAI ChatGPT handler
    const openai = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_API_KEY_OPENAI });

    const [hasPermission, setHasPermission] = useState(null);
    const [photoUri, setPhotoUri] = useState(null);
    const [base64, saveBase64] = useState(null);
    const cameraRef = useRef(null);

    const groups = ["Frutas", "Legumes e verduras", "Carnes e ovos", "Cereais, tubérculos, pães e raízes", "Leguminosas", "Leites e derivados", "Doces, guloseimas e salgadinhos"]

    useEffect(() => {
        (async () => {
            if (Platform.OS === 'web') {
                const { status } = await Camera.requestCameraPermissionsAsync();
                setHasPermission(status === 'granted');
            } else {
                const { status } = await Camera.requestCameraPermissionsAsync();
                setHasPermission(status === 'granted');
            }
        })();
    }, []);
    
    useEffect(() => {
        if (food === null && foodGroup === null) {
            alert('Comida não detectada, tente novamente.');
        } else if (food && foodGroup) {
            alert(`Comida: ${food}, Grupo: ${foodGroup}`);
        }
    }, [food, foodGroup]);

    const handleVision = async () => {
        const response = await openai.chat.completions.create({
            model: 'gpt-4-turbo',
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: "What food is in the image? Respond in this format {\"food\": \"food_name\", \"group\": \"food_group\"}, if don't have any food, write the value as null, knowing that the groups are: {" + groups.join(", ") + "}." },
                        { type: "image_url", image_url: { url: "data:image/jpeg;base64," + base64 } }
                    ]
                }
            ],
            max_tokens: 300
        });
        console.log('Resposta: ', response.choices[0].message.content);
    
        let parsedResponse;

        // Checa se a resposta é uma string
        if (typeof response.choices[0].message.content === 'string') {
            // Parse em um objeto
            parsedResponse = JSON.parse(response.choices[0].message.content);
        } else {
            // Se a resposta já for um objeto, converte numa const e ela passa para food & group
            parsedResponse = response.choices[0].message.content;
        }

    const { food, group } = parsedResponse;

    if (food !== undefined && group !== undefined) {
        setFood(food);
        setFoodGroup(group);
    }

    return parsedResponse;
    }
    

    const takePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            const base64 = await FileSystem.readAsStringAsync(photo.uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            setPhotoUri(photo.uri);
            saveBase64(base64);
        }
    };

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
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
                        {camera ? (
                        <Camera
                            style={{ flex: 1, width: '100%', height: '100%' }} // Adjust this style as needed
                            type={Camera.Constants.Type.back}
                            ref={cameraRef}
                        />
                    ): (
                        <ImageBackground source={images['fundo']} style={styles.fundoContainer}>
                            <Pika style={styles.pika2}/>
                        </ImageBackground>
                    )}
                    </View>
                    {/* <View>
                            <TouchableOpacity onPress={takePhoto}>
                                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Take Photo </Text>
                            </TouchableOpacity>
                        </View>    */}     
                    <View >
                         {/* OpenAi Checker */}
                            <View style={{ justifyContent: 'center', alignItems: 'center', height: 35}}>
                                {photoUri && <Image source={{ uri: photoUri }} />}
                                {photoUri && <Button title="Analyze" onPress={async () => {
                                console.log(base64.slice(0, 100));
                                await handleVision();
                                }} />}
                            </View>
                        <View style={styles.gameContainer}>
                            <TouchableOpacity onPress={takePhoto}>
                                <Image source={images['direcional']} style={styles.dirButton}/>
                            </TouchableOpacity>
                            <View >
                                <TouchableOpacity onPress={handleCam}>
                                    <Image source={images['camera']} style={styles.cameraButton}/>
                                </TouchableOpacity>
                                <View>
                                    <TouchableOpacity onPress={handleMenu}>
                                        <Image source={images['menu']} style={styles.menuButton}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.stickerContainer}>
                            <Image source={images['sticker']} style={styles.sticker}/>
                            <Image source={images['decorative']} style={styles.decButton}/>
                            <Image source={images['decorative']} style={styles.decButton1}/>
                        </View>
                    </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default Jogo;