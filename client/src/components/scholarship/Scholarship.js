/* eslint-disable no-unused-vars */
import React from 'react';
import styled from '@emotion/styled';
import DashboardLayout from '../../HOC/DashboardLayout';
import ScholarshipCard from './ScholarshipCard';

const Container = styled.div`
    padding: 40px;
`;
function Scholarship(props) {
    return (
        <DashboardLayout title={'Scholarships'}>
            <Container>
                <ScholarshipCard />
            </Container>
        </DashboardLayout>
    );
}

Scholarship.displayName = 'Scholarship';
export default Scholarship;
