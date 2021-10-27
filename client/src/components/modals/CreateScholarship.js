/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import MyButton from '../../utils/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleModal } from '../../redux/actions/ui';
import PropTypes from 'prop-types';
import FormField from '../../utils/form/Form';
import { update, generateData, isFormValid } from '../../utils/form/formAction';

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
    height: 25rem;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 6px 12px rgba(8, 35, 48, 0.14);
    opacity: ${props => (props.open ? '1' : '0')};
    align-items: center;
    transition: 0.2s ease-in;
    transform: ${props => (props.open ? 'translateY(0)' : 'translateY(20px)')};
`;

const Input = styled.input`
    width: 6rem;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    height: 2rem;
    outline: none;
    padding: 3px;
    border: none;
`;
const H5 = styled.h4`
    font-size: 24px;
    line-height: 5px;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 10px;
    text-align: center;
    @media (max-width: 768px) {
        font-size: 20px;
    }
`;
const CloseBtn = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: -15px;
    color: #b0b0b0;
`;
const Button = styled.div`
    width: 15px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: red;
    color: white;
    cursor: pointer;
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
`;
function CreateScholarship(props) {
    const [point, setPoint] = useState(0);
    const modalOpen = props.modalOpen;

    const updateForm = element => {
        const formdata = userForm.formdata;
        const newFormdata = update(element, formdata, 'register');

        setUserForm({
            formError: false,
            formdata: newFormdata,
        });
    };

    const [userForm, setUserForm] = useState({
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'text',
                    label: 'Name',
                    placeholder: 'Scholarship Name',
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true,
            },
            description: {
                element: 'input',
                value: '',
                config: {
                    name: 'description_input',
                    type: 'text',
                    placeholder: 'Enter description',
                    label: 'Description',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true,
            },
            amount: {
                element: 'input',
                value: '',
                config: {
                    name: 'amount_input',
                    type: 'number',
                    placeholder: 'Enter Scholarship Amount',
                    label: 'Grant',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true,
            },
            recipientNumber: {
                element: 'input',
                value: '',
                config: {
                    name: 'recipent_input',
                    type: 'number',
                    placeholder: 'Enter Max Recipient',
                    label: 'No. of Recipent',
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

    return (
        <Container open={modalOpen} onClick={() => props.toggleModal([])}>
            <ModalContainer open={modalOpen} onClick={e => e.stopPropagation()}>
                <HeaderContainer>
                    <HeaderTitle>Create Scholarship</HeaderTitle>
                </HeaderContainer>
                <div style={{ padding: '30px' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <FormField
                            id={'name'}
                            formdata={userForm.formdata.name}
                            change={element => updateForm(element)}
                            styles={{
                                marginTop: '0 20px',
                            }}
                            FieldSetWidth="27rem"
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <FormField
                            id={'description'}
                            formdata={userForm.formdata.description}
                            change={element => updateForm(element)}
                            styles={{
                                marginTop: '0 20px',
                            }}
                            FieldSetWidth="27rem"
                        />
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
                    <div style={{ marginBottom: '10px' }}>
                        <FormField
                            id={'recipientNumber'}
                            formdata={userForm.formdata.recipientNumber}
                            change={element => updateForm(element)}
                            styles={{
                                marginTop: '0 20px',
                            }}
                            FieldSetWidth="27rem"
                        />
                    </div>
                    <div
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
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
                        <MyButton title="Submit" width="5rem" height="2rem" />
                    </div>
                </div>
            </ModalContainer>
        </Container>
    );
}

CreateScholarship.displayName = 'CreateScholarship';
CreateScholarship.propTypes = {
    modalOpen: PropTypes.bool,
    users: PropTypes.array,
    toggleModal: PropTypes.func,
    rewardLoyalty: PropTypes.func,
};
const mapStateToProps = state => {
    return {
        modalOpen: state.ui.modalOpen,
        brand: state.user.user,
        users: state.ui.users,
    };
};
const mapDispatchToProps = dispatch =>
    bindActionCreators({ toggleModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateScholarship);
