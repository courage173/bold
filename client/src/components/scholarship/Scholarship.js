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
                {[1, 2, 3, 4].map(k => (
                    <ScholarshipCard key={k} />
                ))}
            </Container>
        </DashboardLayout>
    );
}

Scholarship.displayName = 'Scholarship';
export default Scholarship;
