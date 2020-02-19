import React, { Component } from 'react'
import { connect } from 'react-redux';
import CityCard from '../components/CityCard';
import {fetchCity} from '../actions/citiesAction';




class Itineraries extends Component {

    componentDidMount(){
        const city = window.location.pathname.split("/")[2]

        console.log(city)


        this.props.fetchCity(city)


        // console.log(this.props.fetchCity(city))
    }

    getCity() {

        // const city = this.props.city;

        // console.log(city)

       

        
    }


    render() {

        const {city} = this.props

        console.log(city)

        return (
            <div>
                    <CityCard city={this.props.city} key={this.props.city._id}/> 
                {/* {this.getCity()}   */}
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        city: state.cities.city 
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        fetchCity : (city) => dispatch(fetchCity(city))
        

    }
}



export default connect (mapStatetoProps, mapDispatchtoProps) (Itineraries);
