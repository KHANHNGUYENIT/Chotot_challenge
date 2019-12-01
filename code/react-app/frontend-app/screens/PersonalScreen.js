import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AsyncStorage } from 'react-native';
import requestApi from '../utilities/request';
import * as AUTHENTICATION_API from '../apis/authentication';
import * as asyncStorage from '../constants/localStorage';
import { cloneDeep } from 'lodash';

export default class PersonalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLogin: false
    }
  }

  componentDidMount() {
    this.getUser();
  }

  eventLogin = () => {
    this.props.navigation.navigate('Login');
  }
  eventSaved = () => {
    this.props.navigation.navigate('History');
  }

  eventLogout = () => {
    let api = cloneDeep(AUTHENTICATION_API.logout);
    requestApi(api).then(async (data) => {
      let jsonData = await data.json();
      if (jsonData) {
        this.removeItemValue(asyncStorage.TOKEN);
        this.removeItemValue("USER");
        this.setState({ user: {}, isLogin: false });
      }
    })
  }

  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }
    catch (exception) {
      return false;
    }
  }

  getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('USER');
      const userObj = JSON.parse(user);
      this.setState({
        user: userObj,
        isLogin: true
      });
      console.log('user', user);
    } catch (error) {
      console.log(error.message);
    }
  }

  getStyle = (isLogin) => {
    return {
      display: (isLogin ? 'none' : 'flex'), width: 100,
      height: 35,
      backgroundColor: "#ffa100",
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 10
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container1}>
          <View style={{ flex: 3 }}>
            <Image
              style={{ width: 100, height: 100 }}
              source={require('../assets/images/user.png')}
            />
            <Text>{this.state.user ? this.state.user.phone : ""}</Text>
            <TouchableOpacity onPress={this.eventLogin} style={this.getStyle(this.state.isLogin)}>
              <Text style={styles.text}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.eventLogout} style={this.getStyle(!this.state.isLogin)}>
              <Text>Đăng xuất</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.eventSaved}>
              <Text>Sản phẩm đã thích</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 7 }}></View>
      </View>
    );
  }
}

PersonalScreen.navigationOptions = {
  title: 'Cá nhân',
  headerStyle: {
    backgroundColor: "#ffba00",
  },
  tabBarOnPress: ({ navigation, defaultHandler }) => {
    console.log('aaaa');
    defaultHandler();
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
  },
  btn: {
    width: 100,
    height: 35,
    backgroundColor: "blue",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#ffffff"
  }
});
