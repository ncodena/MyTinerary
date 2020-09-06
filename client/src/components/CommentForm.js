import React, { Component } from 'react';
import { Form, Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import {postComment} from '../actions/commentsAction';
import {fetchComments} from '../actions/commentsAction';

import '../style/Comments.css'



class CommentForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            body: '',
        };
    }

    componentDidMount(){
        // const {itinerary} = this.props

        // console.log(itinerary)

        // let date = new Date ();
        
        // console.log(date)
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    async onSubmit (e) {

        e.preventDefault();

        const {user} = this.props.auth;

        const {itinerary} = this.props;

        const itineraryId = itinerary._id;

        const author = user.id;

        const {body} = this.state;

        let date = new Date();

        console.log(date)

        const newComment = {
            author,
            itineraryId,
            body,
            date
        }

        console.log(newComment)
        
        // Attempt to post a new comment
        await this.props.postComment(newComment);


        await this.props.fetchComments(itinerary);
        return
    }


    render() {
        return (
                <Form className="commentsForm" onSubmit={(e) => this.onSubmit(e)}>
                    <FormGroup className='formContainer'>
                        <Label for="exampleText" className="commentsPreview">Do you want to share your experience?</Label>
                        <Input type="textarea" name="body" id="body" placeholder="Your text" onChange={this.onChange}/>
                        <Button color="info" size="lg">Submit</Button>
                    </FormGroup>    
                </Form>      
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        error:state.error,
        auth: state.auth
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        postComment : (newComment) => dispatch(postComment(newComment)),
        fetchComments: (itinerary) => dispatch(fetchComments(itinerary))
    }
}

export default  connect (mapStatetoProps, mapDispatchtoProps) (CommentForm);
