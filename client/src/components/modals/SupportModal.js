import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import MyButton from '../../utils/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleModal } from '../../redux/actions/ui';
import PropTypes from 'prop-types';
import FormField from '../../utils/form/Form';
import {
    update,
    generateData,
    isFormValid,
    resetFields,
} from '../../utils/form/formAction';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import Spinner from '../../utils/Spinner';
import { supportScholarship } from '../../redux/actions/scholarship';

import { FaUserAlt } from 'react-icons/fa';

const Container = styled.div`
    margin: 0 auto;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    top: 20%;
    z-index: 999;
    /* transition: 0.5s ease-in; */
    visibility: ${props => (props.open ? 'visible' : 'hidden')};
`;
const ModalContainer = styled.div`
    width: 40rem;
    height: fit-content;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 6px 12px rgba(8, 35, 48, 0.14);
    opacity: ${props => (props.open ? '1' : '0')};
    align-items: center;
    transition: 0.2s ease-in;
    transform: ${props => (props.open ? 'translateY(0)' : 'translateY(20px)')};
`;

const HeaderContainer = styled.div`
    background: #ffffff;
    /* box-shadow: 0px 8px 40px rgba(9, 44, 76, 0.16); */
    padding: 15px;
    border-bottom: 1px solid rgba(37, 37, 37, 0.3);
`;
const HeaderTitle = styled.h5`
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
    margin: 0;
    color: '#4f4f4f';
`;

const Header = styled.h5`
    font-size: 20px;
`;

function SupportModal(props) {
    const modalOpen = props.modalOpen === props.modalId;
    useEffect(() => {});
    const updateForm = element => {
        const formdata = userForm.formdata;
        const newFormdata = update(element, formdata);

        setUserForm({
            formError: false,
            formdata: newFormdata,
        });
    };

    const [userForm, setUserForm] = useState({
        formdata: {
            amount: {
                element: 'input',
                value: '',
                config: {
                    name: 'amount_input',
                    type: 'number',
                    placeholder: 'Enter Amount',
                    label: 'Amount',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true,
            },
        },
    });

    const handleSubmit = () => {
        const form = userForm.formdata;
        const isValid = isFormValid(form);
        if (isValid) {
            const data = generateData(form);
            props.supportScholarship(props.data._id, data).then(() => {
                toast.error('Amount sent succesfully');
                props.toggleModal([]);
            });
        } else {
            toast.error('form is invalid');
        }

        const newForm = resetFields(form);

        setUserForm({
            formdata: newForm,
        });
    };
    const firstName = props.data?.sponsorId?.firstName;
    const lastName = props.data?.sponsorId?.lastName;
    return (
        <Container open={modalOpen} onClick={() => props.toggleModal(null)}>
            <ModalContainer open={modalOpen} onClick={e => e.stopPropagation()}>
                {props.requesting ? (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                        }}
                    >
                        <Spinner />
                    </div>
                ) : (
                    <>
                        <HeaderContainer>
                            <HeaderTitle>Offer Support</HeaderTitle>
                            <span style={{ color: '#4f4f4f', opacity: 0.5 }}>
                                your support will help us to reach more students
                            </span>
                        </HeaderContainer>
                        <div style={{ padding: '30px', paddingTop: 0 }}>
                            <div style={{ paddingTop: '10px' }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div>
                                        <Header
                                            style={{
                                                margin: 0,
                                                color: '#4f4f4f',
                                            }}
                                        >
                                            {props.data.name}
                                        </Header>
                                        <div
                                            style={{
                                                paddingTop: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <FaUserAlt
                                                size={'25px'}
                                                color={'#3a8dff'}
                                                opacity={'0.5'}
                                            />
                                            <span
                                                style={{
                                                    marginLeft: '10px',
                                                    color: '#4f4f4f',
                                                }}
                                            >
                                                {firstName + ' ' + lastName}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <Header style={{ margin: 0 }}>
                                            ${props.data.amount}
                                        </Header>
                                        <span
                                            style={{
                                                marginLeft: '10px',
                                                color: '#4f4f4f',
                                                textAlign: 'center',
                                            }}
                                        >
                                            Grant
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <p
                                        style={{
                                            color: '#4f4f4f',
                                            opacity: 0.7,
                                        }}
                                    >
                                        {props.data.description}
                                    </p>
                                </div>
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <FormField
                                    id={'amount'}
                                    formdata={userForm.formdata.amount}
                                    change={element => updateForm(element)}
                                    styles={{
                                        marginTop: '0 20px',
                                    }}
                                    FieldSetWidth="27rem"
                                />
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <div style={{ marginRight: '10px' }}>
                                    <MyButton
                                        title="Cancel"
                                        width="5rem"
                                        height="2rem"
                                        bgColor="red"
                                        color="#fff"
                                        secBg="#b51919"
                                        runAction={() => props.toggleModal([])}
                                    />
                                </div>
                                <MyButton
                                    title="Submit"
                                    width="5rem"
                                    height="2rem"
                                    runAction={() => handleSubmit()}
                                />
                            </div>
                        </div>
                    </>
                )}
            </ModalContainer>
        </Container>
    );
}

SupportModal.displayName = 'SupportModal';
SupportModal.propTypes = {
    modalOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
    modalId: PropTypes.string,
    requesting: PropTypes.bool,
    data: PropTypes.object,
    supportScholarship: PropTypes.func,
};
const mapStateToProps = state => {
    return {
        modalOpen: state.ui.modalOpen,
        requesting: state.scholarship.singleScholarship?.requesting,
        data: state.scholarship?.scholarship,
    };
};
const mapDispatchToProps = dispatch =>
    bindActionCreators({ toggleModal, supportScholarship }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SupportModal);
