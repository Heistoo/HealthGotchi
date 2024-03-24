import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  titleContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '20%',
    marginLeft: '-13%',
  },
  titleContainer2:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '20%',
  },
  container: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
    },
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
      alignItems: 'center',
    },
    containerLoginBox:{
      alignItems: 'center',
      backgroundColor: '#FFF',
      borderRadius: 30,
      borderWidth: 1, 
      borderColor: '#FFF', 
      marginTop: 130, 
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