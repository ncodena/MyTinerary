import React, { Component } from 'react';

// Importing connect to connect the component to  Redux store.
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

// Action
import {fetchCities} from '../actions/citiesAction';

// Child components
import CitiesInput from '../components/CitiesInput';
import CityCard from '../components/CityCard';
import LoadingSpinner from '../components/Spinner';
// Styling
import '../style/Cities.css';
import noResultImg from '../style/no-search-result.png';


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

    // Defining the value of the input in the state

    filterData = (e) => {
        this.setState({input: e.target.value})
    }


    


    filterCities = () => {
        console.log(this.props.cities)
        return this.props.cities.filter(city=> city.name.toLowerCase().toUpperCase().startsWith(this.state.input) || city.country.toLowerCase().toUpperCase().startsWith(this.state.input)) 
    }


    getCitiesList = () => {
      
        
        let citiesList = this.filterCities().map(city => {
            return <Link to={`/itineraries/${city.name}`} key={city._id} className='links'>
                        <CityCard city={city} key={city._id}/> 
                    </Link>
                    
        })

        if (citiesList.length === 0) {
            citiesList = (
                <div className="noResultsContainer">
                    <img src={noResultImg} alt="no-results-found" width='100%'></img>
                    <p className='errorMessage'>Not results found</p>
                    <p>Please, try again to search for results</p>
                </div>
            )
        }
        
        return citiesList 
    }

    render() {
        if(!this.props.loading)
        return (
            <div className="citiesView">
                <CitiesInput value={this.state.input} filterData={this.filterData} />
                <div className="listContainer">
                    {this.getCitiesList()}
                </div>
                
            </div>
        )
        return (<LoadingSpinner/>)
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
        fetchCities: () => dispatch(fetchCities()),
    }
}

export default connect (mapStatetoProps, mapDispatchtoProps) (Cities);