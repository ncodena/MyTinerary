import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchComments} from '../actions/commentsAction';
import {Card, CardBody, CardTitle}from 'reactstrap' ;
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

        let commentsList = this.props.comments.map(comment => {
            return (
                <Card key={comment._id}>
                    <CardBody className="mainContainer">
                        <div className="userContainer">
                            <img className="avatar" src={comment.user.img} alt="user avatar" />
                            <CardTitle className="userData"><strong>{comment.user.userName + ' '}</strong>({ comment.user.country})</CardTitle>
                        </div>
                        <div className="commentContainer">
                            {comment.body}
                            <div>
                            <small className="text-muted">Comment posted by {comment.user.userName} on {comment.date}</small>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            )
            
        })

        if(commentsList.length === 0){
            commentsList =(
                <p>No comments added yet</p>
            )
        }
        return commentsList 
    }


    render() {
        return (
            <div className="commentsList">
                <h5>Comments</h5>
                {this.getComments()}
            </div>
        )
    };

    
}
const mapStateToProps = (state) => {
    return {
        comments: state.comments.comments,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchComments: (itinerary) => dispatch(fetchComments(itinerary))
    }
        
}

export default connect (mapStateToProps, mapDispatchToProps) (Comments);