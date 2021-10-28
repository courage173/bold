import * as types from '../constants/application';
const initialState = {
    createApplication: {
        requesting: false,
        error: null,
        success: false,
    },
    getApplication: {
        requesting: false,
        error: null,
        success: false,
    },
    applications: [],
    application: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_APPLICATION_REQUEST:
            return Object.assign({}, state, {
                createScholarship: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });

        case types.CREATE_APPLICATION_SUCCESS:
            return Object.assign({}, state, {
                createScholarship: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                application: action.payload,
            });
        case types.CREATE_APPLICATION_FAILURE:
            return Object.assign({}, state, {
                createScholarship: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });
        case types.GET_APPLICATIONS_REQUEST:
            return Object.assign({}, state, {
                getApplication: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });

        case types.GET_APPLICATIONS_SUCCESS:
            return Object.assign({}, state, {
                getApplication: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                applications: action.payload,
            });
        case types.GET_APPLICATIONS_FAILURE:
            return Object.assign({}, state, {
                getApplication: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });
        default:
            return state;
    }
};
