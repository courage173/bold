import * as types from '../constants/scholarship';
const initialState = {
    createScholarship: {
        requesting: false,
        error: null,
        success: false,
    },
    getScholarships: {
        requesting: false,
        error: null,
        success: false,
    },
    singleScholarship: {
        requesting: false,
        error: null,
        success: false,
    },
    supportScholarship: {
        requesting: false,
        error: null,
        success: false,
    },
    scholarships: [],
    scholarship: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_SCHOLARSHIP_REQUEST:
            return Object.assign({}, state, {
                createScholarship: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });
        case types.CREATE_SCHOLARSHIP_SUCCESS:
            return Object.assign({}, state, {
                createScholarship: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                scholarship: action.payload,
                scholarships: [action.payload, ...state.scholarships],
            });
        case types.CREATE_SCHOLARSHIP_FAILURE:
            return Object.assign({}, state, {
                createScholarship: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });
        case types.GET_SCHOLARSHIPS_REQUEST:
            return Object.assign({}, state, {
                getScholarships: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });
        case types.GET_SCHOLARSHIPS_SUCCESS:
            return Object.assign({}, state, {
                getScholarships: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                scholarships: action.payload,
            });
        case types.GET_SCHOLARSHIPS_FAILURE:
            return Object.assign({}, state, {
                getScholarships: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });
        case types.GET_SINGLE_SCHOLARSHIP_REQUEST:
            return Object.assign({}, state, {
                singleScholarship: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });
        case types.GET_SINGLE_SCHOLARSHIP_SUCCESS:
            return Object.assign({}, state, {
                singleScholarship: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                scholarship: action.payload,
            });
        case types.GET_SINGLE_SCHOLARSHIP_FAILURE:
            return Object.assign({}, state, {
                singleScholarship: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });
        case types.SUPPORT_SCHOLARSHIP_REQUEST:
            return Object.assign({}, state, {
                supportScholarship: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });
        case types.SUPPORT_SCHOLARSHIP_SUCCESS:
            return Object.assign({}, state, {
                supportScholarship: {
                    requesting: false,
                    error: null,
                    success: true,
                },
                scholarships: state.scholarships.map(s => {
                    if (s._id === action.payload._id) {
                        return action.payload;
                    }
                    return s;
                }),
            });
        case types.SUPPORT_SCHOLARSHIP_FAILURE:
            return Object.assign({}, state, {
                supportScholarship: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });
        default:
            return state;
    }
};
