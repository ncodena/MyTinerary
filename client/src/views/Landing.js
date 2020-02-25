import React, { Component } from 'react';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import '../style/Landing.css'

class Landing extends Component {
    render() {
        return <div className="landingPage">
            <div className="content">
                <h2><strong>MyTINERARY</strong>{''}<LoyaltyIcon fontSize='large'/></h2>
                </div>
            </div>
        
    }
}

export default Landing


