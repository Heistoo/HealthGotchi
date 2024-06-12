// Library Imports
import React, { useState, useRef, useEffect } from 'react';
import { Text, Button, View, Animated, TouchableOpacity, ImageBackground, Image, Platform, TouchableWithoutFeedback, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from 'react-native-progress/Bar';
import { Camera } from 'expo-camera/legacy';
import { Pedometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import Clock from './assets/menu/clock.svg'

const Jogo = () => {
    const { handleVision, takePhoto } = require('./services/visionapi.js');
    const navigation = useNavigation();
    const [escolha, setEscolha] = useState(0);
    const [food, setFood] = useState("");
    const [foodGroup, setFoodGroup] = useState("");
    const [visibility, setVisibility] = useState(false);
    const [visMenu, setVisMenu] = useState(false);
    const [visDia, setVisDia] = useState(false);
    const [visSem, setVisSem] = useState(false);
    const [visPass, setVisPass] = useState(false);
    const [visShop, setVisShop] = useState(false);
    const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
    const [pastStepCount, setPastStepCount] = useState(0);
    const [currentStepCount, setCurrentStepCount] = useState(0);
    const [status, setStatus] = useState(null);
    const [missoes, setMissoes] = useState([]);
    const [pontos, setPontos] = useState(0);
    const [criterioNumero, setCriterioNumero] = useState(0);
    const [criterioTipo, setCriterioTipo] = useState('');
    const [error, setError] = useState(null);
    //Camera
    const [camera, setCamera] = useState(null)

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

    const setAllStates = (value) => {
        setVisibility(value);
        setVisMenu(value);
        setVisDia(value);
        setVisSem(value);
        setVisPass(value);
        setVisShop(value);
        setCamera(value);
    }
    
    const closeMenuAndCamera = () => {
        setAllStates(false);
    };
    
    const handleCam = () => {
        setAllStates(false);
        setCamera(!camera);
        setPhotoUri(null); // Adicionado para redefinir o estado da foto
        saveBase64(null);  // Adicionado para redefinir o estado da base64
    }
    
    //Menu
    const handleMenu = () => {
        console.log('Menu Aberto...');
        setAllStates(false);
        setVisibility(!visibility);
    }

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

    const handleVisibility = (setter) => {
        setVisibility(!visibility);
        setter((currentValue) => !currentValue);
    };
    
    const handleStatus = () => {
        handleVisibility(setVisMenu);
        fetchStatus(); // Chama a função para buscar os status atualizados
    };
    const handleDia = async () => {
        handleVisibility(setVisDia);
        await fetchMissoes();
        await verificarMissao();
    }
    const handleSem = () => {
        handleVisibility(setVisSem);
    }
    const handlePass = () => handleVisibility(setVisPass);
    const handleShop = () => handleVisibility(setVisShop);

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

    //camera properties for passing values to visionapi
    const [hasPermission, setHasPermission] = useState(null);
    const [photoUri, setPhotoUri] = useState(null);
    const [base64, saveBase64] = useState(null);
    const cameraRef = useRef(null);

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

    //Usa pra mostrar o inicial na tela
    useEffect(() => {
        const fetchEscolhaPet = async () => {
          try {
            const escolha = await AsyncStorage.getItem('escolha');
            if (escolha) {
              setEscolha(escolha);
            }
          } catch (error) {
            console.error('Erro ao buscar o pet:', error);
            Alert.alert('Erro ao buscar o pet:', error.message);
          }
        };
        fetchEscolhaPet();
      }, []);

    const getUsuarioId = () => {
        return AsyncStorage.getItem('usuario_id');
    };

    const petImages = {
        1: require('./assets/pets/tinkazilla.png'),
        2: require('./assets/pets/rocked.png'),
        3: require('./assets/pets/heradummy.png'),
      };

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const fetchStatus = async () => {
        try {
            const usuarioId = await getUsuarioId();
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/select_status?usuarioId=${parseInt(usuarioId)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Dados recebidos:', data); // Log para depuração
                setStatus(data);
            } else {
                const errorData = await response.json();
                console.error('Erro na resposta do servidor:', errorData);
                Alert.alert('Erro', `Erro na resposta do servidor: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Erro na conexão:', error);
            Alert.alert('Erro', `Erro na conexão: ${error.message}`);
        }
    };
    const verificarMissao = async () => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/verificar_missao`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuarioId: await getUsuarioId()})
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                if (data.message) {
                    alert(data.message); // Exibir mensagem de sucesso
                } else {
                    alert(data.error || 'Erro desconhecido'); // Exibir mensagem de erro
                }
            } else {
                alert('Erro ao verificar missão'); // Exibir mensagem de erro de requisição
            }
        } catch (error) {
            alert('Erro ao verificar missão'); // Exibir mensagem de erro ao fazer a requisição
            console.error(error);
        }
    };

    const fetchMissoes = async () => {
        try {
            const usuarioId = await getUsuarioId();
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/missao_diaria?usuarioId=${usuarioId}`);
            const data = await response.json();
            
            if (response.ok) {
                console.log(data);
                setMissoes(data);
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError("Erro ao buscar missões");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.secondBackground}></View>
            <TouchableWithoutFeedback onPress={closeMenuAndCamera}>
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
                                    {status && (
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Health style={styles.statusButtons} />
                                                <ProgressBar width={100} height={20} animated={true} color={'orange'} progress={status.saudavel} borderColor={'transparent'} />
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Energy style={styles.statusButtons} />
                                                <ProgressBar width={100} height={20} animated={true} color={'orange'} progress={status.energia} borderColor={'transparent'} />
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Happy style={styles.statusButtons} />
                                                <ProgressBar width={100} height={20} animated={true} color={'orange'} progress={status.felicidade} borderColor={'transparent'} />
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Strength style={styles.statusButtons} />
                                                <ProgressBar width={100} height={20} animated={true} color={'orange'} progress={status.forca} borderColor={'transparent'} />
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Resistance style={styles.statusButtons} />
                                                <ProgressBar width={100} height={20} animated={true} color={'orange'} progress={status.resistencia} borderColor={'transparent'} />
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </View>
                        )}
                        {/*A partir daqui, criar cada uma das telas */}
                        {visDia && (
                            <View style={styles.statusContainer}>
                                {/* <TouchableOpacity onPress={handleDia}>
                                    <Back style={styles.backButton} />
                                </TouchableOpacity> */}
                                <View style={{ flex: 1, transform: [{ scale: 0.9 }] }}>
                                    <Text style={styles.statusTitle}>Tarefa Diária</Text>
                                    {error ? (
                                        <Text style={styles.errorText}>{error}</Text>
                                    ) : (
                                        missoes && (
                                            <View style={{ flexDirection: 'column', top: 10, width: "100%" }}>
                                                <View style={{flexDirection: 'row'}}>
                                                    <Clock style={styles.clockButton} />
                                                    <Text style={styles.mission}>Missao: {missoes['descricao']}</Text>
                                                </View>
                                                <Text style={styles.condition}>Progresso: {missoes['progresso']}</Text>
                                            </View>
                                        )
                                    )}
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
                                                {/* <Text>Nome do Pet: {escolha}</Text> */}
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                        <TouchableOpacity onPress={handleDir}>
                            {escolha !== 0 && (<Animated.Image source={petImages[escolha]}style={[styles.pika2,{transform: [{translateY: moveAnim,},],},]}/>)}
                        </TouchableOpacity>
                    </ImageBackground>
                    )}
                    </View>  
                    <View >
                         {/* OpenAi Checker */}
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: 35}}>
                                {camera && photoUri && <Image source={{ uri: photoUri }} />}
                                {camera && photoUri && (
                                    <Button
                                        title="Analyze"
                                        onPress={async () => {
                                            console.log(base64.slice(0, 100));
                                            await handleVision(base64, setFood, setFoodGroup, getUsuarioId);
                                        }}
                                    />
                                )}
                        </View>
                        <View style={styles.gameContainer}>
                            <TouchableOpacity onPress={() => takePhoto(cameraRef, setPhotoUri, saveBase64)}>
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
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default Jogo;