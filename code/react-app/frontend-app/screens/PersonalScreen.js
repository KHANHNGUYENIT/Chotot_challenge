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

export default class PersonalScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Thông báo</Text>
      </ScrollView>
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
