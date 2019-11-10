import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class PersonalScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  eventLogin = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container1}>
          <TouchableOpacity onPress={this.eventLogin}>
            <Text>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
        <View style = {{flex:7}}></View>
      </View>
    );
  }
}

PersonalScreen.navigationOptions = {
  title: 'Cá nhân',
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
