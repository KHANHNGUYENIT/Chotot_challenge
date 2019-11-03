import React from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';

export default class PersonalScreen extends React.Component {
  render() {
    return (
      <Text>Thông báo</Text>
    );
  }
}

PersonalScreen.navigationOptions = {
  title: 'Cá nhân',
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: '#fff',
    },
  });
