import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';

import { styles } from '../styles/styles';

import { Search } from '../components/Search';
import { Button } from '../components/Button';
import requestApi from '../utilities/request';
import * as HOME_API from '../apis/home';
import * as AUTHENTICATION_API from '../apis/authentication';
import * as EVENT from '../apis/event';
import { cloneDeep, pick } from 'lodash';
import * as asyncStorage from '../constants/localStorage';
import * as eventName from '../constants/Event';
import * as authenticationActionCreators from '../actions/authentication';
import { general } from '../constants/general';
import {AsyncStorage} from 'react-native';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataBDS: [],
      dataDDT: [],
      dataXe:[],
      dataNoiThat: [],
      dataThuC:[],
      interestedList: [],
      headList: [],
      tabCurrent: 1,
      userId: "",
      keySearch: "",
      dataTest: [],
    }
  }

  componentDidMount() {
   
    this.getData();
    this.getDataBDS();
    this.getDataXe();
    this.getDataNoiThat();
    this.getDataThuC();
    this.getDataByTabId(this.state.tabCurrent);
    this.checkLogin();
    // this.getInterestedListItem('d59c9611-760e-4c7a-baac-a72ac5000680');
  }

  renderList = ({ item }) => {
    return (
      <TouchableWithoutFeedback key={item.ad_id} onPress={() => this.onPress(item)}>
        <View style={styles.containItem}>
          <Image style={styles.image} source={{ uri: item.image }}></Image>
          <Text style={styles.itemName} numberOfLines={1} ellipsizeMode={"tail"}>{item.subject}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.itemPrice} numberOfLines={1} ellipsizeMode={"tail"}>{item.price_string}</Text>
            <Text style={item.tag_rate_New?styles.percent:{display:"none"}}>{item.tag_rate_New}</Text>
          </View>
          <View style={styles.containSmallText}>
            <Text style={styles.smalltext}>{item.date}</Text>
            <Text style={styles.smalltext}> | </Text>
            <Text style={styles.smalltext, { color: "#ffa100", fontSize: 11 }}>{item.distance} km</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )

  }

  setLoading = (isLoading) => {
    this.setState({
      loading: isLoading
    })
  }

  setTabCurrent = (tabId) => {
    this.setState({
      tabCurrent: tabId
    })
    this.getDataByTabId(tabId);
  }

  setKeySearch = (key) => {
    // console.log('------------------key---------------')
    // console.log(key);
    this.setState({
      keySearch: key
    })
  }

  getData = async () => {
    let api = cloneDeep(HOME_API.getItem);
    api.url = api.url + "?cg=" + general.category.ElectronicDevice + "&limit="
      + general.page.limit + "&o=" + general.page.offset + "&distance=" + general.page.distance;
    console.log('before fetch');
    requestApi(api).then(async (data) => {
      const jsonData = await data.json();
      this.setState({ dataDDT: jsonData });
      this.setLoading(false)
    }).catch(error => {
      console.log(error);
    })
  }

  getDataSearch = async () => {
    let type = 0;
    let keySearch = this.state.keySearch.toUpperCase();
    // console.log('--------------------search----------------');
    // console.log(keySearch);
    if (keySearch.includes('ĐIỆN THOẠI') || keySearch.includes('IPHONE')|| keySearch.includes('SAMSUNG')
    || keySearch.includes('OPPO')|| keySearch.includes('MAY TINH') || keySearch.includes('LAPTOP')
    || keySearch.includes('Máy tính bảng') || keySearch.includes('tivi') || keySearch.includes('Linh kiện')
    || keySearch.includes('RAM') || keySearch.includes('Thiết bị đeo tay') || keySearch.includes('máy ảnh')
    || keySearch.includes('SonySony') || keySearch.includes('dell')|| keySearch.includes('HP') || keySearch.includes('Asus'))
      type = 6;
    if (keySearch.includes('PHÒNG') || keySearch.includes('NHÀ') || keySearch.includes('ĐẤT') ||
        keySearch.includes('chung cư') || keySearch.includes('NHÀ mặt phố') || keySearch.includes('ĐẤT nền')||
        keySearch.includes('khách sạn') || keySearch.includes('đất mặt tiền') || keySearch.includes('đất giá rẻ')||
        keySearch.includes('đất ngoại ô') || keySearch.includes('NHÀ hẻm') || keySearch.includes('nhà trọ'))
              type = 1;
    if (keySearch.includes('xe yamaha') || keySearch.includes('xe tay ga') || keySearch.includes('xe mới') ||
        keySearch.includes('honda sh') || keySearch.includes('tay côn') || keySearch.includes('xe ô tô')||
        keySearch.includes('xe máy') || keySearch.includes('xe bán tải') || keySearch.includes('xe hơi 4 chổ')||
        keySearch.includes('xe độ') || keySearch.includes('winner') || keySearch.includes('pô'))
                    type = 11;          
    this.props.navigation.navigate('Profile', { data: type, keySearch: this.state.keySearch });

  }

  getDataBDS = async () => {
    let api = cloneDeep(HOME_API.getItem);
    api.url = api.url + "?cg=" + general.category.RealEstate + "&limit="
      + general.page.limit + "&o=" + general.page.offset + "&distance=" + general.page.distance;
    console.log('before fetch');
    requestApi(api).then(async (data) => {
      const jsonData = await data.json();
      this.setState({ dataBDS: jsonData });
      this.setLoading(false)
    }).catch(error => {
      console.log(error);
    })
  }
  getDataXe = async () => {
    let api = cloneDeep(HOME_API.getItem);
    api.url = api.url + "?cg=" + general.category.Xeco + "&limit="
      + general.page.limit + "&o=" + general.page.offset + "&distance=" + general.page.distance;
    console.log('before fetch');
    requestApi(api).then(async (data) => {
      const jsonData = await data.json();
      this.setState({ dataXe: jsonData });
      this.setLoading(false)
    }).catch(error => {
      console.log(error);
    })
  }
  getDataNoiThat = async () => {
    let api = cloneDeep(HOME_API.getItem);
    api.url = api.url + "?cg=" + general.category.NoiThat + "&limit="
      + general.page.limit + "&o=" + general.page.offset + "&distance=" + general.page.distance;
    console.log('before fetch');
    requestApi(api).then(async (data) => {
      const jsonData = await data.json();
      this.setState({ dataNoiThat: jsonData });
      this.setLoading(false)
    }).catch(error => {
      console.log(error);
    })
  }
  getDataThuC = async () => {
    let api = cloneDeep(HOME_API.getItem);
    api.url = api.url + "?cg=" + general.category.ThuCung + "&limit="
      + general.page.limit + "&o=" + general.page.offset + "&distance=" + general.page.distance;
    console.log('before fetch');
    requestApi(api).then(async (data) => {
      const jsonData = await data.json();
      this.setState({ dataThuC: jsonData });
      this.setLoading(false)
    }).catch(error => {
      console.log(error);
    })
  }


  checkLogin = () => {
    let api = cloneDeep(AUTHENTICATION_API.checkLogin);
      requestApi(api).then(async (data) => {
        const jsonData = await data.json();
        console.log(jsonData);
        if (jsonData!=undefined) {
          this.props.dispatchAuthentication.loggedIn(jsonData.token, jsonData.data);
          //lấy danh sách các item có thể bạn quan tâm
          this.getInterestedListItem(jsonData.data.userID);
        }
      })
  }

  getToken = async ()=>{
    return await AsyncStorage.getItem(asyncStorage.TOKEN);
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

  getDataByTabId = (tabId) => {
    switch (tabId) {
      case 1:
        this.getNearList();
        break;
      case 2:
        this.getNewList();
        break;
      case 3:
        this.getHotList();
        break;

    }
  }

  getNearList = () => {
    let api = cloneDeep(HOME_API.getItem);
    api.url = api.url + "?" + "limit="
      + general.page.limit + "&o=" + general.page.offset + "&distance=" + general.page.distance + '&sort=true';
    requestApi(api)
      .then(async (data) => {
        const jsonData = await data.json();
        this.setState({ headList: jsonData });
        this.setLoading(false)
      })
      .catch(error => {
        console.log(error);
      })
  }

  getNewList = () => {
    let api = cloneDeep(HOME_API.getItem);
    api.url = api.url + "?limit="+ general.page.limit + "&o=" + general.page.offset + "&distance=" + general.page.distance;
    requestApi(api)
      .then(async (data) => {
        const jsonData = await data.json();
        this.setState({ headList: jsonData });
        this.setLoading(false)
      })
      .catch(error => {
        console.log(error);
      })
  }

  getHotList = () => {
    let api = cloneDeep(HOME_API.getItem);
    api.url = api.url + "?cg=" + general.category.ElectronicDevice + "&limit="
      + general.page.limit + "&o=" + general.page.offset + "&distance=" + general.page.distance + "&is_shop=true";
    requestApi(api)
      .then(async (data) => {
        const jsonData = await data.json();
        this.setState({ headList: jsonData });
        this.setLoading(false)
      })
      .catch(error => {
        console.log(error);
      })
  }

  onPress = (item) => {
    this.props.navigation.navigate('Details', { data: item, userId: this.props.state.authentication.userId });
    this.saveEvent(item.ad_id);
  }
  onPressLink = (id) => {
    this.props.navigation.navigate('Profile', { data: id, keySearch: '' });
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

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" loading={this.state.loading} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Search eventSearch={() => { this.getDataSearch() }} setKeySearch={this.setKeySearch}></Search>
        <View style={{ flex: 0.9 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.viewFlatHome}>
              <View style={styles.containBtn}>
                <Button text={"Gần tôi"} id={1} icon={""} currentBtn={this.state.tabCurrent} setTabCurrent={this.setTabCurrent} ></Button>
                <Button text={"Mới đây"} id={2} icon={""} currentBtn={this.state.tabCurrent} setTabCurrent={this.setTabCurrent}></Button>
                <Button text={"Phổ biến"} id={3} icon={""} currentBtn={this.state.tabCurrent} setTabCurrent={this.setTabCurrent}></Button>
              </View>
              <View>
                <FlatList
                  data={this.state.headList.ads}
                  renderItem={this.renderList}
                  keyExtractor={item => item.ad_id.toString()}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
            <View style={styles.viewFlatHome}>
              <View style={styles.headerGroup}>
                <Text style={styles.header}>Có thể bạn quan tâm</Text>
                <TouchableOpacity onPress={() => this.onPressLink(0)}>
                  <Text style={styles.link}>Xem thêm</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={this.state.dataDDT.ads}
                renderItem={this.renderList}
                keyExtractor={item => item.ad_id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.viewFlatHome}>
              <View style={styles.headerGroup}>
                <Text style={styles.header}>Đồ điện tử</Text>
                <TouchableOpacity onPress={() => this.onPressLink(6)}>
                  <Text style={styles.link}>Xem thêm</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={this.state.dataDDT.ads}
                renderItem={this.renderList}
                keyExtractor={item => item.ad_id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.viewFlatHome}>
              <View style={styles.headerGroup}>
                <Text style={styles.header}>Bất động sản </Text>
                <TouchableOpacity onPress={() => this.onPressLink(1)}>
                  <Text style={styles.link}>Xem thêm</Text>
                </TouchableOpacity>
              </View>
              {/* <View style={{ flex: 0.05, marginTop: 2, height: 1, backgroundColor: '#ffa100' }}></View> */}
              <FlatList
                data={this.state.dataBDS.ads}
                renderItem={this.renderList}
                keyExtractor={item => item.ad_id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.viewFlatHome}>
              <View style={styles.headerGroup}>
                <Text style={styles.header}>Xe cộ </Text>
                <TouchableOpacity onPress={() => this.onPressLink(11)}>
                  <Text style={styles.link}>Xem thêm</Text>
                </TouchableOpacity>
              </View>
              {/* <View style={{ flex: 0.05, marginTop: 2, height: 1, backgroundColor: '#ffa100' }}></View> */}
              <FlatList
                data={this.state.dataXe.ads}
                renderItem={this.renderList}
                keyExtractor={item => item.ad_id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.viewFlatHome}>
              <View style={styles.headerGroup}>
                <Text style={styles.header}>Đồ gia dụng, Nội thất </Text>
                <TouchableOpacity onPress={() => this.onPressLink(7)}>
                  <Text style={styles.link}>Xem thêm</Text>
                </TouchableOpacity>
              </View>
              {/* <View style={{ flex: 0.05, marginTop: 2, height: 1, backgroundColor: '#ffa100' }}></View> */}
              <FlatList
                data={this.state.dataNoiThat.ads}
                renderItem={this.renderList}
                keyExtractor={item => item.ad_id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.viewFlatHome}>
              <View style={styles.headerGroup}>
                <Text style={styles.header}>Thú cưng </Text>
                <TouchableOpacity onPress={() => this.onPressLink(13)}>
                  <Text style={styles.link}>Xem thêm</Text>
                </TouchableOpacity>
              </View>
              {/* <View style={{ flex: 0.05, marginTop: 2, height: 1, backgroundColor: '#ffa100' }}></View> */}
              <FlatList
                data={this.state.dataThuC.ads}
                renderItem={this.renderList}
                keyExtractor={item => item.ad_id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const mapStateToProps = (state) => {
  return { state: pick(state, ['authentication']) }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAuthentication: bindActionCreators(authenticationActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);


