import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Input, Label, Form, FormGroup } from 'reactstrap';
import { connect } from 'react-redux';



    class RegisterModal extends Component {

        state = {
            firstName,
            lastName, 
            userName, 
            password,
            email,
            country,
            img,
            hasAgreed

        }

        toggle = () => {
            //Clear errors
    
            // this.props.clearErrors();
            this.setState({
                modal: !this.state.modal
            });
        };

        onChange = (e) => {
            this.setState({[e.target.name]: e.target.value});
        };
    
        onSubmit = e => {
            e.preventDefault();
    
            const {name, email, password} = this.state;
    
            //Create user object
    
            const newUser = {
                name,
                email,
                password,
            }
    
            //Attempt to register
    
            this.props.Register(newUser);
            console.log(this.props.Register(newUser))
    
            //Close modal
            // this.toggle();
        }
    
        
    render() {
    return (
        <div>
            <Form inline onSubmit={(e)=> e.preventDefault()}>
                <FormGroup>
                    <Label for="backdrop">Backdrop value</Label>{' '}
                    <Input type="select" name="backdrop" id="backdrop" onChange={changeBackdrop}>
                    <option value="true">true</option>
                    <option value="false">false</option>
                    <option value="static">"static"</option>
                    </Input>
                </FormGroup>
                <FormGroup className="mx-2" check>
                    <Label check>
                        <Input type="checkbox" checked={keyboard} onChange={changeKeyboard} /> Keyboard
                    </Label>
                </FormGroup>
                {' '}
                <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
            </Form>
            <Modal isOpen={modal} toggle={toggle} className={className} backdrop={backdrop} keyboard={keyboard}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                    ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                    anim id est laborum.
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        error:state.error
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        // fetchCity : (city) => dispatch(fetchCity(city)),
        // fetchItineraries : (city) => dispatch(fetchItineraries(city))
        
    }
}


export default  connect (mapStatetoProps, mapDispatchtoProps) (RegisterModal);