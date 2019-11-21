import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as color from '../constants/Colors';

export default class AdDetailScreen extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <View style={styles.container}>
        
      </View>
    );
  }

};

AdDetailScreen.navigationOptions = {
  title: 'Chi tiết'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});