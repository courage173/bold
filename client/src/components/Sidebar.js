import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import user1 from '../assets/images/user1.png';
import { withRouter } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { history } from '../redux/store';
import { BsFillAwardFill } from 'react-icons/bs';
import { IoSchool } from 'react-icons/io5';
import { GoFileSubmodule } from 'react-icons/go';
import { FaUserAlt } from 'react-icons/fa';

const Container = styled.div`
  width: 13rem;
  height: 100%;
  box-shadow: 1px 2px 3px 2px rgba(134, 185, 255, 0.85);
  z-index: 999;
  position: fixed;
  background-color: #ffffff;
  transition: 0.5s ease-in-out;
  @media (max-width: 760px) {
    /* display: ${props => (props.toggle ? 'block' : 'none')}; */
    transform: ${props =>
        props.toggle ? 'translateX(0) ' : 'translateX(-110%)'};
  }
`;

const ProfileSection = styled.div`
    height: 12rem;
    /* background-color: #3a8dff; */
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: cover;
    flex-direction: column;
    padding: 10px;
`;
const Image = styled.img`
    height: 10rem;
    width: 10rem;
    border-radius: 50%;
    object-fit: cover;
`;
const LinkWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* margin-top: 40px; */
`;
const LinkContainer = styled.a`
    padding: 20px;
    margin-top: 20px;
    cursor: pointer;
    padding: 25px 0;
    width: 100%;
    &:hover {
        background-color: #f4faff;
    }
`;
const LogoutButton = styled.div`
    margin-top: 150px;
    cursor: pointer;
    @media (max-width: 768px) {
        margin-top: 75px;
    }
`;

const LinkContent = styled.div`
    margin-left: 35px;
    display: flex;

    align-items: center;
`;

const Sidebar = props => {
    const [active, setActive] = useState('dashboard');
    const currentLink = props.location.pathname;
    useEffect(() => {
        const link = currentLink?.substring(1).split('/')[1];
        setActive(link);
    }, [currentLink]);
    const { user } = props;
    const Links = [
        {
            name: 'Scholarships',
            to: 'scholarship',
            icon: (
                <IoSchool
                    size={'30px'}
                    color={active === 'scholarship' && '#3a8dff'}
                    opacity={active === 'scholarship' ? '1' : '0.2'}
                />
            ),
        },
        {
            name: user.role === 'sponsor' ? 'My Applications' : 'Applications',
            to: 'application',
            icon: (
                <GoFileSubmodule
                    size={'30px'}
                    color={active === 'application' && '#3a8dff'}
                    opacity={active === 'application' ? '1' : '0.2'}
                />
            ),
        },
        {
            name: 'Awarded',
            to: 'award',
            student: true,
            icon: (
                <BsFillAwardFill
                    size={'25px'}
                    color={active === 'award' && '#3a8dff'}
                    opacity={active === 'award' ? '1' : '0.2'}
                />
            ),
        },
        {
            name: 'Profile',
            to: 'profile',
            icon: (
                <FaUserAlt
                    size={'25px'}
                    color={active === 'profile' && '#3a8dff'}
                    opacity={active === 'profile' ? '1' : '0.2'}
                />
            ),
        },
        { name: 'Logout', to: 'logout' },
    ];

    const handleLogout = () => {};
    const role = user.role;
    return (
        <Container toggle={props.toggle}>
            <ProfileSection>
                <Image src={user1} />
            </ProfileSection>
            <LinkWrap>
                {Links.map((link, i) => {
                    if (role === 'sponsor' && link.student) {
                        return null;
                    }

                    if (link.name === 'Logout') {
                        return (
                            <LogoutButton key={i} onClick={handleLogout}>
                                {link.name}
                            </LogoutButton>
                        );
                    }
                    return (
                        <LinkContainer
                            style={{
                                backgroundColor:
                                    active === link.to && '#f4faff',
                                // color: active === link.to && "#fff",
                            }}
                            key={i}
                            onClick={() => history.push(link.to)}
                        >
                            <LinkContent>
                                {link.icon}
                                <div
                                    style={{
                                        textDecoration: 'none',
                                        color: '#000',
                                        marginLeft: '9px',
                                        opacity: active === link.to ? 1 : 0.5,
                                    }}
                                >
                                    {link.name}
                                </div>
                            </LinkContent>
                        </LinkContainer>
                    );
                })}
            </LinkWrap>
        </Container>
    );
};

Sidebar.displayName = 'Sidebar';
Sidebar.propTypes = {
    user: PropTypes.object,
    toggle: PropTypes.bool,
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }),
};

const mapStateToProps = state => {
    return {
        switchForm: state.ui.toggleForm,
        login: state.user.login,
        user: state.user.user,
    };
};
export default connect(mapStateToProps)(withRouter(Sidebar));
