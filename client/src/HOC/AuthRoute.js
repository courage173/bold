import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { User } from '../config';
import { history } from '../redux/store';
import { getUser, getUserProfile } from '../redux/actions/user';
import { getScholarships } from '../redux/actions/scholarship';

export default function(ComposedComponent) {
    class Authentication extends Component {
        constructor(props) {
            super(props);
            this.props = props;

            this.isAuthenticated = User.isLoggedIn();
        }

        componentDidMount() {
            this.props.getUser().then(() => {
                // console.log('running');
                this.props.getUserProfile();
                this.props.getScholarships();
            });

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
        getUserProfile: PropTypes.func.isRequired,
        getScholarships: PropTypes.func.isRequired,
    };

    Authentication.displayName = 'RequireAuth';

    const mapStateToProps = state => {
        return {
            user: state.user.user,
        };
    };
    const mapDispatchToProps = dispatch =>
        bindActionCreators(
            { getUser, getUserProfile, getScholarships },
            dispatch
        );

    return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}
