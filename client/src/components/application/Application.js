/* eslint-disable no-unused-vars */
import React from 'react';
import styled from '@emotion/styled';
import DashboardLayout from '../../HOC/DashboardLayout';
import ScholarshipCard from '../scholarship/ScholarshipCard';

const Container = styled.div`
    padding: 40px;
`;
function Application(props) {
    return (
        <DashboardLayout title={'Applications'}>
            <Container>
                {[1, 2, 3, 4].map(k => (
                    <ScholarshipCard key={k} />
                ))}
            </Container>
        </DashboardLayout>
    );
}

Application.displayName = 'Application';
export default Application;
