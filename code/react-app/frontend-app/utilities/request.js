import React from 'react';
import {TOKEN} from '../constants/localStorage';
import {AsyncStorage} from 'react-native';
import * as URL from '../constants/environment';

const requestApi = async (api) =>{
    console.log('aaa');
    api.url = URL.REACT_APP_API_URL + api.url;
    try{
        api.request.headers = {
            ...api.request.headers,
            'Authorization' : 'Bearer ' + await AsyncStorage.getItem(TOKEN)
        }
    }
    catch(error){
        console.log(error);
    }
    console.log(api);
    return await fetch(api.url,api.request);
}

export default requestApi;