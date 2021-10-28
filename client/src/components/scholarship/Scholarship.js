/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import DashboardLayout from '../../HOC/DashboardLayout';
import ScholarshipCard from './ScholarshipCard';
import { getScholarships } from '../../redux/actions/scholarship';
import Spinner from '../../utils/Spinner';

const Container = styled.div`
    padding: 40px;
`;
function Scholarship(props) {
    useEffect(() => {
        props.getScholarships();
    }, []);
    const {
        getScholarships: { requesting },
        scholarships,
    } = props.scholarships;
    return (
        <DashboardLayout title={'Scholarships'}>
            <Container>
                {requesting ? (
                    <Spinner />
                ) : (
                    scholarships.map(scholarship => (
                        <ScholarshipCard
                            key={scholarship._id}
                            data={scholarship}
                        />
                    ))
                )}
            </Container>
        </DashboardLayout>
    );
}

Scholarship.propTypes = {
    getScholarships: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    scholarships: PropTypes.object,
};
const mapStateToProps = state => {
    return {
        scholarships: state.scholarship,
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ getScholarships }, dispatch);

Scholarship.displayName = 'Scholarship';
export default connect(mapStateToProps, mapDispatchToProps)(Scholarship);
