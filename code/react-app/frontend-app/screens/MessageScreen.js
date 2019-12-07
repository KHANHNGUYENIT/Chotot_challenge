import React from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import { LinearGradient } from 'expo-linear-gradient';
export default class MessageScreen extends React.Component {
  render() {
    return (
      <LinearGradient style={styles.container} colors={['#ffba00','#ffffff']}>

      </LinearGradient>
    );
  }
}

MessageScreen.navigationOptions = {
  title: 'Tin nhắn',
  headerStyle: {
    backgroundColor: "#ffba00",
  },
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: '#fff',
    },
  });
