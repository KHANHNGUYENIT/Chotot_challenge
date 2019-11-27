import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as color from '../constants/Colors';

export default class RegisterScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      phone: "",
      passWord: "",
      confirmPass:""
    }
  }

  eventSignUp =()=>{
    console.log('aaa');
    console.log(this.state.phone)
    fetch('http://192.168.1.147:8080/api/v1/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: this.state.phone,
        password: this.state.passWord,
        role: "buyer"
      }),
    }).then((data)=>{
      this.props.navigation.navigate('Login');
    }).catch((error)=>{
      throw new Error(error)
      alert('sdt da ton tai',error);
      console.log('error',error)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <FontAwesome icon="user" size={27}></FontAwesome>
          <TextInput style={styles.input} placeholder="Phone"
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
        <View>
          <FontAwesome icon="lock" size={27}></FontAwesome>
          <TextInput style={styles.input} secureTextEntry={true} placeholder="Nhập lại mật khẩu"
            onChangeText={val => {
              this.setState({ passWord: val });
            }}>
          </TextInput>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.eventSignUp}>
          <Text style={styles.textBtn}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    );
  }

};

RegisterScreen.navigationOptions = {
  title: 'Đăng ký'
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
    marginBottom: 15,
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
  }
});