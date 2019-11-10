import React, {Component} from 'react';

import CategoryMain from '../screens/CategoryMain';


export default class categoryApp extends React.Component {
    render() {
      return (
        <CategoryMain />
      );
    }
  }
  categoryApp.navigationOptions = {
    //title: 'Tin nhắn',
    header: null,
  };