export const API_URL =
    process.env.REACT_APP_API_URL || 'http://localhost:3003/v1/api';
export const User = {
    getAccessToken() {
        return localStorage.getItem('access_token');
    },

    setAccessToken(token) {
        localStorage.setItem('access_token', token);
    },
    setFirstName(name) {
        localStorage.setItem('firstName', name);
    },
    setLastName(name) {
        localStorage.setItem('lastName', name);
    },

    getName() {
        return localStorage.getItem('name');
    },
    getUserId() {
        return localStorage.getItem('id');
    },

    getEmail() {
        return localStorage.getItem('email');
    },

    setEmail(email) {
        localStorage.setItem('email', email);
    },

    clear() {
        localStorage.clear();
    },
    setUserId(id) {
        localStorage.setItem('id', id);
    },

    removeUserId() {
        localStorage.removeItem('id');
    },

    removeAccessToken() {
        localStorage.removeItem('token');
    },

    isLoggedIn() {
        return localStorage.getItem('access_token') ? true : false;
    },
};
