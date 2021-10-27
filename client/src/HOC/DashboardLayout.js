/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { bindActionCreators } from 'redux';
import Sidebar from '../components/Sidebar';
import Backdrop from '../utils/Backdrop';
import { connect } from 'react-redux';
import CreateScholarship from '../components/modals/CreateScholarship';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import MyButton from '../utils/Button';
import { toggleModal } from '../redux/actions/ui';

const Container = styled.div`
    width: 100%;
    display: flex;
    height: 100%;
`;

const Header = styled.div`
    position: fixed;
    width: 100%;
    height: 61px;
    top: 40px;
    display: flex;
    background: #ffffff;
    z-index: 99;

    box-shadow: 0px 4px 4px rgba(93, 130, 31, 0.3);
    @media (max-width: 768px) {
        top: 0;
        width: 100%;
        margin-left: 0;
        padding-left: 0;
    }
`;
const HeadTextWrap = styled.div`
    position: relative;
    margin-right: 40px;
    margin-left: 50px;
    display: flex;
    align-items: center;
    &:after {
        content: '';
        position: absolute;
        width: 150%;
        bottom: 0;
        left: -15px;
        border-bottom: 4px solid #3a8dff;
    }
`;
const H4 = styled.h4`
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    margin: 0;
    display: flex;
    align-items: center;
    color: #252525;
    @media (max-width: 768px) {
        display: none;
    }
`;
const HeadText = styled.div`
    margin-left: 90px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 95%;
`;
const ChildrenWrap = styled.div`
    margin-top: 120px;
    margin-left: 13rem;
    @media (max-width: 768px) {
        margin-top: 50px;
        margin-left: 0;
    }
`;

const MenuBars = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    width: 30px;
    padding-left: 20px;
    @media (min-width: 768px) {
        display: none;
    }
    @media (max-width: 768px) {
        display: flex;
    }
`;
const MenuBar = styled.div`
    width: 20px;
    border-bottom: 1px solid;
    padding: 3px;
`;

const DashboardLayout = props => {
    const [toggleSideBar, setToggle] = useState(false);
    return (
        <Container>
            <CreateScholarship />
            {toggleSideBar ? (
                <Backdrop runAction={() => setToggle(false)} />
            ) : null}
            <Sidebar toggle={toggleSideBar} />
            <div
                style={{
                    width: '100%',
                }}
            >
                <Header>
                    <div
                        style={{
                            display: 'flex',
                            padding: '0 13rem',
                            width: '100%',
                            justifyContent: 'space-between',
                            paddingRight: '3rem',
                        }}
                    >
                        <MenuBars onClick={() => setToggle(!toggleSideBar)}>
                            <MenuBar></MenuBar>
                            <MenuBar></MenuBar>
                            <MenuBar></MenuBar>
                        </MenuBars>

                        <HeadTextWrap>
                            <H4> {props.title}</H4>
                        </HeadTextWrap>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <MyButton
                                title={'Create Scholarship'}
                                runAction={() => props.toggleModal([])}
                            />
                        </div>
                    </div>
                </Header>
                <Fade>
                    <ChildrenWrap>{props.children}</ChildrenWrap>
                </Fade>
            </div>
        </Container>
    );
};

DashboardLayout.displayName = 'DashboardLayout';
DashboardLayout.propTypes = {
    children: PropTypes.node,
    toggleModal: PropTypes.func,
    title: PropTypes.string,
};
const mapStateToProps = state => {
    return {
        user: state.user.user,
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ toggleModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout);
