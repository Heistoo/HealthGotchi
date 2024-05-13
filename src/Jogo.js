// Library Imports
import React, { useState, useRef, useEffect } from 'react';
import { Text, Button, View, TouchableOpacity, TextInput, ImageBackground, Image, Platform, ProgressBarAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera } from 'expo-camera';
import OpenAI from 'openai';
import * as FileSystem from 'expo-file-system';
// import { Accelerometer } from 'react-native-sensors';

// Stylesheet
import styles from './index.js';

// Image Imports
import Strength from './assets/menu/strength.svg'
import Resistance from './assets/menu/resistance.svg'
import Health from './assets/menu/health.svg'
import Happy from './assets/menu/happiness.svg' 
import Energy from './assets/menu/energy.svg'
import Passos from './assets/menu/passos.svg'
import Status from './assets/menu/status.svg'
import Tarefas from './assets/menu/tarefas.svg'
import Shop from './assets/menu/shop.svg'
import Menu from './assets/menu/menu.svg'
import Back from './assets/menu/back.svg'

const Jogo = () => {
    const navigation = useNavigation();
    const [food, setFood] = useState("");
    const [foodGroup, setFoodGroup] = useState("");
    const [pressed, setPressed] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [visMenu, setVisMenu] = useState(false);
    const [visDia, setVisDia] = useState(false);
    const [visSem, setVisSem] = useState(false);
    const [visPass, setVisPass] = useState(false);
    const [visShop, setVisShop] = useState(false);
    // const [stepCount, setStepCount] = useState(0);

    // Image Usage
    const images = {
        'fundo': require('./assets/jogo-background.png'),
        'menu': require('./assets/menu-button.png'),
        'camera': require('./assets/camera-button.png'),
        'logo': require('./assets/main-logo.png'),
        'direcional' : require('./assets/direcional.png'),
        'sticker' : require('./assets/sticker.png'),
        'decorative': require('./assets/decorative-button.png'),
        'passos2': require('./assets/menu/passos2.png'),
        'asphalt': require('./assets/pets/asphalt.png'),
        'banabat': require('./assets/pets/banabat.png'),
        'brekorb': require('./assets/pets/brekorb.png'),
        'bugwheel': require('./assets/pets/bugwheel.png'),
        'carnivalt': require('./assets/pets/carnivalt.png'),
        'charcopala': require('./assets/pets/charcopala.png'),
        'cromirin': require('./assets/pets/cromirin.png'),
        'feveroar': require('./assets/pets/feveroar.png'),
        'hydraqua': require('./assets/pets/hydraqua.png'),
        'minde': require('./assets/pets/minde.png'),
        'toxtoad': require('./assets/pets/toxtoad.png'),
        'wickiked': require('./assets/pets/wickiked.png'),
    }


    //Camera
    const [camera, setCamera] = useState(null)

    const handleCam = () => {
        setCamera(!camera);
    }

    //Menu
    const handleMenu = () => {
        console.log('Menu Aberto...');
        setVisibility(!visibility);
    }

    useEffect(() => {
        setVisibility(pressed);
    }, [pressed]);
    useEffect(() => {
        setVisMenu(pressed);
    }, [pressed]);
    useEffect(() => {
        setVisDia(pressed);
    }, [pressed]);
    useEffect(() => {
        setVisSem(pressed);
    }, [pressed]);
    useEffect(() => {
        setVisPass(pressed);
    }, [pressed]);
    useEffect(() => {
        setVisShop(pressed);
    }, [pressed]);
    // useEffect(() => {
    //     const subscription = new Accelerometer({
    //       updateInterval: 1000, // Intervalo de atualização em milissegundos
    //     }).subscribe(({ x, y, z }) => {
    //       // Lógica para estimar os passos com base nos dados do acelerômetro
    //       const accelerationMagnitude = Math.sqrt(x * x + y * y + z * z);
    //       if (accelerationMagnitude > 10) {
    //         // Valor de aceleração arbitrário para detectar um passo
    //         setStepCount((prevStepCount) => prevStepCount + 1);
    //       }
    //     });
    
    //     return () => {
    //       subscription.unsubscribe(); // Cancela a assinatura quando o componente é desmontado
    //     };
    //   }, []);

    //Direcional
    const handleDir = () => {
        console.log('Interagindo com o pet...');
    };

    //Status
    const handleStatus = () => {
        setVisibility(!visibility);
        setVisMenu(!visMenu);
        
    };

    //Missao Diaria
    const handleDia = () => {
        setVisibility(!visibility);
        setVisDia(!visDia);
        
    };

    //Missao semanal
    const handleSem = () => {
        setVisibility(!visibility);
        setVisSem(!visSem);
        
    };

    //Passos
    const handlePass = () => {
        setVisibility(!visibility);
        setVisPass(!visPass);
        
    };

    //Shop
    const handleShop = () => {
        setVisibility(!visibility);
        setVisShop(!visShop);
        
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
                            style={{ flex: 1, width: '100%', height: '100%' }}
                            type={Camera.Constants.Type.back}
                            ref={cameraRef}
                        />
                    ): (
                        
                        <ImageBackground source={images['fundo']} style={styles.fundoContainer}>
                        {visMenu &&  (
                            <View style={styles.statusContainer}>
                                    <TouchableOpacity onPress={handleStatus}>
                                        <Back style={styles.backButton}/>
                                    </TouchableOpacity>
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    <Text style={styles.statusTitle}>Status</Text>
                                    <View style={{ alignItems: 'center'}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Health style={styles.statusButtons}/>
                                            <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={0.5} />
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Energy style={styles.statusButtons}/>
                                            <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={0.5} />
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Happy style={styles.statusButtons}/>
                                            <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={0.5} />
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Strength style={styles.statusButtons}/>
                                            <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={0.5} />
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Resistance style={styles.statusButtons}/>
                                            <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={0.5} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                        {/*A partir daqui, criar cada uma das telas */}
                        {visDia &&  (
                            <View style={styles.statusContainer}>
                                {/*Implementar as missões*/}
                                    <TouchableOpacity onPress={handleDia}>
                                        <Back style={styles.backButton}/>
                                    </TouchableOpacity>
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    <Text style={styles.statusTitle}>Tarefas Diárias</Text>
                                </View>
                            </View>
                        )}
                        {visSem &&  (
                            <View style={styles.statusContainer}>
                                {/*Implementar as missões*/}
                                    <TouchableOpacity onPress={handleSem}>
                                        <Back style={styles.backButton}/>
                                    </TouchableOpacity>
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    <Text style={styles.statusTitle}>Tarefas Semanais</Text>
                                </View>
                            </View>
                        )}
                        {visPass &&  (
                            <View style={styles.statusContainer}>
                                    <TouchableOpacity onPress={handlePass}>
                                        <Back style={styles.backButton}/>
                                    </TouchableOpacity>
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    <Text style={styles.statusTitle}>Contagem de Passos</Text>
                                    <Image source={images['passos2']} style={styles.passosIcon}/>
                                    <Text style={styles.statusTitle}>Passos: {/*Vai ter que colocar aqui a contagem de passos*/}</Text>
                                </View>
                            </View>
                        )}
                        {visShop &&  (
                            <View style={styles.statusContainer}>
                                    <TouchableOpacity onPress={handleShop}>
                                        <Back style={styles.backButton}/>
                                    </TouchableOpacity>
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    <Text style={styles.statusTitle}>Desbloqueáveis</Text>
                                    <View style={{flex: 1, alignItems: 'left'}}>
                                        {/*Arrumar a posição*/}
                                        <Image source={images['asphalt']} style={styles.petIcons}/>
                                        <Image source={images['banabat']} style={styles.petIcons}/>
                                        <Image source={images['brekorb']} style={styles.petIcons}/>
                                        <Image source={images['bugwheel']} style={styles.petIcons}/>
                                        <Image source={images['carnivalt']} style={styles.petIcons}/>
                                        <Image source={images['charcopala']} style={styles.petIcons}/>
                                        <Image source={images['cromirin']} style={styles.petIcons}/>
                                        <Image source={images['feveroar']} style={styles.petIcons}/>
                                        <Image source={images['hydraqua']} style={styles.petIcons}/>
                                        <Image source={images['minde']} style={styles.petIcons}/>
                                        <Image source={images['toxtoad']} style={styles.petIcons}/>
                                        <Image source={images['wickiked']} style={styles.petIcons}/>
                                    </View>
                                </View>
                            </View>
                        )}
                        {visibility &&  (
                            <View style={styles.statusContainer}>
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    {/* <Menu style={styles.statusButtons}/> */}
                                    <Text style={styles.statusTitle}>Menu</Text>
                                    <View style={{ alignItems: 'left'}}>
                                        <TouchableOpacity onPress={handleStatus}>
                                            <View style={{flexDirection: 'row', alignItems: 'left'}}>
                                                <Status style={styles.statusButtons}/>
                                                <Text style={styles.modalText2}>Status do Pet</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleDia}>
                                            <View style={{flexDirection: 'row', alignItems: 'left'}}>
                                                <Tarefas style={styles.statusButtons}/>
                                                <Text style={styles.modalText2}>Tarefas Diárias</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleSem}>
                                            <View style={{flexDirection: 'row', alignItems: 'left'}}>
                                                <Tarefas style={styles.statusButtons}/>
                                                <Text style={styles.modalText2}>Tarefas Semanais</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handlePass}>
                                            <View style={{flexDirection: 'row', alignItems: 'left'}}>
                                                <Passos style={styles.statusButtons}/>
                                                <Text style={styles.modalText2}>Contador de Passos</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleShop}>
                                            <View style={{flexDirection: 'row', alignItems: 'left'}}>
                                                <Shop style={styles.statusButtons}/>
                                                <Text style={styles.modalText2}>Mais Pets</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                        <TouchableOpacity onPress={handleDir}>
                            <Image source={require('./assets/inicial-template.png')}style={styles.pika2}/>
                        </TouchableOpacity>
                    </ImageBackground>
                    )}
                    </View>  
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