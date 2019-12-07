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


export default class PersonalScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  eventLogin = () => {
    this.props.navigation.navigate('Login');
  }
  eventSaved = ()  => {
    this.props.navigation.navigate('History');
  }
  render() {
    return (
      <LinearGradient style={styles.container} colors={['#ffba00','#ffffff']}>
        <View style={styles.container}>
          <View style={styles.container1}>
            <TouchableOpacity onPress={this.eventLogin}>
              <Text>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.eventSaved}>
              <Text>Sản phẩm đã thích</Text>
            </TouchableOpacity>
          </View>
          <View style = {{flex:7}}></View>
        </View>
      </LinearGradient>
    );
  }
}

PersonalScreen.navigationOptions = {
  title: 'Cá nhân',
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
  container1: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  }
});
