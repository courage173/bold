import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const FieldSet = styled.fieldset`
    box-sizing: border-box;
    border-radius: 4px;
    height: 3rem;
    padding: 0 5px;
    width: ${props => (props.width ? props.width : '22rem')};
    border: 1.8px solid #b0b0b0;
    @media (max-width: 768px) {
        width: 19rem;
    }
`;
const Legend = styled.legend`
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
`;
const Input = styled.input`
    box-shadow: #fff 0px 0px 0px 9999px inset;
    width: 100%;
    height: 2rem;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    margin-top: -3px;
    font-size: 16px;
    @media (max-width: 768px) {
        box-shadow: #f5f5f5 0px 0px 0px 9999px inset;
    }
`;
const DefaultInput = styled.input`
    box-shadow: #fff 0px 0px 0px 9999px inset;
    width: 100%;
    height: 2rem;
    margin: 0;
    padding: 0;
    padding-left: 5px;
    border: 1.8px solid #b0b0b0;
    outline: none;
    margin-top: -3px;
    font-size: 16px;
    margin-top: 5px;
    @media (max-width: 768px) {
        box-shadow: #f5f5f5 0px 0px 0px 9999px inset;
    }
`;
const Error = styled.div`
    color: red;
    font-size: 12px;
    margin-top: 4px;
`;
function FormField({ formdata, change, id, FieldSetWidth }) {
    const showError = () => {
        let errorMessage = null;

        if (formdata.validation && !formdata.valid) {
            errorMessage = <Error>{formdata.validationMessage}</Error>;
        }

        return errorMessage;
    };

    const renderForm = () => {
        let template = null;
        switch (formdata.element) {
            case 'fieldset':
                template = (
                    <div>
                        <FieldSet width={FieldSetWidth}>
                            <Legend>{formdata.config.label}</Legend>
                            <Input
                                {...formdata.config}
                                value={formdata.value}
                                onBlur={event =>
                                    change({ event, id, blur: true })
                                }
                                onChange={event => change({ event, id })}
                                id={id}
                            />
                            {showError()}
                        </FieldSet>
                    </div>
                );
                break;
            case 'input':
                template = (
                    <div>
                        <Legend>{formdata.config.label}</Legend>
                        <DefaultInput
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={event => change({ event, id, blur: true })}
                            onChange={event => change({ event, id })}
                            id={id}
                        />
                        {showError()}
                    </div>
                );
                break;
            default:
                template = '';
                break;
        }
        return template;
    };

    return <>{renderForm()}</>;
}

FormField.displayName = 'FormField';

FormField.propTypes = {
    formdata: PropTypes.shape({
        config: PropTypes.object,
        validation: PropTypes.object,
        valid: PropTypes.bool,
        validationMessage: PropTypes.string,
        element: PropTypes.string,
        value: PropTypes.string,
        showlabel: PropTypes.bool,
    }),
    change: PropTypes.func,
    id: PropTypes.string,
    altStyle: PropTypes.object,
    styles: PropTypes.object,
    inputClass: PropTypes.string,
    altFieldSet: PropTypes.string,
    FieldSetWidth: PropTypes.string,
};
export default FormField;
