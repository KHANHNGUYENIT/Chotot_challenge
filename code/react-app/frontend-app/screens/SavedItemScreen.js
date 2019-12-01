import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class SavedItemScreen extends React.Component {
    constructor() {
        super();
        this.state = {
          dataSaved: [],
        
        };
      }    
    componentDidMount(){
        const dataSaved = this.props.navigation.getParam('data', 'some default value');
        this.setState({
          //dataSaved:data,
          dataSaved
        })
        ListSaved(dataSaved);
       // console.log(dataSaved);
      }
    ListSaved(dataSaved){
      const Listdata = [...dataSaved,dataSaved]
      return Listdata;
    }
  render() {
    return (
      <Text>Thông báo</Text>
    );
  }
}

SavedItemScreen.navigationOptions = {
  title: 'Sản phẩm đã thích',
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
});