import {AUTHENTICATION_LOGIN, 
    AUTHENTICATION_LOGOUT,
    AUTHENTICATION_SUCCESS, 
    AUTHENTICATION_FAIL, 
    AUTHENTICATION_CHECK_IF_LOGGED_IN,
    AUTHENTICATION_LOADING,
    AUTHENTICATION_UNLOAD} from '../constants/authentication';
import request from '../utilities/request';
import * as API from '../apis/authentication';
import {cloneDeep, get} from 'lodash';


export const login = (credentials = {}) => {
    return (dispatch, getState) => {
        dispatch(loading());

        let api = cloneDeep(API.login);
        api.data = credentials;

        request(api).then(
            response => {
                if (response.status === 200) {
                    const token = get(response, 'data.token');
                    const user = get(response, 'data.user');

                    dispatch(loggedIn(token, user));
                }
            },
            error => {
                console.log(error);
                dispatch(unload());
            }
        )
    }
}

export const loggedIn = (token, data) => {
    return {
        type: AUTHENTICATION_SUCCESS,
        data: {
            token,
            user: data
        }
    }
}

export const loading = () => {
    return {
        type: AUTHENTICATION_LOADING
    }
}

export const unload = () => {
    return {
        type: AUTHENTICATION_UNLOAD
    }
}

export const logout = () => {
    return {
        type: AUTHENTICATION_LOGOUT
    }
}