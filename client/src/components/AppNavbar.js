import React, { Component, Fragment } from 'react';
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
import {connect} from 'react-redux';
import RegisterModal from '../views/RegisterModal';
import LoginModal from '../views/LoginModal';
import Logout from './Logout';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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

        const {isAuthenticated, user} = this.props.auth;


        const authLinks = (
            <Fragment>
            <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user? `Welcome ${user.userName}`: ''}</strong> 
                        {/* <div>{user?<img width="20%" src={user.img} alt="user image"/>: <AccountCircleIcon/>}</div>  */}
                    </span>
            </NavItem>
            <NavItem>
                    <span className="navbar-text mr-3">
                        {/* <div>{user?<img width="20%" src={user.img} alt="user image"/>: <AccountCircleIcon/>}</div>  */}
                    </span>
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
                        <NavbarBrand href="/">MYTINERARY{' '}<LoyaltyIcon/></NavbarBrand>
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

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        isAuthenticated: state.auth.isAuthenticated,
        error:state.error
    }
}

export default connect (mapStateToProps, null)(AppNavbar); 
