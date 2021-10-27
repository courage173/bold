import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from '../redux/actions/user';
import PropTypes from 'prop-types';

function AuthRoute(ComposedClass) {
    class AuthenticationCheck extends Component {
        componentDidMount() {
            this.props.getUser();
        }

        render() {
            return <ComposedClass {...this.props} />;
        }
    }

    AuthenticationCheck.displayName = 'AuthenticationCheck';
    AuthenticationCheck.propTypes = {
        getUser: PropTypes.func,
    };
    function mapStateToProps(state) {
        return {
            user: state.user.user,
        };
    }

    const mapDispatchToProps = dispatch =>
        bindActionCreators({ getUser }, dispatch);

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticationCheck);
}

export default AuthRoute;
