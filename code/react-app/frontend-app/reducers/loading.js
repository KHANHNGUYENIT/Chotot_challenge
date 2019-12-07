import {LOADING_TRUE, LOADING_FALSE} from '../constants/loading';
import {cloneDeep} from 'lodash';

const initialState = {
    isLoading: false
}

const loading = (state = initialState, action) => {
    let loadingState = cloneDeep(state);

    switch(action.type) {
        case LOADING_TRUE:
            loadingState.isLoading = true;
            return loadingState;
        case LOADING_FALSE: 
            loadingState.isLoading = false;
            return loadingState;
        default:
            return loadingState;
    }
}

export default loading;