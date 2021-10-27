import React, { useState, useEffect } from 'react';
import { history } from '../redux/store';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import bgImage from '../assets/images/bg-img.png';
import MyButton from '../utils/Button';
import { toggleForm } from '../redux/actions/ui';
import PropTypes from 'prop-types';
import coverImg from '../assets/images/brand-image.gif';

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    @media (max-width: 768px) {
        flex-direction: column;
        height: unset;
    }
`;

const LeftSection = styled.div`
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    background-image: linear-gradient(
            to bottom,
            rgba(58, 141, 255, 0.85),
            rgba(134, 185, 255, 0.85)
        ),
        url(${bgImage});

    background-repeat: no-repeat;
    background-size: cover;
    @media (max-width: 768px) {
        width: 100%;
        height: 21rem;
    }
`;

const IntroText = styled.h2`
    color: #ffffff;
    font-size: 26px;
    line-height: 25px;
    font-weight: 400;
    font-family: Open Sans;
    text-align: center;
    @media (max-width: 768px) {
        font-size: 23px;
    }
`;

const RightSection = styled.div`
    width: 60%;
    padding: 30px;
    @media (max-width: 768px) {
        width: 100% !important;
        padding: 0;
    }
`;
const Header = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
const HeaderText = styled.h4`
    font-weight: 600;
    padding-right: 20px;
    color: #b0b0b0;
`;
const ChildrenWrap = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px;
    @media (max-width: 768px) {
        margin-top: 0;
    }
`;

const ButtonWrap = styled.div`
    @media (max-width: 768px) {
        display: none !important;
    }
`;

const ImageWrap = styled.img`
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    display: none;
`;

const AuthLayout = props => {
    const [toggle, setToggle] = useState(false);
    useEffect(() => {
        if (props.switchForm === 'brand') {
            setToggle(true);
        } else {
            setToggle(false);
        }
    });
    const handleRoute = () => {
        history.push(props.login ? '/register' : '/');
    };

    return (
        <Container>
            <LeftSection>
                <ImageWrap src={coverImg} alt="gif" />
                <IntroText>
                    BorgEdu is your connection to scholarships
                </IntroText>
                <IntroText>colleges, financial aid and more</IntroText>
            </LeftSection>
            <RightSection>
                <Header>
                    <ButtonWrap
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <HeaderText>
                            {props.login
                                ? "Don't have an account?"
                                : 'Already have an account'}
                        </HeaderText>
                        <MyButton
                            title={props.login ? 'Create account' : 'Sign in'}
                            runAction={handleRoute}
                            font={'15px'}
                        />
                    </ButtonWrap>
                </Header>
                <ChildrenWrap switch={toggle}>{props.children}</ChildrenWrap>
            </RightSection>
        </Container>
    );
};

AuthLayout.displayName = 'AuthLayout';

AuthLayout.propTypes = {
    login: PropTypes.string,
    children: PropTypes.node,
    switchForm: PropTypes.string,
};

const mapStateToProps = state => {
    return {
        switchForm: state.ui.toggleForm,
    };
};
const mapDispatchToProps = dispatch =>
    bindActionCreators({ toggleForm }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthLayout);
