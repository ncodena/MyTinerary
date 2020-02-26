import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container,
}from 'reactstrap' ;
import {connect} from 'react-redux';
import RegisterModal from '../views/RegisterModal';
import LoginModal from '../views/LoginModal';
import Logout from './Logout';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import "../style/Landing.css"

class AppNavbar extends Component {

    state = {
        isOpen: false,
    }


    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };

    render() {

        const {isAuthenticated, user} = this.props.auth;


        const authLinks = (
            <Fragment>
                <NavItem>
                    <div className="userData">
                        <div className="navbar-text mr-3">
                            <strong>{user ? <strong>{user.userName}</strong>: ''}</strong>
                        </div>
                        <div className="navbar-text mr-3 userContainer">
                            <div>{user ? <img src={user.img} alt='user' className="profileImg"/> : ''}</div>  
                        </div>
                    </div>
                </NavItem>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        );

        return (
            <div>
                <Navbar className="navCol" light expand="sm">
                    <Container>
                        <NavbarBrand href="/">MyTINERARY{' '}<LoyaltyIcon/></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {isAuthenticated ? authLinks: guestLinks}
                            </Nav>
                        </Collapse>

                    </Container>

                </Navbar>
            
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
        auth: state.auth,
});

export default connect (mapStateToProps, null)(AppNavbar); 
