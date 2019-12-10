import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  StyleSheet, Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
  View, FlatList, Image, TouchableOpacity
} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { general } from '../constants/general';
import * as EVENT from '../apis/event';
import { cloneDeep, pick } from 'lodash';
import requestApi from '../utilities/request';
import * as HOME_API from '../apis/home';
import * as RECOMMEND_API from '../apis/recommend';
import * as authenticationActionCreators from '../actions/authentication';
import * as eventName from '../constants/Event';


class DeviceList extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.otherParam : '',
      headerStyle: {
        backgroundColor: "#ffba00",
      },

    };
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isRefreshing: false, //for pull to refresh
      dataSource: [],
      error: '',
      lastPageReached: false,
      offset: 0,
      dataId: 1,
      userID: ''
    };
  }

  componentDidMount() {
    const dataId = this.props.navigation.getParam('data', 'some default value');
    const userID = this.props.navigation.getParam('userId');
    const keySearch = this.props.navigation.getParam('keySearch');
    this.setState({
      dataId: dataId,
      userID: userID
    })
    this.GetData(dataId, userID, keySearch);
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

  GetData(dataId, userID, keySearch) {
    switch (dataId) {
      case 0: this.props.navigation.setParams({ otherParam: 'Có thể bạn quan tâm' })
        // this.fetchData(general.category.ElectronicDevice, keySearch);
        this.getInterestedListItem(userID);
        break;
      case 1: this.props.navigation.setParams({ otherParam: 'Bất động sản' })
        this.fetchData(general.category.RealEstate, keySearch);
        break;
      case 2: this.props.navigation.setParams({ otherParam: 'Tủ lạnh, Máy lạnh, Máy giặc' })
        this.fetchData(general.category.Diengiadung, keySearch);
        break;
      case 3: this.props.navigation.setParams({ otherParam: 'Đồ dùng văn phòng, Công nông nghiệp' })
        this.fetchData(general.category.Vanphongpham, keySearch);
        break;
      case 4: this.props.navigation.setParams({ otherParam: 'Việc làm' })
        this.fetchData(general.category.ViecLam, keySearch);
        break;
      case 5: this.props.navigation.setParams({ otherParam: 'Các loại khác' })
        this.fetchData(general.category.Other, keySearch);
        break;
      case 6: this.props.navigation.setParams({ otherParam: 'Đồ Điện Tử' })
        this.fetchData(general.category.ElectronicDevice, keySearch);
        break;
      case 7: this.props.navigation.setParams({ otherParam: 'Đồ gia dụng, Nội thất, Cây cảnh' })
        this.fetchData(general.category.NoiThat, keySearch);
        break;
      case 8: this.props.navigation.setParams({ otherParam: 'Mẹ và bé' })
        this.fetchData(general.category.MevaBe, keySearch);
        break;
      case 9: this.props.navigation.setParams({ otherParam: 'Giải trí, Thể thao, Sở thích' })
        this.fetchData(general.category.Giaitri, keySearch);
        break;
      case 10: this.props.navigation.setParams({ otherParam: 'Tất cả danh mục' })
        this.fetchData(general.category.ElectronicDevice, keySearch);
        break;
      case 11: this.props.navigation.setParams({ otherParam: 'Xe cộ' })
        this.fetchData(general.category.Xeco, keySearch);
        break;
      case 12: this.props.navigation.setParams({ otherParam: 'Dịch vụ, Du lịch' })
        this.fetchData(general.category.DichVu, keySearch);
        break;
      case 13: this.props.navigation.setParams({ otherParam: 'Thú cưng' })
        this.fetchData(general.category.ThuCung, keySearch);
        break;
      case 14: this.props.navigation.setParams({ otherParam: 'Thời trang, Đồ dùng cá nhân' })
        this.fetchData(general.category.Thoitrang, keySearch);
        break;
      case 15: this.props.navigation.setParams({ otherParam: 'Cho tặng miễn phí' })
        this.fetchData(general.category.ElectronicDevice, keySearch);
        break;
      default: break;
    }
  };


  fetchData = (category, keySearch) => {
    let api = cloneDeep(HOME_API.getItem);
    api.url = api.url + "?cg=" + category + "&limit="
      + general.page.limit + "&o=" + this.state.offset + "&distance=" + general.page.distance + "&keysearch=" + keySearch;
    console.log('before fetch');
    requestApi(api).then(async (data) => {
      const jsonData = await data.json();
      let oldData = this.state.dataSource;
      if (jsonData.ads.length > 0) {
        let newData = this.filterForUniqueAd(oldData.concat(jsonData.ads));
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
    let api = cloneDeep(RECOMMEND_API.getInterestedItem);
    api.url = api.url + "?user_id=" + userId;
    requestApi(api).then(async (data) => {
      const jsonData = await data.json();
      console.log("-----------------get interest--------------");
      console.log(jsonData);
      if (jsonData.ads.length > 0)
        this.setState({ dataSource: jsonData });
      else {
        this.fetchData(general.category.ElectronicDevice,"");
      }

    })
    .catch(error=>{
      console.log(error);
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

  filterForUniqueAd = arr => {
    console.log("arr", arr);
    const cleaned = [];
    arr.forEach(itm => {
      let unique = true;
      cleaned.forEach(itm2 => {
        const isEqual = JSON.stringify(itm.list_id) === JSON.stringify(itm2.list_id);
        if (isEqual) unique = false;
      });
      if (unique) cleaned.push(itm);
    });
    console.log("cleaned", cleaned);
    return cleaned;
  };

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
  RenderList = ({ item }) => {
    return (
      <TouchableOpacity style={styles.flatDetail} key={item.ad_id} onPress={() => this.onPress(item)} >
        <View style={{ flexDirection: 'row' }}>
          <Image style={styles.flatStylePic}
            source={{ uri: item.image }} resizeMode="stretch" >
          </Image>
          <View style={styles.styleText}>
            <Text style={styles.styleTextSubject} numberOfLines={2} ellipsizeMode={"tail"}>
              {item.subject}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.styleTextPrice}>Giá: {item.price_string}</Text>
              <Text style={item.tag_rate_New?styles.percent:{display:"none"}}>{item.tag_rate_New}</Text>
            </View>
            <View style={styles.containSmallText}>
              <Text style={styles.smalltext}>{item.date}</Text>
              <Text style={styles.smalltext}> | </Text>
              <Text style={styles.smalltext}>{item.distance} km</Text>
              <TouchableOpacity style={{ position: "absolute", right: 10 }}>
                <MaterialCommunityIcons
                  name="heart-outline" size={25} color={'red'}>
                </MaterialCommunityIcons>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  onRefresh() {
    this.GetData(this.state.dataId, this.state.userID);
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" loading={this.state.loading} />
        </View>
      )

    }
    return (
      <View style={styles.container}>
        <FlatList style={{ flex: 1 }}
          data={this.state.dataSource}
          renderItem={this.RenderList}
          refreshing={this.state.isRefreshing}
          onRefresh={this.onRefresh.bind(this)}
          keyExtractor={item => item.ad_id.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          onEndReached={() => { this.GetData(this.state.dataId, this.state.userID, '') }} onEndReachedThreshold={1}
          ListFooterComponent={this.state.lastPageReached ? <Text>No more items</Text> : <ActivityIndicator
            size="large"
            loading={this.state.loading}
          />}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lottie: {
    width: 100,
    height: 100
  },
  flatDetail: {
    height: 110,
    flex: 1, flexDirection: 'column',
    marginTop: 7,
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
    width: 120,
    height: 109,
  },
  styleTextSubject: {
    fontSize: 15,
    marginLeft: 7,
    fontWeight: "bold",
  },
  styleTextPrice: {
    fontSize: 15,
    color: 'red',
    marginLeft: 7,
    paddingVertical: 10,
    fontWeight: "bold"
  },
  styleTextAddress: {
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
    width: "80%",
    flexDirection: 'column',
    marginLeft: 0.5,
    borderBottomRightRadius: 14,
    borderTopRightRadius: 14,
    marginBottom: 1.5,
    marginTop: 0.5,
  },
  containSmallText: {
    width: "90%",
    flexDirection: "row",
    paddingLeft: 7,
    position: "absolute",
    bottom: 10
  },
  smalltext: {
    fontSize: 11,
    color: "#8c8c8c"
  },
  percent: {
    fontSize: 10,
    color: "#008ae6",
    borderColor: "#008ae6",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 1,
    marginLeft: 10,
    borderRadius: 5,
    height: 18,
    marginTop: 10
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