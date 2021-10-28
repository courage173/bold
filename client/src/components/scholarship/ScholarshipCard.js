/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import styled from '@emotion/styled';
import MyButton from '../../utils/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleModal } from '../../redux/actions/ui';
import { getSingleScholarship } from '../../redux/actions/scholarship';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 16px rgba(9, 44, 76, 0.1);
    border-radius: 8px;
    background-color: #fff;
    margin: 20px 0;
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
function ScholarshipCard(props) {
    // eslint-disable-next-line no-console
    console.log(props.role);
    // useEffect(() => {

    // }, []);
    const handleSupport = () => {
        props.getSingleScholarship(props.data._id);
        props.toggleModal(props.supportId);
    };
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
                    {props.role === 'sponsor' ? (
                        <MyButton
                            title="support"
                            width={'5rem'}
                            height="2rem"
                            runAction={() => handleSupport()}
                        />
                    ) : (
                        <MyButton title="Apply" width={'5rem'} height="2rem" />
                    )}
                </div>
            </CardBottom>
        </Container>
    );
}

ScholarshipCard.displayName = 'ScholarshipCard';

ScholarshipCard.propTypes = {
    // user: PropTypes.object,
    toggleModal: PropTypes.func,
    data: PropTypes.object,
    supportId: PropTypes.string,
    role: PropTypes.string,
    getSingleScholarship: PropTypes.func,
};

const mapStateToProps = state => {
    return {
        user: state.user.user,
        profile: state.user.profile,
    };
};
const mapDispatchToProps = dispatch =>
    bindActionCreators({ toggleModal, getSingleScholarship }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScholarshipCard);
//#e8f0fe
//#f4faff
