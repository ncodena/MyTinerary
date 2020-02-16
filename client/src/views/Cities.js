import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchCities} from '../actions/citiesAction';
import CityCard from '../components/CityCard';

class Cities extends Component {

    state = {
        input: ""
    }

    componentDidMount(){
        this.props.fetchCities()
        
    }

    filterCities = () => {
        console.log(this.props.cities)
        return this.props.cities.filter(city=> city.name.toLowerCase().startsWith(state.input)) ||
        city.country.toLowerCase().startsWith(state.input)
    }

    getCitiesList = () => {
        let citiesList = this.filterCities().map(city => {
            return <CityCard city= {city} key={city._id}/>
        })

        if (citiesList.lenght === 0) {
            citiesList = (
                <div>NO RESULTS FOUND</div>
            )
        }
        return citiesList
    }

    render() {
        if(!this.props.loading)
        return (
            <div>
                {this.getCities()}

                

                
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        cities: state.cities.cities,
        loading: state.cities.loading,
    }
};

const mapDispatchtoProps = (dispatch) => {
    return {
        fetchCities: () => dispatch(fetchCities())
    }
}

export default connect (mapStatetoProps, mapDispatchtoProps) (Cities);