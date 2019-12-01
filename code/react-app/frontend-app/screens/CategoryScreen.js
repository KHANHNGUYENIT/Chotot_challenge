import React from 'react';  
import { createStackNavigator, createAppContainer } from 'react-navigation';  
import DeviceDetail from '../screens/DeviceDetail';
import DeviceList from '../screens/DeviceList';
import Category from '../screens/Category';
import SavedItemScreen from '../screens/SavedItemScreen'
const AppNavigator = createStackNavigator(  
  {  
      Home: Category,  
      Profile: DeviceList,
      Details:{ screen: DeviceDetail, navigationOptions: {  tabBarVisible: false, }},
      History: SavedItemScreen,
  },  
  {  
      initialRouteName: "Home"  
  }  
);  

const AppContainer = createAppContainer(AppNavigator);  
export default class CategoryScreen extends React.Component {  
  render() {  
      return <AppContainer />;  
  }  
}  
CategoryScreen.navigationOptions = {
  //title: 'Cá nhân',
  header: null,
};