import React, { Component } from 'react'
import { connect } from 'react-redux';
import '../style/Itineraries.css';
import CityCard from '../components/CityCard';
import ItineraryCard from '../components/ItineraryCard';
import {fetchCity} from '../actions/citiesAction';
import {fetchItineraries} from '../actions/itinerariesAction';
import LoadingSpinner from '../components/Spinner';


class Itineraries extends Component {

    componentDidMount(){
        const city = window.location.pathname.split("/")[2]

        console.log(city)
        
        this.props.fetchCity(city)
            .then(() => this.props.fetchItineraries(city)
            .catch(err => console.log(err)))

    }


    getItineraries = () => {

        let itinerariesList = this.props.itineraries.map(itinerary => {
            return <ItineraryCard itinerary={itinerary} key={itinerary._id}/>
        })
        return itinerariesList  
 
    }

    

    render() {

        if(!this.props.loadingCity)
        return (
            <div>
                <CityCard city={this.props.city} key={this.props.city._id}/>
                {!this.props.loadingItineraries ?<div className="itinerariesContainer">
                    {this.getItineraries()}  
                </div> :(<LoadingSpinner/>) } 
            </div>
        )
        return (<LoadingSpinner/>)
    }
}

const mapStatetoProps = (state) => {
    return {
        city: state.cities.city,
        itineraries: state.itineraries.itineraries,
        loadingCity: state.itineraries.loading,
        loadingItineraries: state.cities.loading,

    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        fetchCity : (city) => dispatch(fetchCity(city)),
        fetchItineraries : (city) => dispatch(fetchItineraries(city))
        
    }
}



export default connect (mapStatetoProps, mapDispatchtoProps) (Itineraries);
