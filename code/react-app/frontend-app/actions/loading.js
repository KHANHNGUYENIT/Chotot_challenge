import {LOADING_TRUE, LOADING_FALSE} from '../constants/loading';


export const appLoading = () => {
    return {
        type: LOADING_TRUE
    }
}

export const appLoaded = () => {
    return {
        type: LOADING_FALSE
    }
}