import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { User } from '../config';
import { history } from '../redux/store';
import { getUser } from '../redux/actions/user';

export default function(ComposedComponent) {
    class Authentication extends Component {
        constructor(props) {
            super(props);
            this.props = props;

            this.isAuthenticated = User.isLoggedIn();
        }

        componentDidMount() {
            this.props.getUser();

            if (!this.isAuthenticated) {
                history.push('/login', {
                    continue: this.props.location.pathname,
                });
            }
        }

        componentDidUpdate() {
            if (!this.isAuthenticated) {
                history.push('/login', {
                    continue: this.props.location.pathname,
                });
            }
        }

        PropTypes = {
            router: PropTypes.object,
        };

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    Authentication.propTypes = {
        location: PropTypes.object,
        getUser: PropTypes.func.isRequired,
    };

    Authentication.displayName = 'RequireAuth';

    const mapStateToProps = state => {
        return {
            user: state.user.user,
        };
    };
    const mapDispatchToProps = dispatch =>
        bindActionCreators({ getUser }, dispatch);

    return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}
