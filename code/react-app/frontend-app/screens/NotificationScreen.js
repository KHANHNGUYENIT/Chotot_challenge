import React from 'react';
import {
  Dimensions,
  Text,
  View,
} from 'react-native';
import { AntDesign, } from '@expo/vector-icons';
import { styles } from '../styles/styles';
const { heigh, width } = Dimensions.get('window');
export default class NotificationScreen extends React.Component {
  render() {
    return (
      <View style={styles.containerNoti}>
        <Text style={styles.styleText}>Bạn chưa có thông báo!</Text>
        <AntDesign style={styles.styleIcon} name="notification" size={width-40} color={'#ffba00'}>
        </AntDesign>
      </View>
    );
  }
}
NotificationScreen.navigationOptions = {
  title: 'Thông báo',
  headerStyle: {
    backgroundColor: "#ffba00",
  },
};

