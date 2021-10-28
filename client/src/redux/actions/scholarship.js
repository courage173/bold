import * as types from '../constants/scholarship';
import { getApi, postApi } from '../../utils/api';
import errors from '../../utils/errors';

//creating scholarship
export function createScholarshipError(error) {
    return {
        type: types.CREATE_SCHOLARSHIP_FAILURE,
        payload: error,
    };
}

export function createScholarshipSuccess(payload) {
    return {
        type: types.CREATE_SCHOLARSHIP_SUCCESS,
        payload,
    };
}

export function createScholarshipRequest() {
    return {
        type: types.CREATE_SCHOLARSHIP_REQUEST,
    };
}

export function createScholarship(data) {
    return dispatch => {
        const promise = postApi('scholarship', data);
        dispatch(createScholarshipRequest());
        promise.then(
            function(payload) {
                dispatch(createScholarshipSuccess(payload.data?.data));
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
                dispatch(createScholarshipError(errors(error)));
            }
        );

        return promise;
    };
}

//getting scholarship
export function getScholarshipsError(error) {
    return {
        type: types.GET_SCHOLARSHIPS_FAILURE,
        payload: error,
    };
}

export function getScholarshipSuccess(payload) {
    return {
        type: types.GET_SCHOLARSHIPS_SUCCESS,
        payload,
    };
}

export function getScholarshipRequest() {
    return {
        type: types.GET_SCHOLARSHIPS_REQUEST,
    };
}

export function getScholarships(skip, limit) {
    return dispatch => {
        const promise = getApi(`scholarship?skip=${skip}&limit=${limit}`);
        dispatch(getScholarshipRequest());
        promise.then(
            function(payload) {
                dispatch(getScholarshipSuccess(payload.data?.data));
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
                dispatch(getScholarshipsError(errors(error)));
            }
        );

        return promise;
    };
}

//getting scholarship
export function getSingleScholarshipError(error) {
    return {
        type: types.GET_SINGLE_SCHOLARSHIP_FAILURE,
        payload: error,
    };
}

export function getSingleScholarshipSuccess(payload) {
    return {
        type: types.GET_SINGLE_SCHOLARSHIP_SUCCESS,
        payload,
    };
}

export function getSingleScholarshipRequest() {
    return {
        type: types.GET_SINGLE_SCHOLARSHIP_REQUEST,
    };
}

export function getSingleScholarship(id) {
    return dispatch => {
        const promise = getApi(`scholarship/${id}`);
        dispatch(getSingleScholarshipRequest());
        promise.then(
            function(payload) {
                dispatch(getSingleScholarshipSuccess(payload.data?.data));
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
                dispatch(getSingleScholarshipError(errors(error)));
            }
        );

        return promise;
    };
}
