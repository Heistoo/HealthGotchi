import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Background for Jogo gradient
  background:{
    left: 0,
    right: 0,
    top: 0,
    height: '110%',
  },
  cameraContainer:{
    // backgroundColor: '#FFFFFF',
    top: 40,
    width: '88%',
    height:'70%',
    alignSelf: 'center',
    borderRadius: 50,
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
    width: '100%',
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
      backgroundColor: '#50FC95',
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
    // Pikachu Image for main register screen
    pika:{
      position:'relative',
      left:'50%',
      top:'-2%',
      width: 60,
      zIndex: 1,
    },
    pika2:{
      alignSelf: 'center',
      bottom: -100,
      left: 70,
      height: 400,
      width: 200,
      opacity: 2,
    },
    containerLogin:{
      top:'10%',
      alignItems: 'center',
    },
    // Login Page
    containerLoginBox:{
      alignItems: 'center',
      backgroundColor: '#FFF',
      borderRadius: 30,
      borderWidth: 1, 
      borderColor: '#FFF', 
      marginTop: 80, 
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
      height: 1, // This will be the "thickness" of your underline
      width: '50%', // Adjust this as needed
      backgroundColor: '#111111', // This will be the color of your underline
      alignSelf: 'center', // This will center the underline
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
    }
  });

  export default styles;