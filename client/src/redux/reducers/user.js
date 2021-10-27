import * as types from '../constants/user';
const initialState = {
    registerUser: {
        requesting: false,
        error: null,
        success: false,
    },
    loginUser: {
        requesting: false,
        error: null,
        success: false,
    },
    getUser: {
        requesting: false,
        error: null,
        success: false,
    },
    user: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.REGISTER_REQUEST:
            return Object.assign({}, state, {
                registerUser: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });
        case types.REGISTER_SUCCESS:
            return Object.assign({}, state, {
                registerUser: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                user: action.payload,
            });
        case types.REGISTER_FAILURE:
            return Object.assign({}, state, {
                registerUser: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });
        case types.LOGIN_REQUEST:
            return Object.assign({}, state, {
                loginUser: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });
        case types.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                loginUser: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                user: action.payload,
            });
        case types.LOGIN_FAILURE:
            return Object.assign({}, state, {
                loginUser: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });
        case types.GET_USER_REQUEST:
            return Object.assign({}, state, {
                getUser: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });
        case types.GET_USER_SUCCESS:
            return Object.assign({}, state, {
                getUser: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                user: action.payload,
            });
        case types.GET_USER_FAILURE:
            return Object.assign({}, state, {
                getUser: {
                    requesting: false,
                    error: action.payload,
                    success: true,
                },
            });
        default:
            return state;
    }
};
