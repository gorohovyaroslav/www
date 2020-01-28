import React from 'react';
import styled from "styled-components";
import Text from '../text';
import Input from '../input';
import Button from '../button';

const StyledForm = styled.div`
    box-shadow: 3px 3px 24px #00000014;
    padding: 40px;
    background-color: #ffffff;
    width: auto;
    box-sizing: border-box;
    margin: auto;
    margin-top: 30px;
    display: table;

    .formHeader{
        color:#161922;
        font-size:24px;
        padding-bottom: 25px;
        font-weight:600;
    }

    .inputsWrapper{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
    }

    .formInput{
        width: 100%;  
        margin: 0;
        margin-bottom: 25px;

        &.textArea .main-input{
            max-width: 100%;
            min-width: 100%;
            height:160px;
        }
    }

    .main-input{
        border-color: #CECECE;
    }

    .errorBlock{
        border: 1px solid #CECECE;
        z-index: 1;

        &:before{
            content: none;
        }
    }
`;

/**
* Enum for employee activation status.
* @readonly
*/
const ErrorStatus = Object.freeze({
    NoError: 0,
    Empty: 1,
    Incorrect: 2
});

class Form extends React.Component {
    constructor(props){
        super(props);

        this.state={
            name: { value: "", status: ErrorStatus.NoError, inputClassName: "" },

            email: { value: "", status: ErrorStatus.NoError, inputClassName: "" },

            comment: { value: "", status: ErrorStatus.NoError, inputClassName: "" }
        };

        this.nameErrorText = "";
        this.emailErrorText = "";
        this.commentErrorText = "";

        this.regexpEmail = new RegExp('^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$', 'i')
        
    }

    request = () => {
        if(this.verifyData()){
            console.log("form valid: ")
            console.log("name: " + this.state.name.value)
            console.log("email: " + this.state.email.value)
            console.log("comment: " + this.state.comment.value)
        } else {
            console.log("form invalid")
        }
    };

    isEmpty = (value) => {
        return !value || !value.length;
    }

    isEmailInvalid = (value) => {
        return !value.match(this.regexpEmail)
    }

    validate = (inputName, value) => {
        switch(inputName) {
            case "name":
                return this.isEmpty(value) ? ErrorStatus.Empty :  ErrorStatus.NoError;
            case "email":
                if(this.isEmpty(value)) 
                    return ErrorStatus.Empty;
                else if(this.isEmailInvalid(value)) 
                    return ErrorStatus.Incorrect;
                else 
                    return ErrorStatus.NoError;
            default: 
                return ErrorStatus.NoError;
        }
    }

    verifyData = () => {

        const nameStatus = this.validate("name", this.state.name.value);
        this.setError("name", nameStatus);
        this.updateInputClassName("name", nameStatus);
        this.updateErrorText("name", nameStatus);
        
        const emailStatus = this.validate("email", this.state.email.value);
        this.setError("email", emailStatus);
        this.updateInputClassName("email", emailStatus);
        this.updateErrorText("email", emailStatus);

        let formValid = nameStatus === ErrorStatus.NoError && 
                        emailStatus === ErrorStatus.NoError;

        return formValid;
    }

    updateInputClassName = (inputName, status) => {
        if(status === ErrorStatus.Empty) {
            this.setFocusInput(inputName, "error");

        } else if (status === ErrorStatus.Incorrect) {
            this.setFocusInput(inputName, "focus error");

        } else if (this.state[inputName].value){
            this.setFocusInput(inputName, "focus");

        } else {
            this.setFocusInput(inputName, "");

        }
    }

    updateErrorText = (inputName, status) => {
        
        switch(status) {
            case ErrorStatus.Empty:
                this.setErrorText(inputName, "is empty");
                break
            case ErrorStatus.Incorrect:
                this.setErrorText(inputName, "is incorrect");
                break
            default: 
                break
        }
    }

    setInputData = (inputName, value) => {
        const field = this.state[inputName];

        if(!field) throw "Unknown name";

        this.setState(
            {
                [inputName]: {...field, value: value}
            }
        );
    }

    setError = (inputName, newStatus) => {
        const field = this.state[inputName];

        if(!field) throw "Unknown name";

        if(field.status !== newStatus) {
            this.setState(
                {
                    [inputName]: {...field, status: newStatus}
                }
            )
        }
    }

    setFocusInput = (inputName, className) => {
        const field = this.state[inputName];

        if(!field) throw "Unknown name";

        this.setState({
            [inputName]: {...field, inputClassName: className}
        })
    }

    setErrorText = (inputName, error) => {
        switch (inputName){
            case "name":
                this.nameErrorText = `name ${error}`;
                break
            case "email":
                this.emailErrorText = `email ${error}`
                break
            case "comment":
                this.commentErrorText = `comment ${error}`
                break
            default:
                break
        }
    }

    onChangeInput = (e) => {
        this.setInputData(e.target.name, e.target.value);
    }

    onBlurInput = (e) => {
        const status = this.validate(e.target.name, e.target.value);
        this.setError(e.target.name, status);
        this.updateInputClassName(e.target.name, status);
        this.updateErrorText(e.target.name, status);
    }
    
    onFocusInput = (e) => {
        this.setError(e.target.name, ErrorStatus.NoError);
        this.setFocusInput(e.target.name, "focus")
    };
    
    onKeyPress = (event) => {
        if (event.key === "Enter") {
            this.request();
        }
    };

    onClick = () => {
        this.request();
    }

    /*getCouponRequest = async (data) => {

        const response = await fetch('http://192.168.3.164:8086/WeatherForecast')
        const myJson = await response.json();
        console.log(myJson);
        console.log(data);
        alert("request send");
    }*/

    render(){

        return(       
            <StyledForm>
                <Text as="h2" className="formHeader">
                    To become an AVS4YOU reseller, please, use the form below:
                </Text>
                <div className="inputsWrapper">
                    <Input  
                        tabIndex="0"

                        inputName="name"
                        inputLabel="Name"

                        value={this.state.name.value}
                        inputClassName={this.state.name.inputClassName}
                        errorText={this.nameErrorText}
                        onKeyPress={this.onKeyPress}
                        onChange={this.onChangeInput}
                        onBlur={this.onBlurInput}
                        onFocus={this.onFocusInput}

                        className="formInput"
                        required={true}
                        
                    />
                     <Input 
                        tabIndex="1"
                        
                        inputName="email"
                        inputLabel="Email address"

                        value={this.state.email.value}
                        inputClassName={this.state.email.inputClassName}
                        errorText={this.emailErrorText}
                        onKeyPress={this.onKeyPress}
                        onChange={this.onChangeInput}
                        onBlur={this.onBlurInput}
                        onFocus={this.onFocusInput}
                        
                        className="formInput"
                        required={true}
                        
                    />

                </div>
                <Input 
                    as="textarea"
                    tabIndex="2"
                    
                    inputName="comment"
                    inputLabel="Give us a brief description of your specific needs"

                    value={this.state.comment.value}
                    inputClassName={this.state.comment.inputClassName}
                    errorText={this.commentErrorText}
                    onKeyPress={this.onKeyPress}
                    onChange={this.onChangeInput}
                    onBlur={this.onBlurInput}
                    onFocus={this.onFocusInput}

                    className="formInput textArea"
                />

                <Button 
                    tabIndex="1"
                    className="getCouponButton" 
                    onClick={this.onClick}
                    backgroundColor="blue" 
                    padding="13px 24px"
                    fontSize={14} 
                    textTransform="uppercase"
                    >
                    Send your request
                </Button>
            </StyledForm>
        )
    }
}

export default Form;