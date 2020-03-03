import React, { Component } from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import '../style/Comments.css'





class CommentForm extends Component {
    render() {
        return (
            <div>
                <FormGroup className='formContainer'>
                    <Label for="exampleText">Do you want to share your experience?</Label>
                    <Input type="textarea" name="text" id="exampleText" />
                    <Button color="info" size="lg">Submit</Button>
                </FormGroup>         
            </div>
        )
    }
}
export default CommentForm;
