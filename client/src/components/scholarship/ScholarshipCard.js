import React from 'react';
import styled from '@emotion/styled';
import MyButton from '../../utils/Button';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 16px rgba(9, 44, 76, 0.1);
    border-radius: 8px;
    background-color: #fff;
`;
const CardTop = styled.div`
    border-bottom: 0.5px solid rgba(33, 33, 33, 0.1);
    padding: 20px;
    display: flex;
`;
const CardBottom = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
`;
const TitleSection = styled.div`
    width: 50%;
`;
const Title = styled.h1`
    margin: 0;
    font-size: 20px;
    color: #4f4f4f;
`;
const ReqSpan = styled.span`
    font-size: 15px;
    color: #4f4f4f;
    opacity: 0.5;
`;
const RightSide = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;
`;
const RightTitle = styled.h4`
    margin: 0;
    font-size: 17px;
    color: #4f4f4f;
`;
const EduWrap = styled.div`
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(244 250 255);
    font-size: 12px;
    border-radius: 7px;
    height: 18px;
`;

const CredWrap = styled.div`
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
`;
const CredSpan = styled.span`
    font-size: 14px;
`;
function ScholarshipCard() {
    return (
        <Container>
            <CardTop>
                <TitleSection>
                    <Title>You Deserve it scholarships</Title>
                    <ReqSpan>2 Requirements: Essay, 2 Documents</ReqSpan>
                </TitleSection>
                <RightSide>
                    <div style={{ textAlign: 'center' }}>
                        <RightTitle>$2000</RightTitle>
                        <ReqSpan>Multiple Awards</ReqSpan>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <RightTitle>in 3 Months</RightTitle>
                        <ReqSpan>Deadline</ReqSpan>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <RightTitle>3</RightTitle>
                        <ReqSpan>Requirements</ReqSpan>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <RightTitle>123</RightTitle>
                        <ReqSpan>Applicants</ReqSpan>
                    </div>
                </RightSide>
            </CardTop>
            <CardBottom>
                <div
                    style={{
                        display: 'flex',
                    }}
                >
                    <CredWrap>
                        <CredSpan>Credibility 55%</CredSpan>
                    </CredWrap>
                    <EduWrap>
                        <span style={{ opacity: 0.5 }}>Education</span>
                    </EduWrap>
                </div>
                <div>
                    <MyButton title="Apply" width={'5rem'} height="2rem" />
                </div>
            </CardBottom>
        </Container>
    );
}

ScholarshipCard.displayName = 'ScholarshipCard';
export default ScholarshipCard;
//#e8f0fe
//#f4faff
