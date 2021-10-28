/* eslint-disable no-unused-vars */
import React from 'react';
import styled from '@emotion/styled';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DashboardLayout from '../../HOC/DashboardLayout';
import ScholarshipCard from '../scholarship/ScholarshipCard';

const Container = styled.div`
    padding: 40px;
`;
function Application(props) {
    const {
        getScholarships: { requesting },
        scholarships,
    } = props.scholarships;
    const userId = props.user._id;
    const role = props.user.role;
    return (
        <DashboardLayout title={'My Applications'}>
            <Container>
                {scholarships.map(scholarship => {
                    if (userId === scholarship.sponsorId) {
                        return (
                            <ScholarshipCard
                                key={scholarship._id}
                                data={scholarship}
                                role={role}
                                showView={true}
                            />
                        );
                    } else {
                        return null;
                    }
                })}
            </Container>
        </DashboardLayout>
    );
}

Application.propTypes = {
    scholarships: PropTypes.object,
    user: PropTypes.object,
};
const mapStateToProps = state => {
    return {
        scholarships: state.scholarship,
        user: state.user.user,
        applications: state.applications,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

Application.displayName = 'Application';
export default connect(mapStateToProps, mapDispatchToProps)(Application);
