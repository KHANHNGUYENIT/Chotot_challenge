import React from 'react';
import {
    Text,
    Dimensions,
    View,
  } from 'react-native';
  import { LinearGradient } from 'expo-linear-gradient';
  import { 
    MaterialIcons, } from '@expo/vector-icons';
    import { styles } from '../styles/styles';
  const { heigh, width } = Dimensions.get('window');

export default class MessageScreen extends React.Component {
  render() {
    return (
      // <LinearGradient style={styles.container} colors={['#ffba00','#ffffff']}>
      // </LinearGradient>
      <View style={styles.containerNoti}>
        <Text style={styles.styleText}>Bạn chưa có tin nhắn!</Text>
        <MaterialIcons style={styles.styleIcon} name="filter-frames" size={width-40} color={'#ffba00'}>
        </MaterialIcons>
      </View>
    );
  }
}
MessageScreen.navigationOptions = {
  title: 'Tin nhắn', 
  headerStyle: {
    backgroundColor: "#ffba00",
  },
};


