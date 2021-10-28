import * as types from '../constants/user';
import { getApi, postApi } from '../../utils/api';
import errors from '../../utils/errors';
import { User } from '../../config';
import { history } from '../store';

//register user
export function registerError(error) {
    return {
        type: types.REGISTER_FAILURE,
        payload: error,
    };
}

export function registerSuccess(payload) {
    const accessToken = payload.tokens?.jwtAccessToken;
    User.setAccessToken(accessToken);
    User.setFirstName(payload.firstName);
    User.setLastName(payload.lastName);
    User.setEmail(payload.email);
    User.setUserId(payload.id);
    return {
        type: types.REGISTER_SUCCESS,
        payload,
    };
}

export function registerRequest() {
    return {
        type: types.REGISTER_REQUEST,
    };
}

// Calls the API to register a user.
export function registerUser(data) {
    return dispatch => {
        const promise = postApi('auth/signup', data);
        dispatch(registerRequest());
        promise.then(
            function(payload) {
                dispatch(registerSuccess(payload.data?.data));
                history.push('/dashboard/scholarship');
            },
            function(error) {
                if (error && error.response && error.response.data)
                    error = error.response.data;
                if (error && error.data) {
                    error = error.data;
                }
                if (error && error.message) {
                    error = error.message;
                } else {
                    error = 'Network Error';
                }
                dispatch(registerError(errors(error)));
            }
        );

        return promise;
    };
}

export function loginError(error) {
    return {
        type: types.LOGIN_FAILURE,
        payload: error,
    };
}

export function loginSuccess(payload) {
    const accessToken = payload.tokens?.jwtAccessToken;
    User.setAccessToken(accessToken);
    User.setFirstName(payload.firstName);
    User.setLastName(payload.lastName);
    User.setEmail(payload.email);
    User.setUserId(payload.id);
    return {
        type: types.LOGIN_SUCCESS,
        payload,
    };
}

export function loginRequest() {
    return {
        type: types.LOGIN_REQUEST,
    };
}

// Calls the API to login a user.
export function loginUser(data) {
    return dispatch => {
        const promise = postApi('auth/signin', data);
        dispatch(loginRequest());
        promise.then(
            function(payload) {
                // eslint-disable-next-line no-console
                console.log(payload);
                dispatch(loginSuccess(payload.data?.data));
                history.push('/dashboard/scholarship');
            },
            function(error) {
                if (error && error.response && error.response.data)
                    error = error.response.data;
                if (error && error.data) {
                    error = error.data;
                }
                if (error && error.message) {
                    error = error.message;
                } else {
                    error = 'Network Error';
                }
                dispatch(loginError(errors(error)));
            }
        );

        return promise;
    };
}
//getting a user
export function getUserError(error) {
    return {
        type: types.GET_USER_FAILURE,
        payload: error,
    };
}

export function getUserSuccess(payload) {
    return {
        type: types.GET_USER_SUCCESS,
        payload,
    };
}

export function getUserRequest() {
    return {
        type: types.GET_USER_REQUEST,
    };
}

// Calls the API to login a user.
export function getUser() {
    return dispatch => {
        const promise = getApi('auth/profile');
        dispatch(getUserRequest());
        promise.then(
            function(payload) {
                dispatch(getUserSuccess(payload.data?.data));
            },
            function(error) {
                if (error && error.response && error.response.data)
                    error = error.response.data;
                if (error && error.data) {
                    error = error.data;
                }
                if (error && error.message) {
                    error = error.message;
                } else {
                    error = 'Network Error';
                }
                dispatch(getUserError(errors(error)));
            }
        );

        return promise;
    };
}
