import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as color from '../constants/Colors';
import requestApi from '../utilities/request';
import * as AUTHENTICATION_API from '../apis/authentication';
import { cloneDeep,pick } from 'lodash';
import * as authenticationActionCreators from '../actions/authentication';
class RegisterScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      phone: "",
      passWord: "",
      confirmPass:""
    }
  }

  eventSignUp =()=>{
    this.props.dispatchAuthentication.loading();
    let api = cloneDeep(AUTHENTICATION_API.register);
    api.request.body = JSON.stringify({
      phone: this.state.phone,
      password: this.state.passWord,
      role: "buyer"
    });
    requestApi(api).then((data)=>{
      this.props.dispatchAuthentication.unload();
      this.props.navigation.navigate('Login');
    }).catch((error)=>{
      this.props.dispatchAuthentication.unload();
      alert('sdt da ton tai',error);
      console.log('error',error)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>ĐĂNG KÝ</Text>
        </View>
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
  title: '',
  headerStyle: {
    backgroundColor: "#ffba00",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical:30
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
const mapStateToProps = (state) => {
  return { state: pick(state, ['authentication']) }
}

const mapDispatchToProps = (dispatch) => {
  return { 
    dispatchAuthentication: bindActionCreators(authenticationActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);