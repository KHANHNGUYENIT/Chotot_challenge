import React, { Component } from "react";
import {
  StyleSheet, Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
  View, FlatList, Image, TouchableOpacity
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


class DeviceList extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.otherParam : '',
      headerStyle: {
        backgroundColor: "#ffba00"
      },

    };
  };
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.page = 1;
    this.GetData = this.GetData.bind(this);
    this.state = {
      loading: true,
      isRefreshing: false, //for pull to refresh
      dataSource: [],
      error: ''
    };
  }
  GetData(page) {
    const dataId = this.props.navigation.getParam('data', 'some default value');
    switch(dataId) { 
      case 0:       this.props.navigation.setParams({ otherParam: 'Có thể bạn quan tâm' })
                    fetch("https://gateway.chotot.com/v1/public/ad-listing?region_v2=3017&area_v2=301706&cg=1000&limit=20&st=s,k")
                    .then(response => response.json())
                    .then((responseJson)=> {
                      this.setState({
                      loading: false,
                      dataSource: responseJson,
                      })})
                      .catch(error=>console.log(error))
                      break;
      case 1:       this.props.navigation.setParams({ otherParam: 'Bất động sản' })
                    fetch("https://gateway.chotot.com/v1/public/ad-listing?region_v2=3017&area_v2=301706&cg=1000&limit=20&st=s,k")
                    .then(response => response.json())
                    .then((responseJson)=> {
                      this.setState({
                      loading: false,
                      dataSource: responseJson,
                      })})
                      .catch(error=>console.log(error))
                      break;
      case 2:       this.props.navigation.setParams({ otherParam: 'Đồ Điện Tử' })
                    fetch("https://gateway.chotot.com/v1/public/ad-listing?app_id=android&cg=5000&limit=60&st=s,k")
                    .then(response => response.json())
                    .then((responseJson)=> {
                      this.setState({
                      loading: false,
                      dataSource: responseJson,
                      })
                      
                    }) 
                    .catch(error=>console.log(error))
                    break;
      default:      break;
    }
  };

  componentDidMount() {
    this.GetData(this.page);
  }

  onPress = (item) => {
    this.props.navigation.navigate('Details', { data: item });
  }
  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.loading) return null;
    return (
      <ActivityIndicator
        style={{ color: '#000' }}
      />
    );
  };
  handleLoadMore = () => {
    if (!this.state.loading) {
      this.page = this.page + 1; // increase page by 1
      this.GetData(this.page); // method for API call 
    }
  }
  RenderList =  ({item }) => {
      return (
        <TouchableOpacity style={styles.flatDetail} key={item.ad_id} onPress={()=>this.onPress(item)} >
            <View style={{flexDirection: 'row' }}>
                <Image style ={styles.flatStylePic}
                    source={{uri: item.image}} resizeMode="stretch" >
                </Image>
                <View style={styles.styleText}>
                      <Text style={styles.styleTextSubject} numberOfLines={2} ellipsizeMode={"tail"}>
                        {item.subject}</Text>
                      <View style={{height:0.7, backgroundColor:'gray'}}></View>
                      <Text style={styles.styleTextPrice}>Giá: {item.price_string}</Text>
                      <View style={{height:0.7, backgroundColor:'gray'}}></View>
                      <View style={{flexDirection: 'row'}}>
                              <Text style={styles.styleTextAddress} >|{item.region_name}</Text>
                              <TouchableOpacity style={{justifyContent:'flex-end'}} 
                              //onPress={changeColor}
                             >
                                    <MaterialCommunityIcons  style={{justifyContent:'flex-end'}}
                                    name="heart-outline" size={25} color={'gray'}>
                                    </MaterialCommunityIcons>
                              </TouchableOpacity>
                      </View>
               </View>
            </View>   
       </TouchableOpacity>
      );
  };
  onRefresh() {
    // this.GetData();
    this.setState({
      loading: true,
      dataSource: { ...this.GetData(), }
    }
    ); // true isRefreshing flag for enable pull to refresh indicator

  }
  RenderList = ({ item }) => {
    return (
      <TouchableOpacity style={styles.flatDetail} key={item.ad_id} onPress={() => this.onPress(item)} >
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 0.34 }}>
            <Image style={styles.flatStylePic}
              source={{ uri: item.image }} resizeMode="stretch" >
            </Image>
          </View>
          <View style={{ flex: 0.66, flexDirection: 'column' }}>
            <Text style={styles.styleTextSubject} numberOfLines={2} ellipsizeMode={"tail"}>
              {item.subject}</Text>
            {/* <View style={{height:0.7, backgroundColor:'gray'}}></View> */}
            <Text style={styles.styleTextPrice}>Giá: {item.price_string}</Text>
            {/* <View style={{height:0.7, backgroundColor:'gray'}}></View> */}
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.styleTextAddress} >|{item.region_name}</Text>
              <TouchableOpacity style={{ justifyContent: 'flex-end' }}
              //onPress={changeColor}
              >
                <MaterialCommunityIcons style={{ justifyContent: 'flex-end' }}
                  name="heart-outline" size={25} color={'gray'}>
                </MaterialCommunityIcons>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    if (this.state.loading && this.page === 1) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      )
    }
    return (
        <LinearGradient style={styles.container} colors={['#ffba00','#ffffff']}>
          <FlatList style={{flex:1}}
                    data={this.state.dataSource.ads}
                    renderItem={this.RenderList}
                
                    refreshing={this.state.isRefreshing}
                    onRefresh={this.onRefresh.bind(this)}
                      
                    
                    keyExtractor={item => item.ad_id.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListFooterComponent={this.renderFooter.bind(this)}
                    onEndReachedThreshold={0.4}
                    onEndReached={this.handleLoadMore.bind(this)}>
          </FlatList>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  //  backgroundColor: '#F8F8FF',
    //marginTop:10,
  },
  flatDetail: {
    height: 110,
    flex: 1, flexDirection: 'column',
    marginTop: 7,
    marginBottom: 7,
    // marginLeft: 7,
    // marginRight:7,
    // borderRadius:14,

    // borderWidth:1,
    // borderColor: '#ffba00',

    elevation: 5, // Android
    shadowColor: '#CFD8DC', // iOS
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    backgroundColor: '#fff'
  },
  flatStylePic: {
    flex: 0.315,
    width:120, height: 109,
    // borderTopLeftRadius:14,
    // borderBottomLeftRadius: 14,
    borderRadius: 14,
    marginBottom:1,
  },
  styleTextSubject: {
    //  flex: 0.45,
      fontSize: 15,
      marginLeft:7,
  },
  styleTextPrice: {
    //flex: 0.35,
    fontSize: 15, 
    color: 'red',
    marginLeft:7,
  },
  styleTextAddress: {
    //flex: 0.15,
    fontSize:10,
    alignItems:'flex-end',
    marginLeft:7,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
   },
  styleText:{
    
    flex:0.685, flexDirection:'column', marginLeft:0.5,
     borderBottomRightRadius:14, borderTopRightRadius:14, marginBottom:1.5, marginTop:0.5,
    // marginLeft:0.1,
    // backgroundColor:'#00ffef',
  }
});
export default DeviceList;