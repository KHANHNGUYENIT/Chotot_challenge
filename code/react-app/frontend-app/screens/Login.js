import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as color from '../constants/Colors';

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      passWord: ""
    }
  }

  eventLogin = () => {
    fetch('https://mywebsite.com/endpoint/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: this.state.userName,
        passWord: this.state.passWord,
      }),
    }).then((data)=>{
      this.props.navigation.navigate('Home');
    }).catch((error)=>{
      
    });
  }

  createAccount = ()=>{
    this.props.navigation.navigate('Register');
  }
  

  render() {
    return (
      <View style={styles.container}>
        <View>
          <FontAwesome icon="user" size={27}></FontAwesome>
          <TextInput style={styles.input} placeholder="Tên đăng nhập"
            onChangeText={val => {
              this.setState({ userName: val });
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
        <TouchableOpacity style={styles.button} onPress={this.eventLogin()}>
          <Text style={styles.textBtn}>Đăng nhập</Text>
        </TouchableOpacity>
        <View style={styles.container1}>
          <TouchableOpacity style={styles.pr20} onPress={()=>this.createAccount()}>
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
  title: 'Đăng nhập'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  textBtn: {
    color: "#fff",
    fontWeight: "bold"
  },
  container1:{
    flexDirection:"row",
    justifyContent: "space-between"
  },
  pr20:{
    paddingRight:100
  }

});