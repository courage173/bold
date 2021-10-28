import React, { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { bindActionCreators } from 'redux';
import styled from '@emotion/styled';
import DashboardLayout from '../../HOC/DashboardLayout';
import user from '../../assets/images/user1.png';
import MyButton from '../../utils/Button';
import PropTypes from 'prop-types';
import { toggleModal } from '../../redux/actions/ui';

const Container = styled.div`
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ProfileContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    box-shadow: 0px 8px 24px #dadada;
    width: 80%;
    margin-bottom: 20px;
    padding: 20px;
`;
const ProfileImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
`;
const ProfileImageWrap = styled.div`
    display: flex;
    align-items: center;
`;
const ContentWrap = styled.div`
    background: #ffffff;
    box-shadow: 0px 8px 24px #dadada;
    width: 80%;
    padding: 20px;
`;
const NameDiv = styled.span`
    margin: 5px;
`;
const OverviewHeader = styled.h4`
    font-size: 18px;
    line-height: 22px;
    color: #4f4f4f;
`;
const OverviewPara = styled.p`
    font-size: 16px;
    line-height: 20px;
    color: #4f4f4f;
`;
function SponsorProfile(props) {
    const [modalId] = useState(uuidv4());
    const [sponsorDescriptionModalId] = useState(uuidv4());
    return (
        <DashboardLayout
            title={'Profile'}
            editSponsorModalId={modalId}
            sponsorDescriptionModalId={sponsorDescriptionModalId}
        >
            <Container>
                <ProfileContainer>
                    <ProfileImageWrap>
                        <ProfileImage src={user} alt={'user_profile'} />
                        <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <NameDiv>
                                <span style={{ color: '#4F4F4F' }}>
                                    Name:{' '}
                                    {props.user.firstName +
                                        ' ' +
                                        props.user.lastName}
                                </span>
                            </NameDiv>
                            <NameDiv>
                                <span style={{ color: '#4F4F4F' }}>
                                    Email: {props.user.email}
                                </span>
                            </NameDiv>
                        </div>
                    </ProfileImageWrap>
                    <div>
                        <MyButton
                            title="Edit Profile"
                            runAction={() => props.toggleModal(modalId)}
                        />
                    </div>
                </ProfileContainer>
                <ContentWrap>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <OverviewHeader>Overview</OverviewHeader>
                        <MyButton
                            title="Update"
                            runAction={() =>
                                props.toggleModal(sponsorDescriptionModalId)
                            }
                            width="5rem"
                            height="2rem"
                        />
                    </div>
                    <div>
                        {props.profile._id ? (
                            <OverviewPara>
                                {props.profile.description}
                            </OverviewPara>
                        ) : (
                            <OverviewPara>
                                Please Update your profile
                            </OverviewPara>
                        )}
                    </div>
                </ContentWrap>
            </Container>
        </DashboardLayout>
    );
}

SponsorProfile.displayName = 'SSponsorProfile';
SponsorProfile.propTypes = {
    user: PropTypes.object,
    toggleModal: PropTypes.func,
    profile: PropTypes.object,
};

const mapStateToProps = state => {
    return {
        user: state.user.user,
        profile: state.user.profile,
    };
};
const mapDispatchToProps = dispatch =>
    bindActionCreators({ toggleModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SponsorProfile);
