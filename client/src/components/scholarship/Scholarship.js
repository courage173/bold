/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import DashboardLayout from '../../HOC/DashboardLayout';
import ScholarshipCard from './ScholarshipCard';
import { getScholarships } from '../../redux/actions/scholarship';
import Spinner from '../../utils/Spinner';
import { v4 as uuidv4 } from 'uuid';

const Container = styled.div`
    padding: 40px;
`;
function Scholarship(props) {
    useEffect(() => {
        props.getScholarships();
    }, []);
    const [modalId] = useState(uuidv4());
    const {
        getScholarships: { requesting },
        scholarships,
    } = props.scholarships;
    const role = props.user.role;
    return (
        <DashboardLayout title={'Scholarships'} supportId={modalId}>
            <Container>
                {requesting ? (
                    <Spinner />
                ) : (
                    scholarships.map(scholarship => (
                        <ScholarshipCard
                            key={scholarship._id}
                            data={scholarship}
                            role={role}
                            supportId={modalId}
                        />
                    ))
                )}
            </Container>
        </DashboardLayout>
    );
}

Scholarship.propTypes = {
    getScholarships: PropTypes.func,
    scholarships: PropTypes.object,
    user: PropTypes.object,
};
const mapStateToProps = state => {
    return {
        scholarships: state.scholarship,
        user: state.user.user,
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ getScholarships }, dispatch);

Scholarship.displayName = 'Scholarship';
export default connect(mapStateToProps, mapDispatchToProps)(Scholarship);
