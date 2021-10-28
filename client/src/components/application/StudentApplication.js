/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DashboardLayout from '../../HOC/DashboardLayout';
import ScholarshipCard from '../scholarship/ScholarshipCard';
import { getApplication } from '../../redux/actions/application';

const Container = styled.div`
    padding: 40px;
`;
function StudentApplication(props) {
    useEffect(() => {
        props.getApplication();
    }, []);
    const {
        getScholarships: { requesting },
        scholarships,
    } = props.scholarships;

    const applications = props.applications.map(application => {
        const data = application.scholarshipId;
        data.awarded = application.awarded;
        return data;
    });
    const role = props.user.role;
    return (
        <DashboardLayout title={'My Applications'}>
            <Container>
                {applications.map(scholarship => {
                    return (
                        <ScholarshipCard
                            key={scholarship._id}
                            data={scholarship}
                            role={role}
                            showView={true}
                        />
                    );
                })}
            </Container>
        </DashboardLayout>
    );
}

StudentApplication.propTypes = {
    scholarships: PropTypes.object,
    user: PropTypes.object,
    getApplication: PropTypes.func,
    applications: PropTypes.object,
};
const mapStateToProps = state => {
    return {
        scholarships: state.scholarship,
        user: state.user.user,
        applications: state.application.applications || [],
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ getApplication }, dispatch);

StudentApplication.displayName = 'Application';
export default connect(mapStateToProps, mapDispatchToProps)(StudentApplication);
