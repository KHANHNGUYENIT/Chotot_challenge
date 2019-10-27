import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';

export default class MessageScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Thông báo</Text>
      </ScrollView>
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
