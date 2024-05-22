import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  
  // Background for Jogo gradient
  background:{
    left: 0,
    right: 0,
    top: -30,
    width: '98%',
    height: '105%',
    borderRadius: 20,
  },
  // Second backgrund for jogo.js
  secondBackground:{
    position: 'absolute',
    backgroundColor: '#883939', 
    top: -11  ,
    height: '115%',
    width: '100%',
    borderRadius: 40,
    zIndex: -1,
  },
  // Camera box
  cameraContainer:{
    // backgroundColor: '#FFFFFF',
    top: 40,
    width: '90%',
    height:'63%',
    alignSelf: 'center',
    borderRadius: 70,
    borderColor: 'transparent',
    borderWidth: 1,
    overflow: 'hidden',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
},
  fundoContainer: {
    resizeMode: 'contain',
    right: 10,
    height: '100%',
    width: '110%',
    justifyContent: 'center',
  },
  // Register Page
  titleContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '20%',
    marginLeft: '-13%',
  },
  // Login Page
  titleContainer2:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '20%',
  },
  // Register Page
  container: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
    },
    // Login Page
    container2: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#FFF7E8',
    },
    containerInicial: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#26295E',
    },
    // Container for status bar
    statusContainer: {
      alignSelf: 'center', 
      width: '100%', 
      height: '60%', 
      backgroundColor: '#26295E', 
      top: 0,
      opacity: 0.8,
      position: 'absolute',
    },
    statusTitle: {
      fontSize: 30,
      color: 'white',
      fontFamily: 'Roboto',
      textAlign: "center"
    },
    statusPassosTitle:{
      fontSize: 20,
      top: 5,
      color: 'white',
      fontFamily: 'Roboto',
      textAlign: "center",
      left: 7,
    },
    statusButtons: {
      height: 50, 
      width: 50,
    },
    // backButton: {
    //   height: '5%', 
    //   width: '5%',
    //   position: 'absolute',
    //   left: 40,
    //   bottom: -400,
    // },
    passosIcon: {
      height: '60%', 
      width: '60%',
    },
    petIcons: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: "left",
      paddingLeft: 50,
    },
    pets:{
      height: 80, 
      width: 80,
    },
    containerbg: {
      top: -30,
      height: '110%',
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
    },
    mainContainer: {
      flex:1,
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
    titulo: {
      color: 'black',
      fontFamily: 'Roboto',
      fontSize: 42,
      lineHeight: 84,
      textAlign: 'center',
      position:'relative',
      zIndex: 1,
    },
    titulo2: {
      color: 'black',
      fontFamily: 'Roboto',
      fontSize: 42,
      lineHeight: 84,
      textAlign: 'center',
      position:'absolute',
      zIndex: 1,
    },
    titulo3: {
      color: 'white',
      fontFamily: 'Roboto',
      fontSize: 42,
      lineHeight: 84,
      textAlign: 'center',
      position:'relative',
      top:'-50%',
      zIndex: 1,
    },
    // Pikachu Image for main register screen
    pika:{
      position:'relative',
      left:'55%',
      top:'-2%',
      width: 70,
      zIndex: 1,
    },
    tinka:{
      width: 70,
      height: 70,
      // alignSelf: 'flex-center',
      // position: 'absolute',
      right: 120,
      zIndex: 1,
    },
    pika2:{
      alignSelf: 'flex-end',
      bottom: -200,
      right: 30,
      height: 150,
      width: 150,
      opacity: 2,
      position: 'absolute'
    },
    containerLogin:{
      top:'10%',
      alignItems: 'center',
    },
    // Login Page
    containerLoginBox:{
      alignItems: 'center',
      paddingVertical: 30, 
      paddingBottom: 200,
      },
    input: {
      height: 30,
      width: 310,
      marginTop : -2,
      marginBottom: 20,
      borderBottomColor: '#111111',
      borderBottomWidth: 1,
      // position:"relative",
    },
    // Login page (roundedI and input2)
    input2: {
      height: 40,
      marginTop : 5,
      marginBottom: 20,
      width:'90%',
      backgroundColor: '#F2F2F2',
    },
    roundedInput: {
      borderRadius: 50,
      paddingHorizontal: 15,
    },
    buttoncontainer:{
      backgroundColor:"#7A5BF6",
      borderRadius:100,
      alignItems:"center",
      justifyContent: 'center',
      width:200,
      height:40,
      marginTop: 20,
    },
    containerIcon:{
      flexDirection: 'row',
      marginTop: 60,
    },
    text:{
      fontFamily:"Roboto",
      textAlign:"center",
      color:"#111111",
      fontSize: 20,
    },
    placeholder:{
      color:"#000000",
      opacity:0.4,
      top: 0,
      left: -103,

    },
    placeholder2:{
      color:"#000000",
      opacity:0.4,
      top: 0,
      left: -135,
    },
    checkbox:{
      margin: 8,
    },
    underline: {
      height: 1, 
      width: '50%', 
      backgroundColor: '#111111',
      alignSelf: 'center', 
    },
    imageLogo:{
      position:"relative",
      // left:"15%",
      // top:"70%",
      // width:"21%",
      // height:"10%",
    },
    imageLogo2:{
      position:"relative",
      marginLeft: 80,
      // left:"70%",
      // top:"70%",
      // width:"21%",
      // height:"10%",
    },
    // Container for menu/camera and dir buttons
    gameContainer: {
      top: 20,
      right: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      // zIndex: 1,
    },
    cameraButton:{
      top: 175,
      right: -110,
      margin: 0,
      position: 'absolute',
    }, 
    menuButton:{
      top: 40,
      right: 65,
      margin: 0,
      position: 'absolute',
    },
    dirButton:{
      left: 70,
    },
    stickerContainer: {
      display: 'flex',
      bottom: -30,
      left: 20,
    },
    sticker:{
      position:'relative',
    },
    logoButton:{
      left: 20,
      width: 80,
      height: 80,
    },
    decButton:{
      bottom: 70,
      right: -130,
    },
    decButton1:{
      bottom: 120,
      right: -175,
    },
    verticalLight:{
      backgroundColor: '#D9D9D9',
      position: 'absolute',
      left: 0,
      width: 6,
      top: '5%',
      height: '95%',
      borderRadius: 30,
      zIndex: 1,
    },
    horizontalLight: {
      backgroundColor: '#D9D9D9',
      position: 'absolute',
      left: 10,
      height: 6,
      top: 19,
      width: '95%',
      borderRadius: 30,
      zIndex: 1,
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#26295E', 
    },
    modalContent: {
      backgroundColor: '#26295E',
      padding: 20,
      borderRadius: 10,
      paddingTop: 100,
      paddingBottom: 100,
    },
    modalText: {
      color: 'white',
      fontSize: 18,
      marginBottom: 20,
    },
    modalText2: {
      color: 'white',
      fontSize: 30,
    },
    modalPassosText: {
      fontSize: 15,

    },
    petSelectionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: 20,
      top: "-85%",
    },
    petTouchable: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    petImage: {
      width: 110,
      height: 110,
      resizeMode: 'contain',
    },
    buttoncontainer2:{
      backgroundColor:'#31415F',
      borderRadius:10,
      alignItems:"center",
      justifyContent: 'center',
      width:200,
      height:40,
      marginTop: 20,
      left:"25%",
      top:"-20%",
    },
    button: {
      backgroundColor: '#31415F', // Cor padrão do botão
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      borderRadius:10,
    },
    buttonSelected: {
      backgroundColor: '#FF5733', // Cor quando um inicial é selecionado
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      borderRadius:10,
      width:200,
      height:40,
    },
    text: {
      color: '#fff',
    },
    mission:{
      color: "white",
      fontSize: 20,
      textAlign: "left",
      marginBottom: 40,
    },
    condition:{
      color: "white",
      fontSize: 20,
      textAlign: "right",
      alignItems: "right",
    },
    clockButton:{
      marginLeft: 30,
    },
  });

  export default styles;