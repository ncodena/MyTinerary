import React, { Component } from 'react';
import {Card, CardImg} from 'reactstrap';
import '../style/Cities.css';

class CityCard extends Component {
    render() {

        const {city} = this.props

        return (
                <Card>
                    <div className="mainContainer">
                        <CardImg top width="100%" src={city.img} alt="Card image cap" className="cardImage"/>
                            <div className="titleContainer"> 
                                <h4><strong>{city.name}</strong></h4>
                                <h5>{city.country}</h5>
                            </div>
                    </div>
                </Card>   
        )
    }
}

export default CityCard;
