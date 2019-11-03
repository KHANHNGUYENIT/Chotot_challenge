import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    contain_search: {
      flex: 1,
      width: "100%",
      backgroundColor: "#ffba00",
      flexDirection: "row",
      paddingVertical:10
    },
    input_search: {
      borderRadius: 15,
      height: 30,
      width: "80%",
      borderWidth: 1,
      borderColor: "white",
      marginVertical: 25,
      paddingHorizontal: 10,
      backgroundColor: "white"
    },
    logo:{
      color:"white",
      fontWeight:"bold",
      width:"10%",
      paddingTop:20,
      paddingHorizontal:5
    },
    icon:{
      marginTop:25,
      marginLeft:8
    },
    containBtn:{
      flexDirection:"row",
      justifyContent:"center",
    },  
    button:{
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
      borderColor:"#fff",
      borderRadius:15,
      borderStyle:"solid",
      backgroundColor:"#FFE399",
      width:105,
      height:35,
      marginHorizontal:8,
      marginTop:10
    },
    activeBtn:{
      backgroundColor:"#ffa100"
    },
    textBtn:{
      paddingHorizontal:10
    },
    image:{
      width:120,
      height:140
    },
    containItem:{
      justifyContent:"center",
      alignItems:"center",
      width:150,
      marginHorizontal:10,
      marginBottom:15
    },
    headerGroup:{
      flexDirection:"row",
      justifyContent:"space-between",
      paddingHorizontal:10
    },
    header:{
      color:"blue",
      fontWeight:"bold",
    },
    link:{
      color:"#ffa100"
    },
    itemName:{
      paddingVertical:5,
      textAlign:"center"
    },
    itemPrice:{
      color:"red"
    }
  });

  export {styles}