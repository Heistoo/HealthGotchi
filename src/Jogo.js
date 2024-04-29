import React, { useState, useRef, useEffect } from 'react';
import { Text, Button, View, TouchableOpacity, TextInput, ImageBackground, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './index.js';
import CheckBox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera } from 'expo-camera';
import OpenAI from 'openai';
import * as FileSystem from 'expo-file-system';
import { Modal } from 'react-native';

import Pika from './assets/pikachu.svg';
import Fundo from './assets/jogo-background.png';

const Jogo = () => {
    const navigation = useNavigation();
    const [food, setFood] = useState("");
    const [foodGroup, setFoodGroup] = useState("");
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

    // OpenAI ChatGPT
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

    const [ showModal, setShowModal] = useState(false);
    useEffect(() => {
        if ((food === "" || food === null) && (foodGroup === "" || foodGroup === null)){
            setShowModal(true)
        } else{
            setShowModal(false)
        }
    }, [food, foodGroup])

    const handleVision = async () => {
        const response = await openai.chat.completions.create({
            model: 'gpt-4-turbo',
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: "What food is in the image? Respond in this format {food: 'food_name', group: 'food_group'}, if don't have any food, write the value as null, knowing that the groups are: {" + groups.join(", ") + "}." },
                        { type: "image_url", image_url: { url: "data:image/jpeg;base64," + base64 } }
                    ]
                }
            ],
            max_tokens: 300
        });
        console.log('Resposta: ', response.choices[0].message.content)
        const { food, group } = response.choices[0].message.content;
    
        // To do: save food and group in "Food" and "FoodGroup" and make Modal to show up only when food/foodgroup is null
        if (food !== undefined && group !== undefined) {
            setFood(food);
            setFoodGroup(group);
        }
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
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}
                        >
                        <TouchableOpacity
                            style={{
                            flex: 0.1,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            }}
                            onPress={takePhoto}
                        >
                            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Take Photo </Text>
                        </TouchableOpacity>
                        </View>
                            
                            {/* OpenAi Checker */}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {photoUri && <Image source={{ uri: photoUri }} style={{ width: 300, height: 300 }} />}
                        {photoUri && <Button title="Analyze" onPress={async () => {
                        console.log(base64.slice(0, 100));
                        const response = await handleVision();
                        console.log(response);
                        alert(response);
                        }} />}
                    </View>
                    
                    <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleCam}>
                        <Image source={images['camera']} style={styles.cameraButton}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleMenu}>
                        <Image source={images['menu']} style={styles.menuButton}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDir}>
                        <Image source={images['direcional']} style={styles.dirButton}/>
                    </TouchableOpacity>
                    </View>
                        <Image source={images['sticker']} style={styles.sticker}/>
                        <Image source={images['decorative']} style={styles.decButton}/>
                        <Image source={images['decorative']} style={styles.decButton1}/>

                    <View>
                        <Image source={images['logo']} style={styles.logoButton}/>
                    </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default Jogo;