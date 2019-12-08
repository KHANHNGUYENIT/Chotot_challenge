import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  StyleSheet, Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
  View, FlatList, Image, TouchableOpacity
} from 'react-native';
import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { general } from '../constants/general';
import * as EVENT from '../apis/event';
import { cloneDeep, pick } from 'lodash';
import requestApi from '../utilities/request';
import * as HOME_API from '../apis/home';
import * as authenticationActionCreators from '../actions/authentication';


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
    // this.onPress = this.onPress.bind(this);
    // this.page = 1;
    // this.GetData = this.GetData.bind(this);
    this.state = {
      loading: true,
      isRefreshing: false, //for pull to refresh
      dataSource: [],
      error: '',
      visible: false,
      lastPageReached: false,
      offset: 0,
      dataId:1,
      userID:''
    };
  }

  componentDidMount(){
    const dataId = this.props.navigation.getParam('data', 'some default value');
    const userID = this.props.navigation.getParam('userId');
    const keySearch = this.props.navigation.getParam('keySearch');
    this.setState({
      dataId: dataId,
      userID: userID
    })
    this.GetData(dataId,userID,keySearch);
  }

  setLoading = (isLoading) => {
    this.setState({
      loading: isLoading
    })
  }

  setOffset = (newOffset) => {
    this.setState({
      offset: newOffset
    })
  }

  setLastPageReached = (isLastPage) => {
    this.setState({
      lastPageReached: isLastPage
    })
  }

  GetData(dataId,userID, keySearch) {
    switch (dataId) {
      case 0: this.props.navigation.setParams({ otherParam: 'Có thể bạn quan tâm' })
        this.getInterestedListItem(userID);
        break;
      case 1: this.props.navigation.setParams({ otherParam: 'Bất động sản' })
        this.fetchData(general.category.RealEstate,keySearch);
        break;
      case 2: this.props.navigation.setParams({ otherParam: 'Đồ Điện Tử' })
        this.fetchData(general.category.ElectronicDevice,keySearch);
        break;
      default: break;
    }
  };

  componentDidMount() {
    this.GetData(this.page);
    setInterval(() => {
      this.setState({
        visible: !this.state.visible
      });
    }, 30000);
  }
  fetchData = (category,keySearch) => {
    let api = cloneDeep(HOME_API.getItem);
    api.url = api.url + "?cg=" + category + "&limit="
      + general.page.limit + "&o=" + this.state.offset + "&distance=" + general.page.distance + "&keysearch="+keySearch;
    console.log('before fetch');
    requestApi(api).then(async (data) => {
      const jsonData = await data.json();
      let oldData = this.state.dataSource;
      if (jsonData.ads.length > 0) {
        let newData = oldData.concat(jsonData.ads);
        this.setState({ dataSource: newData });
        this.setLoading(false);
        this.setOffset(this.state.offset + 20);
      }
      else
        this.setLastPageReached(true);
      
    }).catch(error => {
      console.log(error);
    })
  }

  getInterestedListItem = async (userId) => {
    let api = cloneDeep(HOME_API.getInterestedItem);
    api.request.body = JSON.stringify({
      userID: userId,
    });
    requestApi(api).then(async (data) => {
      const jsonData = await data.json();
      this.setState({ interestedList: jsonData });
    })
  }

  onPress = (item) => {
    this.props.navigation.navigate('Details', { data: item });
    this.saveEvent(item.ad_id);
  }

  saveEvent = (ad_id) => {
    const userId = this.props.state.authentication.userId;
    console.log(userId);
    let api = cloneDeep(EVENT.creatEvent);
    api.request.body = JSON.stringify({
      ad_id: ad_id,
      user_fingerprint: userId,
      event_name: eventName.CLASSIFYAD_CLICK
    });

    requestApi(api).then(async (data) => {
      let jsonData = await data.json();
      console.log(data);
    })
      .catch((error) => {
        console.log(error);
      })
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
                      <View style={{flexDirection: 'row'}}>
                          <Text style={styles.styleTextPrice}>Giá: {item.price_string}</Text>
                               <TouchableOpacity style={{marginLeft:5, flex:0.2, justifyContent:'flex-end'}}>
                                    <MaterialCommunityIcons  
                                    name="heart-outline" size={25} color={'red'}>
                                    </MaterialCommunityIcons>
                              </TouchableOpacity>
                              {/* <TouchableOpacity style={{marginLeft:5, justifyContent:'flex-end'}} >
                                    <MaterialCommunityIcons
                                    name="heart" size={25} color={'red'}>
                                    </MaterialCommunityIcons>
                              </TouchableOpacity> */}
                      </View>
                  <View style={{flexDirection: 'row'}}>
                      <MaterialIcons style={{marginLeft:5}} name="location-on" color='gray' ></MaterialIcons>
                      <Text style={styles.styleTextAddress} >{item.region_name}</Text>
                  </View>
               </View>
            </View>   
       </TouchableOpacity>
      );
  };
  onRefresh() {
    this.GetData(this.state.dataId,this.state.userID);
    // this.setState({
    //   loading: true,
    //   dataSource: { ...this.GetData(), }
    // }
    // ); // true isRefreshing flag for enable pull to refresh indicator

  }
  // RenderList = ({ item }) => {
  //   return (
  //     <TouchableOpacity style={styles.flatDetail} key={item.ad_id} onPress={() => this.onPress(item)} >
  //       <View style={{ flexDirection: 'row' }}>
  //         <View style={{ flex: 0.34 }}>
  //           <Image style={styles.flatStylePic}
  //             source={{ uri: item.image }} resizeMode="stretch" >
  //           </Image>
  //         </View>
  //         <View style={{ flex: 0.66, flexDirection: 'column' }}>
  //           <Text style={styles.styleTextSubject} numberOfLines={2} ellipsizeMode={"tail"}>
  //             {item.subject}</Text>
  //           {/* <View style={{height:0.7, backgroundColor:'gray'}}></View> */}
  //           <Text style={styles.styleTextPrice}>Giá: {item.price_string}</Text>
  //           {/* <View style={{height:0.7, backgroundColor:'gray'}}></View> */}
  //           <View style={{ flexDirection: 'row' }}>
  //             <Text style={styles.styleTextAddress} >|{item.region_name}</Text>
  //             <TouchableOpacity style={{ justifyContent: 'flex-end' }}
  //             //onPress={changeColor}
  //             >
  //               <MaterialCommunityIcons style={{ justifyContent: 'flex-end' }}
  //                 name="heart-outline" size={25} color={'gray'}>
  //               </MaterialCommunityIcons>
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // }
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" loading={this.state.loading}/>
        </View>
      )
  
    }
    return (
      <LinearGradient style={styles.container} colors={['#ffba00', '#ffffff']}>
        <FlatList style={{ flex: 1 }}
          data={this.state.dataSource}
          renderItem={this.RenderList}
          refreshing={this.state.isRefreshing}
          onRefresh={this.onRefresh.bind(this)}
          keyExtractor={item => item.ad_id.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          onEndReached={()=>{this.GetData(this.state.dataId,this.state.userID)}} onEndReachedThreshold={1}
          ListFooterComponent={this.state.lastPageReached ? <Text>No more items</Text> : <ActivityIndicator
            size="large"
            loading={this.state.loading}
          />}
        />
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
  lottie: {
    width: 100,
    height: 100
  },
  flatDetail: {
    height: 110,
    flex: 1, flexDirection: 'column',
    marginTop: 7,
    //marginBottom: 7,
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
    // flex: 0.315,
    width: 120, height: 109,
    // borderTopLeftRadius:14,
    // borderBottomLeftRadius: 14,
    // borderRadius: 14,
    //marginBottom:1,
  },
  styleTextSubject: {
    //  flex: 0.45,
      fontSize: 15,
      marginLeft:7,
      fontWeight: "bold",
  },
  styleTextPrice: {
    flex: 0.8,
    fontSize: 15, 
    color: 'red',
    marginLeft: 7,
  },
  styleTextAddress: {
    //flex: 0.15,
    fontSize: 10,
    alignItems: 'flex-end',
    marginLeft: 7,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  styleText: {

    flex: 0.685, flexDirection: 'column', marginLeft: 0.5,
    borderBottomRightRadius: 14, borderTopRightRadius: 14, marginBottom: 1.5, marginTop: 0.5,
    // marginLeft:0.1,
    // backgroundColor:'#00ffef',
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

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList);