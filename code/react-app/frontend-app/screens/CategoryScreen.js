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
  Dimensions,
  TextInput,
  View,} from 'react-native';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import listDataItemCategory from '../DataTest/DataItemCategory';
import { Search } from '../components/Search';

const { heigh, width } = Dimensions.get('window');
class CategoryScreen extends React.Component  {
  constructor(props) {
    super(props);
  }

  showAlert = () => {
    Alert("Feature will update soon!")
  }
  onPress = (id) => {
    this.props.navigation.navigate('Profile',{data: id});
  } 
  render() {
    return (
              <View style={styles.container}>
                <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#ffffff" translucent = {true}/>
                <Search></Search>
                <ScrollView style ={{ flex: 0.9,}}>
                  <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                    <View style={styles.viewtouch}>
                    {listDataItemCategory.slice(1,6).map(item =>{return(
                            <TouchableOpacity style = {styles.touchview} onPress={() => this.onPress(item.id)}  key={item.id}>
                              <Image style = {styles.viewImage} source = {{uri: item.imageUrl}} key={item.id} ></Image>
                              <Text style = {styles.viewtext} numberOfLines={2} ellipsizeMode={"tail"}> {item.name}</Text>
                            </TouchableOpacity> 
                    );
                        })}
                    </View>
                    <View style={styles.viewtouch}>
                      {listDataItemCategory.slice(6,11).map(item =>{return(
                              <TouchableOpacity style = {styles.touchview} onPress={() => this.onPress(item.id)} key={item.id}>
                                  <Image style = {styles.viewImage} source = {{uri: item.imageUrl}}key={item.id} ></Image>
                                  <Text style = {styles.viewtext} numberOfLines={2} ellipsizeMode={"tail"}> {item.name}</Text>
                              </TouchableOpacity> );
                          })}
                    </View>
                    <View style={styles.viewtouch}>
                      {listDataItemCategory.slice(11,16).map(item =>{return(
                              <TouchableOpacity style = {styles.touchview} onPress={() => this.onPress(item.id)} key={item.id}>
                                  <Image style = {styles.viewImage} source = {{uri: item.imageUrl}}key={item.id} ></Image>
                                  <Text style = {styles.viewtext} numberOfLines={2} ellipsizeMode={"tail"}> {item.name}</Text>
                              </TouchableOpacity> );
                          })}
                    </View>
                  </View>
                  </ScrollView>
                </View>
          );
        }
}

CategoryScreen.navigationOptions = {
  header : null,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    
  },
  touchview:{
    flex:1,
    width:width/3.5, height: 140,
    marginTop:5,
    marginBottom: 5,
    borderRadius:10,
    flexDirection:'column', 
  },
  viewtouch:{
    flex: 0.3,
  },
  viewtext:{
    flex: 0.27,
    fontSize:13,
    fontWeight: "bold",
    fontStyle:'normal',
    flexDirection:'row',
     textAlign: "center",
    color: "#645DAC",
    width: 110, height:40,
  },
  viewImage:{
    borderRadius:18,
    flex: 0.73, width: width/3.5, height: 100 ,
  }

});
export default CategoryScreen;


