import React from 'react';
import {TOKEN} from '../constants/localStorage';

const requestApi = async (api) =>{
    console.log('aaa');
    api.url = process.env.REACT_APP_API_URL + api.url;
    api.request.headers = {
        ...api.request.headers,
        'Authorization' : 'Bearer' + localStorage.getItem(TOKEN)
    }
    console.log(api);
    return await fetch(api.url,api.request);
}

export default requestApi;