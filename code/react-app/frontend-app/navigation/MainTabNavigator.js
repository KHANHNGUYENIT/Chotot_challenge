import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MessageScreen from '../screens/MessageScreen';
import PersonalScreen from '../screens/PersonalScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarOptions: { 
    activeTintColor: '#ffa100',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-home'
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

const CategoryStack = createStackNavigator(
  {
    Category: CategoryScreen,
  },
  config
);

CategoryStack.navigationOptions = {
  tabBarLabel: 'Danh mục',
  tabBarOptions: { 
    activeTintColor: '#ffa100',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'} />
  ),
};

CategoryStack.path = '';

const NotificationStack = createStackNavigator(
  {
    Notification: NotificationScreen,
  },
  config
);

NotificationStack.navigationOptions = {
  tabBarLabel: 'Thông báo',
  tabBarOptions: { 
    activeTintColor: '#ffa100',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-notifications' : 'md-notifications'} />
  ),
};

NotificationStack.path = '';

const MessageStack = createStackNavigator(
  {
    Message: MessageScreen,
  },
  config
);

MessageStack.navigationOptions = {
  tabBarLabel: 'Tin nhắn',
  tabBarOptions: { 
    activeTintColor: '#ffa100',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-chatboxes'} />
  ),
};

MessageStack.path = '';

const PersonalStack = createStackNavigator(
  {
    Personal: PersonalScreen,
  },
  config
);

PersonalStack.navigationOptions = {
  tabBarLabel: 'Cá nhân',
  tabBarOptions: { 
    activeTintColor: '#ffa100',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

PersonalStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  CategoryStack,
  NotificationStack,
  MessageStack,
  PersonalStack
});

tabNavigator.path = '';

export default tabNavigator;
