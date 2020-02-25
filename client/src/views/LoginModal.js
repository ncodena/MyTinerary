import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Input, Form, FormGroup, NavLink, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import {login} from '../actions/authAction';
import {clearErrors} from '../actions/errorAction';

    class LoginModal extends Component {

        state = {
            modal: false,
            password: '',
            email: '',
            msg: null, 
        };

        componentDidUpdate(prevProps) {

            const {error, isAuthenticated} = this.props;

            if(error !== prevProps.error) {
                if(error.id ==='LOGIN_FAIL'){
                    this.setState({ msg:error.msg.msg });

                } else {
                    this.setState({msg: null})
                }
            }

            //If authenticated, close modal

            if(this.state.modal){

                if(isAuthenticated){
                    this.toggle();

                }

            }

        }

        toggle = () => {

            // Clear errors
            this.props.clearErrors();

            this.setState({
                modal: !this.state.modal
            });
        };

        onChange = (e) => {
            this.setState({[e.target.name]: e.target.value});
        };
    
        onSubmit = e => {
            e.preventDefault();

            const {email, password} = this.state;

            const user = {
                email,
                password
            }
            
            // Attempt to login

            this.props.login(user);
            
        }
    
        
    render() {
    return (
        <div>
            <NavLink onClick={this.toggle} href="#">Login</NavLink>
            <Modal isOpen={this.state.modal} toggle={(e) => this.onSubmit(e)}>
                <ModalHeader color="info" toggle={this.toggle}>Login</ModalHeader>
                <ModalBody>

                    {this.state.msg ? (
                        <Alert color="danger">{this.state.msg}</Alert>
                        ) : null}

                    <Form onSubmit={this.onSubmit}>  
                        <FormGroup>
                            <Input className="mb-3" type="text" name="email" id="email" placeholder="E-mail address" onChange={this.onChange}/>                            
                            <Input className="mb-3" type="text" name="password" id="password" placeholder="Password" onChange={this.onChange}/>
                        </FormGroup>

                        <Button size="lg" block color="info">Login</Button>

                    </Form>   
                </ModalBody> 
            </Modal>
        </div>
    )}
}

const mapStatetoProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        error:state.error
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        login : (user) => dispatch(login(user)),
        clearErrors: () => dispatch(clearErrors())
        
    }
}


export default  connect (mapStatetoProps, mapDispatchtoProps) (LoginModal);