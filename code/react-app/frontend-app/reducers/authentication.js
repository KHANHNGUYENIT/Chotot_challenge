import {
    AUTHENTICATION_LOGIN,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAIL,
    AUTHENTICATION_CHECK_IF_LOGGED_IN,
    AUTHENTICATION_LOGOUT,
    AUTHENTICATION_LOADING,
    AUTHENTICATION_UNLOAD
} from '../constants/authentication';
import { TOKEN, USER_ID, PHONE } from '../constants/localStorage';
import { cloneDeep, get, set } from 'lodash';
import { AsyncStorage } from 'react-native';

const initialState = {
    isLoggedIn: false,
    userId: '',
    token: '',
    phone: '',
    isLoading: false,
    errors: ''
}

const updateAuthenticated = (state, data) => {
    console.log("--------------data----------------");
    console.log(data);
    let tempState = cloneDeep(state);

    tempState.isLoggedIn = true;
    tempState.token = get(data, 'token');
    tempState.userId = get(data, 'user.userId', '');
    tempState.phone = get(data, 'user.phone');
    console.log("--------------tempState----------------");
    console.log(tempState);

    saveStorage(tempState);

    if (tempState.isLoading)
        tempState.isLoading = false
    return tempState;
}

const saveStorage = async (tempState) => {
    if (!(await AsyncStorage.getItem(TOKEN)))
        await AsyncStorage.setItem(TOKEN, tempState.token);
    if (!(await AsyncStorage.getItem(PHONE)))
        await AsyncStorage.setItem(PHONE, tempState.phone);
    if (!(await AsyncStorage.getItem(USER_ID)))
        await AsyncStorage.setItem(USER_ID, tempState.userId);
}

const logout = (state) => {
    let tempState = cloneDeep(state);

    tempState = initialState;

    // AsyncStorage.clear();
    if (!AsyncStorage.getItem(TOKEN))
        AsyncStorage.removeItem(TOKEN);
    if (!AsyncStorage.getItem(PHONE))
        AsyncStorage.removeItem(PHONE);
    if (!AsyncStorage.getItem(USER_ID))
        AsyncStorage.removeItem(USER_ID);
    return tempState;
}

const authentication = (state = initialState, action) => {
    let authenticationState = cloneDeep(state);

    switch (action.type) {
        case AUTHENTICATION_SUCCESS:
            return updateAuthenticated(authenticationState, action.data);
        case AUTHENTICATION_LOADING:
            authenticationState.isLoading = true;
            return authenticationState;
        case AUTHENTICATION_UNLOAD:
            authenticationState.isLoading = false;
            return authenticationState;
        case AUTHENTICATION_LOGOUT:
            return logout(authenticationState);
        default:
            return authenticationState;
    }
}

export default authentication;