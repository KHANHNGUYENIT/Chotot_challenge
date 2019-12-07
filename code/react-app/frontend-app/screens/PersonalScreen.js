import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
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
import { cloneDeep, pick } from 'lodash';
import * as authenticationActionCreators from '../actions/authentication';


class PersonalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      // isLogin: false
    }
  }

  componentDidMount() {
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
        this.props.dispatchAuthentication.logout();
      }
    })
    .catch(error=>{

    })
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
            <Text>{this.props.state.authentication ? this.props.state.authentication.phone : ""}</Text>
            <TouchableOpacity onPress={this.eventLogin} style={this.getStyle(this.props.state.authentication.isLoggedIn)}>
              <Text style={styles.text}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.eventLogout} style={this.getStyle(!(this.props.state.authentication.isLoggedIn))}>
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
const mapStateToProps = (state) => {
  return { state: pick(state, ['authentication']) }
}

const mapDispatchToProps = (dispatch) => {
  return { 
    dispatchAuthentication: bindActionCreators(authenticationActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalScreen);