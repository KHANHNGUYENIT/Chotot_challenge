import React from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';

export default class MessageScreen extends React.Component {
  render() {
    return (
      <Text>Thông báo</Text>
    );
  }
}

MessageScreen.navigationOptions = {
  title: 'Tin nhắn',
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: '#fff',
    },
  });
