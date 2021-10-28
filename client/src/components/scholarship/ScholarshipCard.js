/* eslint-disable no-unused-vars */
import React from 'react';
import { bindActionCreators } from 'redux';
import styled from '@emotion/styled';
import MyButton from '../../utils/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleModal } from '../../redux/actions/ui';
import { getSingleScholarship } from '../../redux/actions/scholarship';
import { randomNumberGenerator, getCredibilityColor } from '../../utils/helper';
import moment from 'moment';

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
    const handleSupport = () => {
        props.getSingleScholarship(props.data._id);
        props.toggleModal(props.supportId);
    };
    const percentageCred = randomNumberGenerator();
    const credColor = getCredibilityColor(percentageCred);
    return (
        <Container>
            <CardTop>
                <TitleSection>
                    <Title>{props.data.name}</Title>
                    <ReqSpan>2 Requirements: Essay, 2 Documents</ReqSpan>
                </TitleSection>
                <RightSide>
                    <div style={{ textAlign: 'center' }}>
                        <RightTitle>${props.data.amount}</RightTitle>
                        <ReqSpan>Multiple Awards</ReqSpan>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <RightTitle>
                            {moment(props.data.expiryDate).fromNow()}
                        </RightTitle>
                        <ReqSpan>Deadline</ReqSpan>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <RightTitle>{props.data.recipientNumber}</RightTitle>
                        <ReqSpan>Recipients</ReqSpan>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <RightTitle>{props.data.count}</RightTitle>
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
                    <CredWrap
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <div
                            style={{
                                height: '10px',
                                width: '10px',
                                backgroundColor: credColor,
                                borderRadius: '50%',
                                marginRight: 2,
                            }}
                        ></div>
                        <CredSpan>Credibility {percentageCred}%</CredSpan>
                    </CredWrap>
                    <EduWrap>
                        <span style={{ opacity: 0.5 }}>
                            {props.data.category
                                ? props.data.category
                                : 'general'}
                        </span>
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
