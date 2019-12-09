import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {MaterialIcons} from '@expo/vector-icons';


import { AsyncStorage } from 'react-native';
import requestApi from '../utilities/request';
import * as AUTHENTICATION_API from '../apis/authentication';
import * as asyncStorage from '../constants/localStorage';
import { cloneDeep, pick } from 'lodash';
import * as authenticationActionCreators from '../actions/authentication';
import listInfor from "../DataTest/DataInfor";

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
        <ScrollView style={styles.containerPer}>
          <View style={styles.avatarPer}>
                <Image
                  style={{ width: 100, height: 100, marginTop:15 }}
                  source={require('../assets/images/user.png')}/>
                  <Text>{this.props.state.authentication ? this.props.state.authentication.phone : ""}</Text>
                  <TouchableOpacity onPress={this.eventLogin} style={this.getStyle(this.props.state.authentication.isLoggedIn)}>
                          <Text style={styles.text}>Đăng nhập</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.eventLogout} style={this.getStyle(!(this.props.state.authentication.isLoggedIn))}>
                          <Text>Đăng xuất</Text>
                  </TouchableOpacity>
          </View>
          {/* <View style={{marginTop:5, height:1, backgroundColor:"#d9dddc"}}></View> */}
          <View style={styles.avatarPer}>
          {listInfor.slice(1,5).map(item =>{ return (
              <TouchableOpacity style={styles.styleTouch} key={item.id}>
                     <MaterialIcons style={styles.styleIcon} name={item.nameIcon} size={25} color={ '#00c5ff'}>
                     </MaterialIcons>
                      <Text style={styles.styleText}>{item.name}</Text>
              </TouchableOpacity>
               );})}
          </View>
          <View style={styles.avatarPer}>
          {listInfor.slice(5,9).map(item =>{ return (
              <TouchableOpacity style={styles.styleTouch} key={item.id}>
                     <MaterialIcons style={styles.styleIcon} name={item.nameIcon} size={25} color={ '#ffba00'}>
                     </MaterialIcons>
                      <Text style={styles.styleText}>{item.name}</Text>
              </TouchableOpacity>
               );})}
          </View>
          <View style={styles.avatarPer}>
          {listInfor.slice(9,12).map(item =>{ return (
              <TouchableOpacity style={styles.styleTouch} key={item.id}>
                     <MaterialIcons style={styles.styleIcon} name={item.nameIcon} size={25} color={ '#5dac64'}>
                     </MaterialIcons>
                      <Text style={styles.styleText}>{item.name}</Text>
              </TouchableOpacity>
               );})}
          </View>
  
        </ScrollView>
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
  containerPer: {
    backgroundColor: '#f4f4f4',
    flex:1,
  },
  avatarPer:{
    flexDirection: "column",
    //borderRadius:5,
    borderTopWidth:1,
    borderColor:"#dbdbdb",
     alignItems:"center",

  },
  styleTouch:{
    height:50, 
    borderTopWidth:1,
    borderColor:"#e7e7e7",
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  styleIcon:{
    flex: 0.12,
    marginLeft:20,
    //alignItems: "flex-end",
  },
  styleText:{
    flex:0.88,
   // marginLeft:5,
    alignItems:'flex-start',
    color:"#645DAC",
    fontSize: 17,
    fontWeight: "bold",
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 30
  },

  btn: {
    width: 250,
    height: 40,
    backgroundColor: "blue",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#ffffff"
  },

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