import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Image,TouchableOpacity } from 'react-native';
import dataphone from '../DataTest/DataPhone';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const RenderList =  ({ item }) => {
  return (
    <View style={{flex:1, flexDirection:'column'}} >
       
        <View style={{flex:0.95, flexDirection: 'row' }}>
            <Image style={{flex: 0.3, width:100, height: 120, marginBottom:10, marginTop: 10}}
            source={{uri: item.imageUrl}}>
            </Image>
            <View style={{flex:0.77, flexDirection:'column'}}>
                  <Text style={{ fontSize: 20}}>{item.name}</Text>
                  <Text style={{flex:0.1, fontSize: 14, color: 'red'}}>
                    Gia: {item.prices} Vnd</Text>
                  <View style={{flexDirection: 'row'}}>
                          <Text style={{justifyContent:'flex-start'}} >|{item.address}</Text>
                          <TouchableOpacity style={{justifyContent:'flex-end'}} 
                          //onPress={changeColor}
                         >
                                <MaterialCommunityIcons  style={{justifyContent:'flex-end'}}
                                name="heart-outline" size={25} color={'gray'}>
                                </MaterialCommunityIcons>
                          </TouchableOpacity>
                  </View>
            </View>
        </View>
        <View style={{flex: 0.05, height:1, backgroundColor:'gray'}}>
        </View>
        
   </View>
  );
}


class EletricDevice extends React.Component {

  render() {
    return (
      // <View style={styles.container}>
      //   <Text style={styles.headerText}>Profile Activity</Text>
      //   <Button
      //     title="Go to Home"
      //     onPress={() => this.props.navigation.navigate("Home")}
      //   />

      //   <Text style={styles.headerText}>Create a New Profile Screen </Text>
      //   <Button
      //     title="Go to new Profile"
      //     onPress={() => this.props.navigation.push("Profile")}
      //   />

      //   <Text style={styles.headerText}> Go Back </Text>
      //   <Button
      //     title="Go Back"
      //     onPress={() => this.props.navigation.goBack()}
      //   />

      // </View>
        <View style={styles.container}>
          <FlatList style={{flex:0.9}}
                    data={dataphone}
                    renderItem={RenderList}
                    keyExtractor={item => item.name}>
          </FlatList>
      </View>
    );
  }
}
EletricDevice.navigationOptions = {
  title: "Đồ điện tử",
  headerStyle: {
    backgroundColor: "#ffba00"
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop:10,
  },

});
export default EletricDevice;