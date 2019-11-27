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
import listDataItemCategory from '../DataTest/DataItemCategory';


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
   // this.getApi = this.getApi.bind(this);
    this.state = {
      loading: true,
    //  dataList: [],
      dataBDS:[],
      dataDDT:[],
   
    }
  }
getApi = ()=>{
  
              {fetch("https://gateway.chotot.com/v1/public/ad-listing?region_v2=3017&area_v2=301706&cg=1000&limit=20&st=s,k")
              .then(response => response.json())
              .then((responseJson)=> {
                this.setState({
                loading: false,
                dataBDS: responseJson,
                })})
               .catch(error=>console.log(error))}
              
      
              {fetch("https://gateway.chotot.com/v1/public/ad-listing?app_id=android&cg=5000")
              .then(response => response.json())
              .then((responseJson)=> {
                this.setState({
                loading: false,
                dataDDT: responseJson,
                })
              })
              .catch(error=>console.log(error))} 
            
           
   
}
  componentDidMount(){
             this.getApi();
}
 
  renderList = ({ item }) => {
    return (
      <TouchableWithoutFeedback key={item.ad_id} onPress={() => this.onPress(item)}>
        <View style={styles.containItem}>
          <Image style={styles.image}  source={{uri: item.image}}></Image>
          <Text style={styles.itemName} numberOfLines={1} ellipsizeMode={"tail"}>{item.subject}</Text>
          <Text style={styles.itemPrice} numberOfLines={1} ellipsizeMode={"tail"}>{item.price_string}</Text>
        </View>
      </TouchableWithoutFeedback>
    )

  }

  setTabCurrent = (tabId) => {
    this.setState({
      tabCurrent: tabId
    })
  }


  getDataByTabId = () => {

  }

  onPress = (item) =>{
    this.props.navigation.navigate('Details', {data: item});}
  onPressLink = (id) => {
     this.props.navigation.navigate('Profile', {data: id});
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
                  data={this.state.dataDDT.ads}
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
                      <View style={{ flex: 0.05, marginTop: 2, height: 1, backgroundColor: '#ffa100' }}></View>
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
                      <Text style={styles.header}>Bất động sản </Text>
                        <TouchableOpacity onPress={() => this.onPressLink(1)}>
                            <Text style={styles.link}>Xem thêm</Text>
                        </TouchableOpacity>
                      </View> 
                      <View style={{ flex: 0.05, marginTop: 2, height: 1, backgroundColor: '#ffa100' }}></View>
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
                      <View style={{ flex: 0.05, marginTop: 2, height: 1, backgroundColor: '#ffa100' }}></View>
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


