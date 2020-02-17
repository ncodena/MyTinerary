import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchCities} from '../actions/citiesAction';
import CitiesInput from '../components/CitiesInput';
import '../style/Cities.css'
import CityCard from '../components/CityCard';

class Cities extends Component {

    constructor (props){
        super(props);
    
        this.state={
            input:""
        };
    }
    

    componentDidMount(){
        this.props.fetchCities()
        
    }

    filterCities = () => {
        console.log(this.props.cities)
        return this.props.cities.filter(city=> city.name.toLowerCase().startsWith(this.state.input)) || 
        (city => city.country.toLowerCase().startsWith(this.state.input))
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
                <CitiesInput/>
                {this.getCitiesList()}
                

                

                
            </div>
        )
        return (<div>loading</div>)
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