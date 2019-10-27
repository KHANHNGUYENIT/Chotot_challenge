import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';

import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';

import { MonoText } from '../components/StyledText';

const Search = props => {
  return (
    <View style={styles.contain_search}>
      <Text style={styles.logo}>Chợ Tốt</Text>
      <TextInput style={styles.input_search} placeholder="Search..." />
      <TouchableOpacity style={styles.icon}>
        <FontAwesome name="shopping-bag" size={27} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Search></Search>
      <View style={{ flex: 9 }}>
        <Text>HomeScreen</Text>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contain_search: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffba00",
    flexDirection: "row",
  },
  input_search: {
    borderRadius: 15,
    height: 30,
    width: "80%",
    borderWidth: 1,
    borderColor: "white",
    marginVertical: 25,
    // marginHorizontal: 10,
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
  }
});
