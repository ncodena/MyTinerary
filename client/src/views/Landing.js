import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import {Button} from 'reactstrap';
import '../style/Landing.css'
import mobileScreenshot from '../style/screenshot.png';

class Landing extends Component {
    render() {
        return <div>
                <div className="landingPage"></div>
                    <div className="content">
                        <h2><strong>MyTINERARY</strong>{''}<LoyaltyIcon fontSize='large'/></h2>
                        <img className="screenshot" src={mobileScreenshot} alt="screenshot"/>
                        <div className="textContainer">
                            <p>Find your perfect trip designed by insiders and love their cities</p>
                            <Link to='/cities'><Button className="button">Discover</Button></Link>
                        </div>
                    </div>
                </div>
    }

}

export default Landing


