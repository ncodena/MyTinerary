import React, { Component } from 'react';
import '../style/Cities.css';

class CityCard extends Component {
    render() {

        const {city} = this.props

        return (
                
                    <div className="cardContainer">
                        <img src={city.img} alt="Card image cap" className="cardImage"/>
                            <div className="titleContainer"> 
                                <h4><strong>{city.name}</strong></h4>
                                <h5>{city.country}</h5>
                            </div>
                    </div>
                
        )
    }
}

export default CityCard;
