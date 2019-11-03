import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class NotificationScreen extends React.Component {
  render() {
    return (
      <Text>Thông báo</Text>
    );
  }
}

NotificationScreen.navigationOptions = {
  title: 'Thông báo',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});