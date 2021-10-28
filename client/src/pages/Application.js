import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Application from '../components/application/Application';
import StudentApplication from '../components/application/StudentApplication';

const ApplicationPage = props => {
    const role = props.user.role;
    return role === 'student' ? <StudentApplication /> : <Application />;
};

ApplicationPage.propTypes = {
    user: PropTypes.object,
};
const mapStateToProps = state => {
    return {
        user: state.user.user,
    };
};

ApplicationPage.displayName = 'ApplicationPage';
export default connect(mapStateToProps)(ApplicationPage);
