import React from 'react';
import {TOKEN} from '../constants/localStorage';
import {AsyncStorage} from 'react-native';

const requestApi = async (api) =>{
    console.log('aaa');
    api.url = 'http://192.168.1.147:8080' + api.url;
    api.request.headers = {
        ...api.request.headers,
        'Authorization' : 'Bearer' + await AsyncStorage.getItem(TOKEN)
    }
    console.log(api);
    return await fetch(api.url,api.request);
}

export default requestApi;