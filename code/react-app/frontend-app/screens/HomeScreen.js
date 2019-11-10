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
  ScrollView
} from 'react-native';

import { styles } from '../styles/styles';

import { Search } from '../components/Search';
import { Button } from '../components/Button';
import { renderList } from '../components/HorizontalList';

const data = [
  { Id: "1", ItemName: "Iphone 6S 32G Quốc Tế-Đủ màu.Mới98%.zin100%", Price: 50000, Time: 1, ImageUrl: require("../assets/images/iphone.png") },
  { Id: "2", ItemName: "Iphone6", Price: 50000, Time: 1, ImageUrl: require("../assets/images/iphone.png") },
  { Id: "3", ItemName: "Iphone6", Price: 50000, Time: 1, ImageUrl: require("../assets/images/iphone.png") },
  { Id: "4", ItemName: "Iphone6", Price: 50000, Time: 1, ImageUrl: require("../assets/images/iphone.png") },
  { Id: "5", ItemName: "Iphone6", Price: 50000, Time: 1, ImageUrl: require("../assets/images/iphone.png") },
  { Id: "6", ItemName: "Iphone6", Price: 50000, Time: 1, ImageUrl: require("../assets/images/iphone.png") },
];

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tabCurrent: 1
    }
  }

  setTabCurrent = (tabId)=>{
    this.setState({
      tabCurrent: tabId
    })
  }

  getDataByTabId = ()=>{
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Search></Search>
        <View style={{ flex: 9 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 4}}>
              <View style={styles.containBtn}>
                <Button text={"Gần tôi"} id={1} icon={""} currentBtn = {this.state.tabCurrent} setTabCurrent = {this.setTabCurrent} ></Button>
                <Button text={"Mới đây"} id={2} icon={""} currentBtn = {this.state.tabCurrent} setTabCurrent = {this.setTabCurrent}></Button>
                <Button text={"Phổ biến"} id={3} icon={""} currentBtn = {this.state.tabCurrent} setTabCurrent = {this.setTabCurrent}></Button>
              </View>
              <View>
                <FlatList
                  data={data}
                  renderItem={renderList}
                  keyExtractor={item => item.Id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
            <View style={{ flex: 6 }}>
              <View style={styles.headerGroup}>
                <Text style={styles.header}>Có thể bạn quan tâm</Text>
                <TouchableOpacity>
                  <Text style={styles.link}>Xem thêm</Text>
                </TouchableOpacity>
              </View>
              <View>
                <FlatList
                  data={data}
                  renderItem={renderList}
                  keyExtractor={item => item.Id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
            <View style={{ flex: 6 }}>
              <View style={styles.headerGroup}>
                <Text style={styles.header}>Đồ điện tử</Text>
                <TouchableOpacity>
                  <Text style={styles.link}>Xem thêm</Text>
                </TouchableOpacity>
              </View>
              <View>
                <FlatList
                  data={data}
                  renderItem={renderList}
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


