import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, ImageBackground, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("./assets/oip1.png")} resizeMode="cover" style={styles.image}>
        <Image source={require("./assets/pikachu.png")} style={styles.pika}/>
        <Text style={styles.titulo}>HealthGotchi</Text>
        <TextInput
        style={styles.input}
        placeholder="Nome do Usuário:"/>
      <TextInput
        style={styles.input}
        placeholder="Senha:"/>
        <TouchableOpacity onPress={() => console.log("Registrado")}>
        <Text style={styles.text}>Registrar</Text>
        </TouchableOpacity>
        <Image source={require("./assets/facebook2.png")} style={styles.imageLogo}/>
        <Image source={require("./assets/social2.png")} style={styles.imageLogo2}/>
      </ImageBackground>      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  titulo: {
    color: 'black',
    fontSize: 42,
    lineHeight: 84,
    textAlign: 'center',
    position:'absolute',
    top:'10%',
    left: '20%'
  },
  pika:{
    position:'absolute',
    top:'9%',
    left:'17%',
    width:50
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    position:"relative",
    top:"-10%",
  },
  text:{
    fontWeight:"bold",
    backgroundColor:"lightblue",
    borderRadius:50,
    textAlign:"center",
    width:300,
    height:80,
    fontSize:30,
    position:"relative",
    left:"14%",
  },
  imageLogo:{
    position:"relative",
    left:"15%",
    top:"5%",
    width:"21%",
    height:"10%",
  },
  imageLogo2:{
    position:"absolute",
    left:"65%",
    top:"62%",
    width:"21%",
    height:"10%",
  }
});