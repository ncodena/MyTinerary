import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/Landing.css'

class Landing extends Component {
    render() {
        return (
            <div className="landingPage">
                <h2>MYTINERARY < i className=" fas fa-globe-europe"></i></h2>
                <Link to={'/cities'}>Cities</Link>
            </div>
        )
    }
}

export default Landing
