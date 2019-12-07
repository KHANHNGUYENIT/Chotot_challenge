import React from 'react';
import { View, Text, StyleSheet, 
        ScrollView, Dimensions, 
        Image,
        TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { heigh, width } = Dimensions.get('window');

class DeviceDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      dataObject: {},
    };
  }
componentDidMount(){
  const dataObject = this.props.navigation.getParam('data', 'some default value');
  this.setState({dataObject});
  console.log(dataObject);
}
onPress = (item) =>{
  this.props.navigation.navigate('History', {data: item});}
  render() {
   // console.log(dataObject);
    return (
      <ScrollView style={styles.container}>
     
          <Image style={styles.styleImage}
              source={{uri: this.state.dataObject.image}} resizeMode="stretch" >
          </Image>
        
          <View style={styles.styleViewName}>
              <Text style={styles.styleName}>{this.state.dataObject.subject}</Text> 
              <View style={styles.styleViewOfPrice}>
                  <View style={styles.stylePrice_Time}>
                      <Text style={styles.stylePrice}>{this.state.dataObject.price_string}</Text>
                      <Text style={styles.styleTime}>{this.state.dataObject.date}</Text>
                  </View>
                  <View style={{flex:0.3, justifyContent:'flex-end'}}>
                      <TouchableOpacity style={styles.styleButton} onPress = {() => this.onPress(this.state.dataObject)}>
                          <Text style={{fontSize:15, marginRight:5, color:'red'}}>Lưu tin</Text>
                          <MaterialCommunityIcons   name="heart-outline" size={18} color={'red'}>
                          </MaterialCommunityIcons>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
          <View style={styles.styleViewInfo}>
                <View style={styles.styleStatus}>
                    <Text style={{fontSize:16, color:'gray', paddingLeft:5}}>Trạng thái |</Text>
                    <Text style={{fontSize:16, color:'blue'}}>  {this.state.dataObject.condition_ad_name}</Text>
                </View>
                <View style={{height:0.7, backgroundColor:'gray'}}></View>
                <View style={styles.styleStatus}>
                    <Text style={{fontSize:16, color:'gray',paddingLeft:5}}  numberOfLines={2} ellipsizeMode={"tail"}>
                      Địa điểm | 
                        <Text style={{fontSize:16, color:'black', marginLeft:5}}>
                                {this.state.dataObject.ward_name},{this.state.dataObject.area_name},
                              {this.state.dataObject.region_name}.</Text>
                    </Text>
                </View>
          </View>
          <View style={styles.stylePerson}>
                  <Image style={styles.styleImagePic} source={{uri:this.state.dataObject.avatar }} resizeMode="stretch">
                  </Image>
                   <Text style={styles.styleNamePerson} numberOfLines={2} ellipsizeMode={"tail"}>
                     {this.state.dataObject.account_name}</Text>
          </View>
          <View style={styles.styleDescription}>
                <Text style={{fontSize: 18, color:'gray', paddingLeft:5}}>Thông tin sản phẩm:</Text>
                <Text style={styles.styleBody}>{this.state.dataObject.body}</Text>
          </View>
         
      </ScrollView>
    );
  }

};

DeviceDetail.navigationOptions = {
  //title: 'information details',
  headerStyle: {
    backgroundColor: "#ffba00",
  },
};

const styles = StyleSheet.create({
  container: {
 //   flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: "#F8F8FF",
  },
  styleImage:{
    width: width,
    height: 290,
  },
  styleViewName:{
   // height: 110,
    flexDirection:'column',
    backgroundColor: "#fff",
    marginTop:7,
    marginBottom: 7,
    marginLeft: 7,
    marginRight:7,
    borderRadius:14,

    borderWidth:1,
    borderColor: '#ffba00',

  },
  styleName:{
      //flex:0.5,
      fontSize:20,
      paddingLeft: 5,
      color:'#645DAC',
    // marginLeft:5,
  },

  stylePrice_Time:{
      flexDirection:'column',
  },
  styleViewOfPrice:{
      flex:0.7,
      flexDirection:'row',
      justifyContent:'space-between',
  },
  stylePrice:{ 
    // flex: 0.5,
      fontSize:18,
      color:'red',
      //marginLeft:5,
      paddingLeft: 5,
  },
  styleViewInfo:{
      flexDirection:'column',
      backgroundColor: "#fff",
    // marginTop:7,
      marginBottom: 7,
      marginLeft: 7,
      marginRight:7,
      borderRadius:14,

      borderWidth:1,
      borderColor: '#ffba00',
  },

  styleTime:{
      fontSize:12,
      color:'gray',
      paddingLeft: 5,
      paddingBottom:5,
  },
  styleButton:{
      flexDirection:'row',
      justifyContent:'center',
      marginRight:5,
      marginBottom:5,
      borderWidth:1,
      borderColor: 'red',
      borderRadius: 9,    
   },
  styleBody:{
      marginLeft:5,
      marginTop:3,
      marginRight:4,

  },
  styleStatus:{flexDirection:'row',},
  stylePerson:{ 
      flexDirection:'row',
      backgroundColor: "#fff",
      marginBottom: 7,
      marginLeft: 7,
      marginRight:7,
      borderRadius:14,
      borderTopLeftRadius:15,
      borderBottomLeftRadius: 15,
      borderWidth:1,
      borderColor: '#ffba00',
   },
  styleImagePic:{
      width:80,
      height:80,
      borderRadius:15,
      justifyContent:'flex-start',
  },
  styleNamePerson:{ 
      fontSize:20,
      paddingLeft: 5,
      color:'#645DAC',
  },
  styleDescription:{
      backgroundColor: "#fff",
    // marginTop:7,
      marginBottom: 7,
      marginLeft: 7,
      marginRight:7,
      borderRadius:14,

      borderWidth:1,
      borderColor: '#ffba00',
  },
});
export default DeviceDetail;