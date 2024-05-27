// Library Imports
import React, { useState, useRef, useEffect } from 'react';
import { Text, Button, View, Animated, TouchableOpacity, TextInput, ImageBackground, Image, Platform, ProgressBarAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from 'react-native-progress/Bar';
import { Camera } from 'expo-camera/legacy';
import { Pedometer } from 'expo-sensors';
import OpenAI from 'openai';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import Clock from './assets/menu/clock.svg'

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
    const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
    const [pastStepCount, setPastStepCount] = useState(0);
    const [currentStepCount, setCurrentStepCount] = useState(0);

    // Image Usage
    const images = {
        'fundo': require('./assets/jogo-background.png'),
        'menu': require('./assets/menu-button.png'),
        'camera': require('./assets/camera-button.png'),
        'logo': require('./assets/main-logo.png'),
        'direcional' : require('./assets/direcional.png'),
        'photo' : require('./assets/photo-button.png'),
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
        setVisibility(false);
        setVisMenu(false);
        setVisDia(false);
        setVisSem(false);
        setVisShop(false);
        setVisPass(false);
        setPhotoUri(null); // Adicionado para redefinir o estado da foto
        saveBase64(null);  // Adicionado para redefinir o estado da base64
    }

    //Menu
    const handleMenu = () => {
        console.log('Menu Aberto...');
        setVisibility(!visibility);
        setVisMenu(false);
        setVisDia(false);
        setVisSem(false);
        setVisShop(false);
        setVisPass(false);
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

    //Pedômetro
    useEffect(() => {
        // Verifica se o Pedometer está disponível
        Pedometer.isAvailableAsync().then(
            result => {
                setIsPedometerAvailable(String(result));
            },
            error => {
                setIsPedometerAvailable("Could not get isPedometerAvailable: " + error);
            }
        );

        // Inscreve-se para contar os passos atuais
        const subscription = Pedometer.watchStepCount(result => {
            setCurrentStepCount(result.steps);
        });

        // Obtém a contagem de passos das últimas 24 horas
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 1);

        Pedometer.getStepCountAsync(start, end).then(
            result => {
                setPastStepCount(result.steps);
            },
            error => {
                setPastStepCount("Could not get stepCount: " + error);
            }
        );

        // Limpeza na desmontagem do componente
        return () => subscription && subscription.remove();
    }, []);

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

    //Animação do inicial
    const moveAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(moveAnim, {
                    toValue: -10, // Move up by 10 units
                    duration: 1000, // Duration for moving up
                    useNativeDriver: true,
                }),
                Animated.timing(moveAnim, {
                    toValue: 10, // Move down by 10 units
                    duration: 1000, // Duration for moving down
                    useNativeDriver: true,
                }),
            ])
        );
        animation.start();
    }, [moveAnim]);
    
    // OpenAI ChatGPT handler
    const openai = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_API_KEY_OPENAI });

    const [hasPermission, setHasPermission] = useState(null);
    const [photoUri, setPhotoUri] = useState(null);
    const [base64, saveBase64] = useState(null);
    const cameraRef = useRef(null);

    const groups = ["Frutas", "Legumes e Verduras", "Carnes e Ovos", "Cereais, tuberculos, paes e raizes", "Leguminosas", "Leites e Derivados", "Doces, guloseimas e salgadinhos"]

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

    const getUsuarioId = () => {
        return AsyncStorage.getItem('usuario_id');
    };

    const handleVision = async () => {
        const response = await openai.chat.completions.create({
            model: 'gpt-4-turbo',
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: "What food is in the image? Respond in this format {\"food\": \"food_name\", \"group\": \"food_group\"}, if don't have any food, write the value as null, if the food is a fast-food type classify it as Guloseima, knowing that the groups are: {" + groups.join(", ") + "}." },
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
            
            //Faz requisição para o backend, passando o id do usuário e o grupo de alimento e muda os status do pet
            try {
                
                const usuarioId = await getUsuarioId();
    
                const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/edit_status_and_assign_points`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ usuarioId: parseInt(usuarioId), grupo: group})
                });
                
                //Apenas para testes
                // if (res.ok) {
                //     const data = await res.json();
                //     alert(data.message);
                // } else {
                //     const errorData = await res.json();
                //     alert(`Erro: ${errorData.error}`);
                // }
            } catch (error) {
                alert(`Erro na requisição: ${error.message}`);
            }
        }
    
        return parsedResponse;
    };
    

    const takePhoto = async () => {
        console.log("Foto tirada...");
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
                                    {/* <TouchableOpacity onPress={handleStatus}>
                                        <Back style={styles.backButton}/>
                                    </TouchableOpacity> */}
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    <Text style={styles.statusTitle}>Status</Text>
                                    <View style={{ alignItems: 'center'}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Health style={styles.statusButtons}/>
                                            <ProgressBar width={100} height={20} animated={true} color={'orange'} progress={0.9} borderColor={'transparent'}/>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Energy style={styles.statusButtons}/>
                                            <ProgressBar width={100} height={20} animated={true} color={'orange'} progress={0.9} borderColor={'transparent'}/>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Happy style={styles.statusButtons}/>
                                            <ProgressBar width={100} height={20} animated={true} color={'orange'} progress={0.9} borderColor={'transparent'}/>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Strength style={styles.statusButtons}/>
                                            <ProgressBar width={100} height={20} animated={true} color={'orange'} progress={0.9} borderColor={'transparent'}/>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Resistance style={styles.statusButtons}/>
                                            <ProgressBar width={100} height={20} animated={true} color={'orange'} progress={0.9} borderColor={'transparent'}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                        {/*A partir daqui, criar cada uma das telas */}
                        {visDia &&  (
                            <View style={styles.statusContainer}>
                                {/*Implementar as missões*/}
                                    {/* <TouchableOpacity onPress={handleDia}>
                                        <Back style={styles.backButton}/>
                                    </TouchableOpacity> */}
                                <View style={{flex: 1, transform: [{scale: 0.9}]}}>
                                    <Text style={styles.statusTitle}>Tarefas Diárias</Text>
                                    <View style={{flexDirection: 'row', top: 10}}>
                                        <Clock style={styles.clockButton}/>
                                        {/* Atenção, essas duas linhas (e todos os outros desafios) tem que ser substituidos por desafios do banco de dados, no caso
                                        é separado em texto, ou seja, a descrição da missão, e a condição, que vai ser o x/x, por exemplo: "alimente o bichinho
                                        3 vezes", "2/3". Tecnicamente falando, as tarefas semanais são as exatas mesmas das diárias, só que mais longas */}
                                        <Text style={styles.mission}>Missão 1 </Text>
                                        <Text style={styles.condition}>Condição</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Clock style={styles.clockButton}/>
                                        <Text style={styles.mission}>Missão 2 </Text>
                                        <Text style={styles.condition}>Condição</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Clock style={styles.clockButton}/>
                                        <Text style={styles.mission}>Missão 3 </Text>
                                        <Text style={styles.condition}>Condição</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Clock style={styles.clockButton}/>
                                        <Text style={styles.mission}>Missão 4 </Text>
                                        <Text style={styles.condition}>Condição</Text>
                                        
                                    </View>
                                </View>
                            </View>
                        )}
                        {visSem &&  (
                            <View style={styles.statusContainer}>
                                {/*Implementar as missões*/}
                                    {/* <TouchableOpacity onPress={handleSem}>
                                        <Back style={styles.backButton}/>
                                    </TouchableOpacity> */}
                                <View style={{flex: 1, transform: [{scale: 0.9}]}}>
                                    <Text style={styles.statusTitle}>Tarefas Semanais</Text>
                                    <View style={{flexDirection: 'row', top: 10}}>
                                        <Clock style={styles.clockButton}/>
                                        {/* Atenção, essas duas linhas (e todos os outros desafios) tem que ser substituidos por desafios do banco de dados, no caso
                                        é separado em texto, ou seja, a descrição da missão, e a condição, que vai ser o x/x, por exemplo: "alimente o bichinho
                                        3 vezes", "2/3". Tecnicamente falando, as tarefas semanais são as exatas mesmas das diárias, só que mais longas */}
                                        <Text style={styles.mission}>Missão 1 </Text>
                                        <Text style={styles.condition}>Condição</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Clock style={styles.clockButton}/>
                                        <Text style={styles.mission}>Missão 2 </Text>
                                        <Text style={styles.condition}>Condição</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Clock style={styles.clockButton}/>
                                        <Text style={styles.mission}>Missão 3 </Text>
                                        <Text style={styles.condition}>Condição</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Clock style={styles.clockButton}/>
                                        <Text style={styles.mission}>Missão 4 </Text>
                                        <Text style={styles.condition}>Condição</Text>                                        
                                    </View>
                                </View>
                            </View>
                        )}
                        {visPass &&  (
                            <View style={styles.statusContainer}>
                                    {/* <TouchableOpacity onPress={handlePass}>
                                        <Back style={styles.backButton}/>
                                    </TouchableOpacity> */}
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    <Text style={styles.statusPassosTitle}>Contagem de Passos</Text>
                                    <Image source={images['passos2']} style={styles.passosIcon}/>
                                    <Text style={styles.statusTitle}>Passos: {currentStepCount}</Text>
                                </View>
                            </View>
                        )}
                        {visShop &&  (
                            <View style={styles.statusContainer}>
                                    {/* <TouchableOpacity onPress={handleShop}>
                                        {/* <Back style={styles.backButton}/> */}
                                    {/* </TouchableOpacity> */}
                                <View style={{flex: 1, left: 10}}>
                                    <Text style={styles.statusTitle}>Desbloqueáveis</Text>
                                    <View style={styles.petIcons}>
                                        {/*Observação: vai ser necessário criar um método de desbloquear eles e implementar no jogo*/}
                                        <TouchableOpacity>                                            
                                            <Image source={images['asphalt']} style={styles.pets}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity>                                            
                                            <Image source={images['bugwheel']} style={styles.pets}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity>                                            
                                            <Image source={images['wickiked']} style={styles.pets}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity>                                            
                                            <Image source={images['cromirin']} style={styles.pets}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.petIcons}>
                                        <TouchableOpacity>
                                            <Image source={images['carnivalt']} style={styles.pets}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity>                                            
                                            <Image source={images['banabat']} style={styles.pets}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity>                                            
                                            <Image source={images['hydraqua']} style={styles.pets}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity>                                            
                                            <Image source={images['charcopala']} style={styles.pets}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.petIcons}>
                                        <TouchableOpacity>
                                            <Image source={images['brekorb']} style={styles.pets}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity>                                            
                                            <Image source={images['feveroar']} style={styles.pets}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity>                                            
                                            <Image source={images['toxtoad']} style={styles.pets}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity>                                            
                                            <Image source={images['minde']} style={styles.pets}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                        {visibility &&  (
                            <View style={styles.statusContainer}>
                                <View style={{flex: 1, alignItems: 'center', transform: [{scale: 0.9}]}}>
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
                            <Animated.Image source={require('./assets/inicial-template.png')}style={[styles.pika2,{transform: [{translateY: moveAnim,},],},]}/>
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
                                <Image source={images['photo']} style={styles.photoButton}/>
                            </TouchableOpacity>
                            <View >
                                <View style={styles.petSelectionContainer}>
                                <TouchableOpacity onPress={handleCam}>
                                    <Image source={images['camera']} style={styles.cameraButton}/>
                                </TouchableOpacity>
                                </View>
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