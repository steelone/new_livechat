import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './utility';

const initialState = {
    token: null,
    username: null,
    error: null,
    loading: false,
    loggedIn: false,
    avatar: null,
}

const authStart = (state) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        username: action.username,
        error: null,
        loading: false,
        loggedIn: true,
        avatar: action.avatar
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state) => {
    return updateObject(state, {
        token: null,
        username: null,
        loggedIn: false,
        avatar: null
    });
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default:
            return state;
    }
}
