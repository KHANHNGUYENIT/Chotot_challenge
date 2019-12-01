import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { } from '../constants/Colors';
import { cloneDeep } from 'lodash';
import requestApi from '../utilities/request';
import * as AUTHENTICATION_API from '../apis/authentication';
import * as asyncStorage from '../constants/localStorage';

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      phone: "",
      passWord: ""
    }
  }

  eventLogin = () => {
    let api = cloneDeep(AUTHENTICATION_API.login);

    api.request.body = JSON.stringify({
      phone: this.state.phone,
      password: this.state.passWord,
    });
    console.log(api);
    requestApi(api)
      .then(async (data) => {
        var res = await data.json();

        console.log(res);

        this.storeUserInfo('USER',res.user);
        this.storeToken(asyncStorage.TOKEN,res.token);

        this.props.navigation.navigate('Home');
      }).catch((error) => {
        alert('Ban da nhap sai sdt hoac mat khau');
      });
  }

  storeToken = async(key,token)=>{
    try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value
      let jsonOfItem = await AsyncStorage.setItem(key, token);
      return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }
  storeUserInfo = async (key,user) => {
    try {
      let t = await AsyncStorage.setItem(key, JSON.stringify(user));
      return t;
    } catch (error) {
      console.log(error.message);
    }
  }

  createAccount = () => {
    this.props.navigation.navigate('Register');
  }


  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Đăng nhập</Text>
        </View>
        <View>
          <FontAwesome icon="user" size={27}></FontAwesome>
          <TextInput style={styles.input} placeholder="Tên đăng nhập"
            onChangeText={val => {
              this.setState({ phone: val });
            }}>
          </TextInput>
        </View>
        <View>
          <FontAwesome icon="lock" size={27}></FontAwesome>
          <TextInput style={styles.input} secureTextEntry={true} placeholder="Mật khẩu"
            onChangeText={val => {
              this.setState({ passWord: val });
            }}>
          </TextInput>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.eventLogin}>
          <Text style={styles.textBtn}>Đăng nhập</Text>
        </TouchableOpacity>
        <View style={styles.container1}>
          <TouchableOpacity style={styles.pr20} onPress={() => this.createAccount()}>
            <Text>Tạo tài khoản</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

};

LoginScreen.navigationOptions = {
  title: ''
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: "bold"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ffa100",
    borderRadius: 10,
    width: 300,
    height: 45,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#ffa100",
    borderRadius: 10,
    width: 300,
    height: 45,
    marginVertical: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  textBtn: {
    color: "#fff",
    fontWeight: "bold"
  },
  container1: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10
  },
  pr20: {
    paddingRight: 100
  }

});