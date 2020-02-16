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
                <Navbar color="light" light expand="sm">
                    <Container>
                        <NavbarBrand href="/">MYTINERARY <i className="fas fa-globe-europe"></i></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/">
                                        Link
                                    </NavLink>
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
