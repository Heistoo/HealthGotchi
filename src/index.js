import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  titleContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '20%',
    marginLeft: '-13%',
  },  
  container: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
    },
    mainContainer: {
      flex:1,
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
    },
    pika:{
      position:'relative',
      left:'52%',
      top:'-2%',
      width:50,
      zIndex: -1,
    },
    containerLogin:{
      top:'10%',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      // position:"relative",
    },
    buttoncontainer:{
      alignItems: 'center',
    },
    text:{
      backgroundColor:"#7A5BF6",
      fontFamily:"Roboto",
      borderRadius:50,
      textAlign:"center",
      color:"#111111",
      width:300,
      height:50,
      marginTop: 20,
      fontSize:30,
      position:"relative",
    },
    placeholder:{
      color:"#111111",
      left: 15,
      top: 7,

    },
    imageLogo:{
      position:"absolute",
      left:"15%",
      top:"70%",
      // width:"21%",
      // height:"10%",
    },
    imageLogo2:{
      position:"absolute",
      left:"70%",
      top:"70%",
      // width:"21%",
      // height:"10%",
    }
  });

  export default styles;