import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchComments} from '../actions/commentsAction';
import {Card, CardBody, CardTitle, CardText}from 'reactstrap' ;
import '../style/Comments.css'

class Comments extends Component {

    componentDidMount(){

    const {itinerary} = this.props;

    console.log(itinerary._id)

        
    this.props.fetchComments(itinerary._id)
    
    console.log(this.props.comments)

    };

    getComments = () => {

    console.log(this.props.comments)

        // let commentsList = this.props.comments.map(comment => {
        //     return (

        //         console.log(comment)
                
        //     )
            
        // })
        // if(commentsList.length === 0){
        //     commentsList =(
        //         <p>No comments added yet</p>
        //     )
        // }
        return <p>hh</p> //commentsList
    }


    render() {
        return (
            <div className="hello">
                <h2>Comments</h2>
                {this.getComments()}  
            </div>
        )
    };

    
}
const mapStateToProps = (state) => {
    return {
        comments: state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchComments: (itinerary) => dispatch(fetchComments(itinerary))
    }
        
}

export default connect (mapStateToProps, mapDispatchToProps) (Comments);