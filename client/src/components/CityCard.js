import React, { Component } from 'react';
import {Card, CardImg} from 'reactstrap';

class CityCard extends Component {
    render() {

        const {city} = this.props

        return (
            <div>
                <Card>
                    <CardImg top width="100%" src={city.img} alt="Card image cap"/>
                    <div className="title"> 
                        <h4><strong>{city.name}</strong></h4>
                        <h5>{city.country}</h5>
                    </div>
                </Card>
                
            </div>
        )
    }
}

export default CityCard;
