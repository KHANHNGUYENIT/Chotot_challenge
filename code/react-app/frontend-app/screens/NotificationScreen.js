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

export default class NotificationScreen extends React.Component {
  render() {
    return (
      <LinearGradient style={styles.container} colors={['#ffba00','#ffffff']}>

      </LinearGradient>
    );
  }
}

NotificationScreen.navigationOptions = {
  title: 'Thông báo',
  headerStyle: {
    backgroundColor: "#ffba00",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // paddingTop: 15,
    //backgroundColor: '#fff',
  },
});