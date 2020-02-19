import React, { Component } from 'react'
import { connect } from 'react-redux';
import CityCard from '../components/CityCard';
import {fetchCity} from '../actions/citiesAction';
import {fetchItineraries} from '../actions/itinerariesAction';



class Itineraries extends Component {

    componentDidMount(){
        const city = window.location.pathname.split("/")[2]

        console.log(city)
        


        this.props.fetchCity(city)
            .then(() => this.props.fetchItineraries(city)
            .catch(err => console.log(err)))


    }


    getItineraries() {

        const itineraries = this.props.itineraries;
        console.log(itineraries)

       

        
    }


    render() {

        const {city} = this.props

        console.log(city)

        return (
            <div>
                <CityCard city={this.props.city} key={this.props.city._id}/> 
                {this.getItineraries()}  
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        city: state.cities.city,
        itineraries: state.itineraries.itineraries
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        fetchCity : (city) => dispatch(fetchCity(city)),
        fetchItineraries : (city) => dispatch(fetchItineraries(city))
        
    }
}



export default connect (mapStatetoProps, mapDispatchtoProps) (Itineraries);
