import React, { Component, Fragment } from 'react';
import {NavLink} from 'reactstrap';
import { connect } from 'react-redux';
import {logout} from '../actions/authAction';


class Logout extends Component {
    render() {
        return (
            <Fragment>
                <NavLink onClick={this.props.logout} href="#">

                Logout

                </NavLink>
            </Fragment>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        logout : () => dispatch(logout()),      
    }
}


export default connect(mapStatetoProps, mapDispatchtoProps) (Logout);
