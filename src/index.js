import { StyleSheet } from "react-native";

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
      position:'relative',
      top:'-24%',
    },
    pika:{
      position:'relative',
      top:'-16%',
      left:'17%',
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
    text:{
      fontWeight:"bold",
      backgroundColor:"lightblue",
      borderRadius:50,
      textAlign:"center",
      width:300,
      height:50,
      fontSize:30,
      position:"relative",
      left:"14%",
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