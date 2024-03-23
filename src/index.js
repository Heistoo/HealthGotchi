import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
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
      top:'-26%',
    },
    pika:{
      position:'relative',
      top:'-17%',
      left:'10%',
      width:50
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      position:"relative",
      top:"-15%",
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
      fontSize:30,
      position:"relative",
      top:"-150%",
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