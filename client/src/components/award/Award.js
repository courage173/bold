/* eslint-disable no-unused-vars */
import React from 'react';
import styled from '@emotion/styled';
import DashboardLayout from '../../HOC/DashboardLayout';
import ScholarshipCard from '../scholarship/ScholarshipCard';

const Container = styled.div`
    padding: 40px;
`;
function Award(props) {
    return (
        <DashboardLayout title={'Submitted'}>
            <Container>
                {[1, 2, 3, 4].map(k => (
                    <ScholarshipCard key={k} />
                ))}
            </Container>
        </DashboardLayout>
    );
}

Award.displayName = 'Award';
export default Award;
