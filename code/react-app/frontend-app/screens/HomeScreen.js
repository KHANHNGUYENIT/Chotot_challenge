import * as WebBrowser from 'expo-web-browser';
import React from 'react';
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
import listDataItemCategory from '../DataTest/DataItemCategory';

import requestApi from '../utilities/request';
import * as HOME_API from '../apis/home';
import * as AUTHENTICATION_API from '../apis/authentication';
import * as EVENT from '../apis/event';
import { cloneDeep } from 'lodash';
import * as asyncStorage from '../constants/localStorage';
import * as eventName from '../constants/Event';

const data = [
  { Id: "1", ItemName: "Iphone 6S 32G Quốc Tế-Đủ màu.Mới98%.zin100%", Price: 50000, Time: 1, ImageUrl: require("../assets/images/iphone.png") },
  { Id: "2", ItemName: "Iphone6", Price: 50000, Time: 1, ImageUrl: require("../assets/images/iphone.png") },
  { Id: "3", ItemName: "Iphone6", Price: 50000, Time: 1, ImageUrl: require("../assets/images/iphone.png") },
  { Id: "4", ItemName: "Iphone6", Price: 50000, Time: 1, ImageUrl: require("../assets/images/iphone.png") },
  { Id: "5", ItemName: "Iphone6", Price: 50000, Time: 1, ImageUrl: require("../assets/images/iphone.png") },
  { Id: "6", ItemName: "Iphone6", Price: 50000, Time: 1, ImageUrl: require("../assets/images/iphone.png") },
];

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataBDS: [],
      dataDDT: [],
      interestedList: [],
      headList: [],
      tabCurrent: 1,
      userId: ""
    }
  }

  componentDidMount() {
    this.getData();
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
          <Text style={styles.itemPrice} numberOfLines={1} ellipsizeMode={"tail"}>{item.price_string}</Text>
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

  getData = async () => {
    let api = cloneDeep(HOME_API.getItem);
    console.log('before fetch');
    requestApi(api).then(async (data) => {
      const jsonData = await data.json();
      this.setState({ dataDDT: jsonData });
      this.setLoading(false);
      // console.log(jsonData);
    }).catch(error => {
      console.log(error);
    })
  }

  checkLogin = () => {
    let api = cloneDeep(AUTHENTICATION_API.checkLogin);
    requestApi(api).then(async (data) => {
      const jsonData = await data.json();
      if (jsonData) {
        this.setState({ userID: jsonData.data.userID });
        //lấy danh sách các item có thể bạn quan tâm
        this.getInterestedItem(jsonData.data.userID);
      }
    })
  }

  getInterestedListItem = async (userId) => {
    let api = cloneDeep(HOME_API.getInterestedItem);
    api.request.body = JSON.stringify({
      userID: userId,
    });
    requestApi(api).then(async (data) => {
      const jsonData = await data.json();
      this.setState({interestedList: jsonData});
    })
    // fetch('http://118.69.225.72:5000/recommend', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     userID: userId,
    //   }),
    // })
    // .then(async(data)=>{
    //   let jsonData = await data.json();
    //   console.log(jsonData);
    // })
    // .catch((error)=>{
    //   console.log(error);
    // })
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
    requestApi(api)
      .then(async (data) => {
        const jsonData = await data.json();
        this.setState({ headList: jsonData });
        this.setLoading(false);
      })
      .catch(error => {
        console.log(error);
      })
  }

  getNewList = () => {
    let api = cloneDeep(HOME_API.getItem);
    requestApi(api)
      .then(async (data) => {
        const jsonData = await data.json();
        this.setState({ headList: jsonData });
        this.setLoading(false);
      })
      .catch(error => {
        console.log(error);
      })
  }

  getHotList = () => {
    let api = cloneDeep(HOME_API.getItem);

    requestApi(api)
      .then(async (data) => {
        const jsonData = await data.json();
        this.setState({ headList: jsonData });
        this.setLoading(false);
      })
      .catch(error => {
        console.log(error);
      })
  }

  onPress = (item) => {
    this.props.navigation.navigate('Details', { data: item });
    this.saveEvent(item.ad_id);
  }
  onPressLink = (id) => {
    this.props.navigation.navigate('Profile', { data: id });
  }

  saveEvent = (ad_id)=>{
    let api = cloneDeep(EVENT.saveEvent);
    api.body = JSON.stringify({
      ad_id: ad_id,
      user_fingerprint: "d59c9611-760e-4c7a-baac-a72ac5000680",
      event_name: eventName.CLASSIFYAD_CLICK,
      timestamp: + new Date()
    });

    requestApi(api).then(async(data)=>{
      let jsonData = await data.json();
      console.log(data);
    })
    .catch((error)=>{
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
    // if (this.state.hasErrored == true) {
    //   return (
    //     <View style={styles.container}>
    //       <Text>Error =(</Text>
    //     </View>
    //   );
    // }
    return (
      <View style={styles.container}>
        <Search></Search>
        <View style={{ flex: 9 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.viewFlatHome}>
              <View style={styles.containBtn}>
                <Button text={"Gần tôi"} id={1} icon={""} currentBtn={this.state.tabCurrent} setTabCurrent={this.setTabCurrent} ></Button>
                <Button text={"Mới đây"} id={2} icon={""} currentBtn={this.state.tabCurrent} setTabCurrent={this.setTabCurrent}></Button>
                <Button text={"Phổ biến"} id={3} icon={""} currentBtn={this.state.tabCurrent} setTabCurrent={this.setTabCurrent}></Button>
              </View>
              {/* <View style={{ flex: 0.05, marginTop: 4, height: 1, backgroundColor: '#ffa100' }}></View> */}
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
            <View style={styles.viewFlatHome} key={data.id}>
              <View style={styles.headerGroup}>
                <Text style={styles.header}>Có thể bạn quan tâm</Text>
                <TouchableOpacity onPress={() => this.onPressLink(0)}>
                  <Text style={styles.link}>Xem thêm</Text>
                </TouchableOpacity>
              </View>
              {/* <View style={{ flex: 0.05, marginTop: 2, height: 1, backgroundColor: '#ffa100' }}></View> */}
              <FlatList
                data={this.state.dataDDT.ads}
                renderItem={this.renderList}
                keyExtractor={item => item.ad_id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.viewFlatHome} key={data.id}>
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
            <View style={styles.viewFlatHome} key={data.id}>
              <View style={styles.headerGroup}>
                <Text style={styles.header}>Đồ điện tử</Text>
                <TouchableOpacity onPress={() => this.onPressLink(2)}>
                  <Text style={styles.link}>Xem thêm</Text>
                </TouchableOpacity>
              </View>
              {/* <View style={{ flex: 0.05, marginTop: 2, height: 1, backgroundColor: '#ffa100' }}></View> */}
              <FlatList
                data={this.state.dataDDT.ads}
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


