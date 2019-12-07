import { combineReducers } from 'redux';
import loading from "./loading";
import authentication from './authentication';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    routing: routerReducer,
    form: formReducer,
    loading,
    authentication
});