import React from 'react';
import styled from '@emotion/styled';
import DashboardLayout from '../../HOC/DashboardLayout';
import user from '../../assets/images/user1.png';
import MyButton from '../../utils/Button';

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
function SponsorProfile() {
    return (
        <DashboardLayout title={'Profile'}>
            <Container>
                <ProfileContainer>
                    <ProfileImageWrap>
                        <ProfileImage src={user} alt={'user_profile'} />
                        <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <NameDiv>
                                <span style={{ color: '#4F4F4F' }}>
                                    Name: Courage Osemwengie{' '}
                                </span>
                            </NameDiv>
                            <NameDiv>
                                <span style={{ color: '#4F4F4F' }}>
                                    Email: courageosemwengie@gmail.com
                                </span>
                            </NameDiv>
                        </div>
                    </ProfileImageWrap>
                    <div>
                        <MyButton title="Edit Profile" />
                    </div>
                </ProfileContainer>
                <ContentWrap>
                    <div>
                        <OverviewHeader>Overview</OverviewHeader>
                    </div>
                    <div>
                        <OverviewPara>
                            My name is Diane Donor. I received a world-class
                            education, graduating from Princeton University with
                            a degree in Chemical Engineering. My education was
                            paid for by my family, which allowed me to begin my
                            career on amazing footing. After graduating, I
                            leveraged my education and passion for
                            entrepreneurship, technology, and engineering to
                            design power plants that intake municipal solid
                            wastes (trash) and convert them to liquid
                            transportation fuels, in a cost-efficient,
                            zero-emission process. These plants allow us to
                            recycle trash into fuel for cars and other types of
                            transport. I used this technology to build a
                            successful company, RecyCorp, that now operates on a
                            global scale, and has a huge impact in minimizing
                            waste and CO2 emissions, and in moving us to more
                            sustainable energy sources. All of this would not
                            have been possible without my education, and I’d
                            like to use the platform I’ve built to give back to
                            the next generation. I believe that there are many
                            students out there who are capable of driving the
                            next innovations in sustainable energy, and I’d like
                            to make sure they get that chance. As my way of
                            giving back, I’d like to create the Diane Donor
                            Sustainable Energy Scholarship, which will award
                            $50,000 / year to a student pursuing innovative
                            research in sustainable energy, recycling, or other
                            impactful environmental causes. In addition, I’d
                            like to be able to contribute funding to other
                            scholarships that have been created in the
                            sustainable energy space, and I’d like to be able to
                            clearly and easily see the impact that the
                            scholarships I’m involved with have had for
                            recipients.
                        </OverviewPara>
                    </div>
                </ContentWrap>
            </Container>
        </DashboardLayout>
    );
}

SponsorProfile.displayName = 'SSponsorProfile';
export default SponsorProfile;
