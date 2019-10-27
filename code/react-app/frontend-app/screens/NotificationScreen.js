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

export default class NotificationScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Thông báo</Text>
      </ScrollView>
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