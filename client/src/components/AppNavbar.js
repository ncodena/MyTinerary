import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container,
    NavLink,
}from 'reactstrap' ;
import RegisterModal from '../views/RegisterModal';
import LoginModal from '../views/LoginModal';
import Logout from './Logout';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import "../style/Landing.css"

class AppNavbar extends Component {

    state = {
        isOpen: false
    }


    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })

    }
    render() {
        return (
            <div>
                <Navbar className="navCol" light expand="sm">
                    <Container>
                        <NavbarBrand href="/">MYTINERARY{' '}<LoyaltyIcon/></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                   <RegisterModal/>
                                </NavItem>
                                <NavItem>
                                   <LoginModal/>
                                </NavItem>
                                <NavItem>
                                   <Logout/>
                                </NavItem>
                            </Nav>
                        </Collapse>

                    </Container>

                </Navbar>
            
                
            </div>
        )
    }
}

export default AppNavbar; 
