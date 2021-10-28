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
    populateFields,
} from '../../utils/form/formAction';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { updateUserProfile } from '../../redux/actions/user';

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
    height: 19rem;
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
`;

function UpdateSponsorDescription(props) {
    const modalOpen = props.modalOpen === props.modalId;

    useEffect(() => {
        const user = props.user;
        const formdata = userForm.formdata;
        const newFormdata = populateFields(formdata, user);
        setUserForm({
            formError: false,
            formdata: newFormdata,
        });
    }, [props.user]);
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
            description: {
                element: 'textarea',
                value: '',
                config: {
                    name: 'description_input',
                    type: 'text',
                    label: 'Description',
                    placeholder: 'Update Description',
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: false,
            },
        },
    });

    const handleSubmit = () => {
        const form = userForm.formdata;
        const isValid = isFormValid(form);
        if (isValid) {
            const data = generateData(form);
            const role = props.user?.role;
            props
                .updateUserProfile(role, data)
                .then(() => {
                    props.toggleModal([]);
                    toast.success('update succesfully');
                })
                .catch(() => toast.success('Error Occured while updating'));
        } else {
            toast.error('form is invalid');
        }
    };

    return (
        <Container open={modalOpen} onClick={() => props.toggleModal(null)}>
            <ModalContainer open={modalOpen} onClick={e => e.stopPropagation()}>
                <HeaderContainer>
                    <HeaderTitle>Update Profile Description</HeaderTitle>
                </HeaderContainer>
                <div style={{ padding: '30px' }}>
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
                        <MyButton
                            title="Submit"
                            width="5rem"
                            height="2rem"
                            runAction={() => handleSubmit()}
                            requesting={props.requesting}
                        />
                    </div>
                </div>
            </ModalContainer>
        </Container>
    );
}

UpdateSponsorDescription.displayName = 'UpdateSponsorDescription';
UpdateSponsorDescription.propTypes = {
    modalOpen: PropTypes.string,
    toggleModal: PropTypes.func,
    updateUserProfile: PropTypes.func,
    modalId: PropTypes.string,
    user: PropTypes.object,
    requesting: PropTypes.bool,
};
const mapStateToProps = state => {
    return {
        modalOpen: state.ui.modalOpen,
        user: state.user.user,
        requesting: state.user.updateUser.requesting,
    };
};
const mapDispatchToProps = dispatch =>
    bindActionCreators({ toggleModal, updateUserProfile }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateSponsorDescription);
