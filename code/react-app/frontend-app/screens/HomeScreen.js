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
  TouchableWithoutFeedback
} from 'react-native';

import { styles } from '../styles/styles';

import { Search } from '../components/Search';
import { Button } from '../components/Button';

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
      tabCurrent: 1,
      data: []
    }
  }

  componentDidMount(){
    // this.getData();
  }

  renderList = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.onPress()}>
        <View style={styles.containItem}>
          <Image style={styles.image} source={item.ImageUrl}></Image>
          <Text style={styles.itemName} numberOfLines={2} ellipsizeMode={"tail"}>{item.ItemName}</Text>
          <Text style={styles.itemPrice}>{item.Price}</Text>
        </View>
      </TouchableWithoutFeedback>
    )

  }

  getData = async ()=>{
    const api = 'http://192.168.1.147:8080/api/v1/item/';
    // const api = 'https://gateway.chotot.com/v1/public/ad-listing?app_id=android&cg=5000&limit=20&o=0';
    try {
      console.log('before fetch');
      const response = await fetch(api);

      const jsonData = await response.json();
      this.setState({data:jsonData});
      console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  }

  setTabCurrent = (tabId) => {
    this.setState({
      tabCurrent: tabId
    })
  }


  getDataByTabId = () => {

  }

  onPress = () => {
    this.props.navigation.navigate('AdDetail');
  }

  render() {
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
              <View style={{ flex: 0.05, marginTop: 4, height: 1, backgroundColor: '#ffa100' }}></View>
              <View>
                <FlatList
                  data={data}
                  renderItem={this.renderList}
                  keyExtractor={item => item.Id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
            <View style={styles.viewFlatHome}>
              <View style={styles.headerGroup}>
                <Text style={styles.header}>Có thể bạn quan tâm</Text>
                <TouchableOpacity>
                  <Text style={styles.link}>Xem thêm</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.05, marginTop: 2, height: 1, backgroundColor: '#ffa100' }}></View>
              <View>
                <FlatList
                  data={data}
                  renderItem={this.renderList}
                  keyExtractor={item => item.Id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
            <View style={styles.viewFlatHome}>
              <View style={styles.headerGroup}>
                <Text style={styles.header}>Đồ điện tử</Text>
                <TouchableOpacity>
                  <Text style={styles.link}>Xem thêm</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.05, marginTop: 2, height: 1, backgroundColor: '#ffa100' }}></View>
              <View>
                <FlatList
                  data={data}
                  renderItem={this.renderList}
                  keyExtractor={item => item.Id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
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


