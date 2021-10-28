import * as types from '../constants/application';
import { getApi, postApi } from '../../utils/api';
import errors from '../../utils/errors';

export function createApplicationError(error) {
    return {
        type: types.CREATE_APPLICATION_FAILURE,
        payload: error,
    };
}

export function createApplicationSuccess(payload) {
    return {
        type: types.CREATE_APPLICATION_SUCCESS,
        payload,
    };
}

export function createApplicationRequest() {
    return {
        type: types.CREATE_APPLICATION_REQUEST,
    };
}

export function createScholarship(data) {
    return dispatch => {
        const promise = postApi('application', data);
        dispatch(createApplicationRequest());
        promise.then(
            function(payload) {
                dispatch(createApplicationSuccess(payload.data?.data));
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
                dispatch(createApplicationError(errors(error)));
            }
        );

        return promise;
    };
}

export function getApplicationError(error) {
    return {
        type: types.GET_APPLICATIONS_FAILURE,
        payload: error,
    };
}

export function getApplicationSuccess(payload) {
    return {
        type: types.GET_APPLICATIONS_SUCCESS,
        payload,
    };
}

export function getApplicationRequest() {
    return {
        type: types.GET_APPLICATIONS_REQUEST,
    };
}

export function getApplication(skip, limit) {
    return dispatch => {
        const promise = getApi(`application?skip=${skip}&limit=${limit}`);
        dispatch(getApplicationRequest());
        promise.then(
            function(payload) {
                dispatch(getApplicationSuccess(payload.data?.data));
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
                dispatch(getApplicationError(errors(error)));
            }
        );

        return promise;
    };
}
