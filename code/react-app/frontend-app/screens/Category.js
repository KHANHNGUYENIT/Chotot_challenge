import React, {Component} from 'react';
import {   StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  TouchableHighlight,
  ScrollView,
  Alert,
  TextInput,
  View,} from 'react-native';
//import listDataItemCategory  from '../DataTest/DataItemCategory';

import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import listDataItemCategory from '../DataTest/DataItemCategory';

const Search = props => {
  return (
    <View style={styles.contain_search}>
      <TouchableOpacity style={{  marginLeft: 5, marginRight: 5, marginTop: 5, alignItems:'center', justifyContent:'center'}}>
        <Ionicons name="md-arrow-round-back" size={27} color="#fff" />
      </TouchableOpacity>
      <TextInput style={styles.input_search} placeholder="Search..." />
      <TouchableOpacity style={styles.icon}>
        <FontAwesome name="shopping-bag" size={27} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}


const centerData = Math.floor(listDataItemCategory.length /2);
// const showAlert = () =>{
//   // 
//   this.props.navigation.navigate('Profile')
// }
class Category extends React.Component  {
  render() {
    return (
      // <View style={styles.container}>
      //   <Text style={styles.headerText} >Home Activity</Text>
      //   <Button
      //     title="Go to Profile Activity"
      //     onPress={() => this.props.navigation.navigate('Profile')}
      //   />
      // </View>
              <View style={styles.container}>
                <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#ffffff" translucent = {true}/>
                <Search></Search>
              <View style={{flex: 9}}>
                  <ScrollView contentContainerStyle ={{  flexDirection:'row', justifyContent:'space-between' }}>
                    <View style={styles.viewtouch}>
                    {listDataItemCategory.slice(0, centerData).map(item =>{return(
                            <TouchableOpacity style = {styles.touchview} onPress = {() => this.props.navigation.navigate('Profile')} key={item.id}>
                              <Image style = {styles.viewImage} source = {{uri: item.imageUrl}} key={item.id}></Image>
                              <Text style = {styles.viewtext}> {item.name}</Text>
                            </TouchableOpacity> 
                    );
                        })}
                    </View>
                    <View style={styles.viewtouch}>
                      {listDataItemCategory.slice(centerData).map(item =>{return(
                              <TouchableOpacity style = {styles.touchview} onPress = {() => this.props.navigation.navigate('Profile')} key={item.id}>
                                  <Image style = {styles.viewImage} source = {{uri: item.imageUrl}}key={item.id}></Image>
                                  <Text style = {styles.viewtext}> {item.name}</Text>
                              </TouchableOpacity> );
                          })}
                    </View>
                  </ScrollView>
                </View>
              </View>
          );
        }
}


    
Category.navigationOptions = {
  // title: 'Danh muc',
  header : null,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  contain_search: {
    paddingTop: 8,
    flex: 1,
    width: "100%",
    backgroundColor: "#ffba00",
    flexDirection: "row",
    justifyContent:'center',
   // alignItems: 'center',
  },
  input_search: {
    paddingTop: 8,
    borderRadius: 15,
    height: 30,
    width: "80%",
    borderWidth: 1,
    borderColor: "white",
    marginVertical: 25,
    // marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    justifyContent:'center',
    //alignItems: 'center',
  },
  logo:{
    color:"white",
    fontWeight:"bold",
    width:"10%",
    paddingTop:20,
    paddingHorizontal:5
  },
  icon:{
   // marginTop:25,
   paddingTop: 8,
    marginLeft:8,
    justifyContent:'center',
   // alignItems: 'center'
  },
  touchview:{
    flex:1,
    width:160, height: 170,
    marginTop:5,
    marginBottom: 5,
    borderRadius:10,

    // Hieu ung do bong cho view
      elevation: 5, // Android
      shadowColor: '#CFD8DC', // iOS
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      backgroundColor: '#fff'
    
  },
  viewtouch:{
      justifyContent:'space-between',
      marginLeft: 10,
      marginRight: 10,
      borderRadius:10,
  },
  viewtext:{
    fontStyle:'normal',
    color: "#645DAC",
    flex: 0.2 ,width: 160,height:40,
    justifyContent:'center',
    alignItems:'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius:10,
  },
  viewImage:{
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10,
    flex: 0.8, width: 160, height: 130 ,
  }

});

export default Category;
