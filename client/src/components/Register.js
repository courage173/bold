import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AuthLayout from '../HOC/AuthLayout';
import FormField from '../utils/form/Form';
import { update, generateData, isFormValid } from '../utils/form/formAction';
import styled from '@emotion/styled';
import MyButton from '../utils/Button';
import { registerUser } from '../redux/actions/user';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const Container = styled.div`
    padding: 30px;
    box-shadow: 0 16px 24px rgb(8 35 48 / 8%), 0 6px 12px rgb(8 35 48 / 14%);
    border-radius: 8px;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 30rem;
    @media (max-width: 768px) {
        box-shadow: none;
        padding: 0;
        background: #f5f5f5;
    }
`;
const HeadText = styled.h4`
    font-size: 35px;
    font-weight: 600;
    color: rgba(64, 81, 91, 0.8);
    margin-bottom: 0;
    margin-top: 10px;
    @media (max-width: 768px) {
        font-size: 30px;
    }
`;
const Span = styled.span`
    font-weight: 400;
    padding-right: 20px;
    color: #b0b0b0;
`;

const TopSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 27rem;
    @media (max-width: 768px) {
        width: auto;
    }
`;
const FormContainer = styled.div`
    margin: 15px 0px;
`;
const CheckBoxContainer = styled.div`
    width: 27rem;
    @media (max-width: 768px) {
        width: auto;
    }
`;

const AccountWrap = styled.div`
    width: 22rem;
    @media (min-width: 768px) {
        display: none;
    }
    @media (max-width: 768px) {
        margin: 20px 0;
        display: flex;
        justify-content: center;
    }
`;
const ButtonContainer = styled.div`
    margin-top: 10px;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const Register = props => {
    const [userForm, setUserForm] = useState({
        formdata: {
            email: {
                element: 'fieldset',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    label: 'Email',
                    placeholder: 'Enter your email',
                },
                validation: {
                    required: true,
                    email: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true,
            },
            firstName: {
                element: 'fieldset',
                value: '',
                config: {
                    name: 'firstName',
                    type: 'text',
                    label: 'First Name',
                    placeholder: 'Enter your name',
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
            lastName: {
                element: 'fieldset',
                value: '',
                config: {
                    name: 'lastName',
                    type: 'text',
                    label: 'Last Name',
                    placeholder: 'Enter your name',
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
            password: {
                element: 'fieldset',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password',
                    label: 'Password',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true,
            },
            confirmPassword: {
                element: 'fieldset',
                value: '',
                config: {
                    name: 'confirm_password_input',
                    type: 'password',
                    placeholder: 'Confirm your password',
                    label: 'Confirm Password',
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
    const switchForm = props.switchForm === 'brand';

    const updateForm = element => {
        const formdata = userForm.formdata;
        const newFormdata = update(element, formdata, 'register');

        setUserForm({
            formError: false,
            formdata: newFormdata,
        });
    };
    const handleSubmit = () => {
        const form = userForm.formdata;
        const isValid = isFormValid(form);
        if (isValid) {
            const data = generateData(form);
            if (switchForm) {
                data.role = 'brand';
            } else {
                data.role = 'user';
            }
            props.registerUser(data);
        } else {
            toast.error('form is not valid or missing some fields');
        }
    };

    const renderUserForm = () => (
        <>
            <FormContainer>
                <FormField
                    id={'firstName'}
                    formdata={userForm.formdata.firstName}
                    change={element => updateForm(element)}
                    styles={{
                        marginTop: '0 20px',
                    }}
                    FieldSetWidth="27rem"
                />
            </FormContainer>

            <FormContainer>
                <FormField
                    id={'lastName'}
                    formdata={userForm.formdata.lastName}
                    change={element => updateForm(element)}
                    styles={{
                        marginTop: '0 20px',
                    }}
                    FieldSetWidth="27rem"
                />
            </FormContainer>
            <FormContainer>
                <FormField
                    id={'email'}
                    formdata={userForm.formdata.email}
                    change={element => updateForm(element)}
                    styles={{
                        marginTop: '0 20px',
                    }}
                    FieldSetWidth="27rem"
                />
            </FormContainer>
            <FormContainer>
                <FormField
                    id={'password'}
                    formdata={userForm.formdata.password}
                    change={element => updateForm(element)}
                    styles={{
                        marginTop: '0 20px',
                    }}
                    FieldSetWidth="27rem"
                />
            </FormContainer>
            <FormContainer>
                <FormField
                    id={'confirmPassword'}
                    formdata={userForm.formdata.confirmPassword}
                    change={element => updateForm(element)}
                    styles={{
                        marginTop: '0 20px',
                    }}
                    FieldSetWidth="27rem"
                />
            </FormContainer>
            <CheckBoxContainer>
                <div>
                    <input type="checkbox" checked={false} />
                    <span>Join as Sponsor</span>
                </div>
            </CheckBoxContainer>
        </>
    );
    return (
        <AuthLayout>
            <Container>
                <TopSection>
                    <HeadText>Create an account</HeadText>
                </TopSection>
                {renderUserForm()}
                <ButtonContainer>
                    <MyButton
                        title="Sign up"
                        bgColor={'#3a8dff'}
                        color="#fff"
                        secBg
                        runAction={handleSubmit}
                        mobileWidth={'19rem'}
                        font={'17px'}
                        width={'27rem'}
                    />
                    <AccountWrap>
                        <Span>Already have an account?</Span>
                        <Span>
                            <Link
                                style={{
                                    textDecoration: 'none',
                                    color: '#3a8dff',
                                }}
                                to="/login"
                            >
                                Sign in
                            </Link>
                        </Span>
                    </AccountWrap>
                </ButtonContainer>
            </Container>
        </AuthLayout>
    );
};

Register.displayName = 'Register';
Register.propTypes = {
    switchForm: PropTypes.string,
    registerUser: PropTypes.func,
};
const mapStateToProps = state => {
    return {
        switchForm: state.ui.toggleForm,
    };
};
const mapDispatchToProps = dispatch =>
    bindActionCreators({ registerUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);
