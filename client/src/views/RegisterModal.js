import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Input, Form, FormGroup, NavLink, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import {register} from '../actions/authAction';
import {clearErrors} from '../actions/errorAction';


    class RegisterModal extends Component {

        state = {
            modal: false,
            firstName: '',
            lastName: '', 
            userName: '',
            password: '',
            email: '',
            country: '',
            msg: null,

            countryList : [
                "Afghanistan",
                "Albania",
                "Algeria",
                "American Samoa",
                "Andorra",
                "Angola",
                "Anguilla",
                "Antarctica",
                "Antigua and Barbuda",
                "Argentina",
                "Armenia",
                "Aruba",
                "Australia",
                "Austria",
                "Azerbaijan",
                "Bahamas (the)",
                "Bahrain",
                "Bangladesh",
                "Barbados",
                "Belarus",
                "Belgium",
                "Belize",
                "Benin",
                "Bermuda",
                "Bhutan",
                "Bolivia (Plurinational State of)",
                "Bonaire, Sint Eustatius and Saba",
                "Bosnia and Herzegovina",
                "Botswana",
                "Bouvet Island",
                "Brazil",
                "British Indian Ocean Territory (the)",
                "Brunei Darussalam",
                "Bulgaria",
                "Burkina Faso",
                "Burundi",
                "Cabo Verde",
                "Cambodia",
                "Cameroon",
                "Canada",
                "Cayman Islands (the)",
                "Central African Republic (the)",
                "Chad",
                "Chile",
                "China",
                "Christmas Island",
                "Cocos (Keeling) Islands (the)",
                "Colombia",
                "Comoros (the)",
                "Congo (the Democratic Republic of the)",
                "Congo (the)",
                "Cook Islands (the)",
                "Costa Rica",
                "Croatia",
                "Cuba",
                "Curaçao",
                "Cyprus",
                "Czechia",
                "Côte d'Ivoire",
                "Denmark",
                "Djibouti",
                "Dominica",
                "Dominican Republic (the)",
                "Ecuador",
                "Egypt",
                "El Salvador",
                "Equatorial Guinea",
                "Eritrea",
                "Estonia",
                "Eswatini",
                "Ethiopia",
                "Falkland Islands (the) [Malvinas]",
                "Faroe Islands (the)",
                "Fiji",
                "Finland",
                "France",
                "French Guiana",
                "French Polynesia",
                "French Southern Territories (the)",
                "Gabon",
                "Gambia (the)",
                "Georgia",
                "Germany",
                "Ghana",
                "Gibraltar",
                "Greece",
                "Greenland",
                "Grenada",
                "Guadeloupe",
                "Guam",
                "Guatemala",
                "Guernsey",
                "Guinea",
                "Guinea-Bissau",
                "Guyana",
                "Haiti",
                "Heard Island and McDonald Islands",
                "Holy See (the)",
                "Honduras",
                "Hong Kong",
                "Hungary",
                "Iceland",
                "India",
                "Indonesia",
                "Iran (Islamic Republic of)",
                "Iraq",
                "Ireland",
                "Isle of Man",
                "Israel",
                "Italy",
                "Jamaica",
                "Japan",
                "Jersey",
                "Jordan",
                "Kazakhstan",
                "Kenya",
                "Kiribati",
                "Korea (the Democratic People's Republic of)",
                "Korea (the Republic of)",
                "Kuwait",
                "Kyrgyzstan",
                "Lao People's Democratic Republic (the)",
                "Latvia",
                "Lebanon",
                "Lesotho",
                "Liberia",
                "Libya",
                "Liechtenstein",
                "Lithuania",
                "Luxembourg",
                "Macao",
                "Madagascar",
                "Malawi",
                "Malaysia",
                "Maldives",
                "Mali",
                "Malta",
                "Marshall Islands (the)",
                "Martinique",
                "Mauritania",
                "Mauritius",
                "Mayotte",
                "Mexico",
                "Micronesia (Federated States of)",
                "Moldova (the Republic of)",
                "Monaco",
                "Mongolia",
                "Montenegro",
                "Montserrat",
                "Morocco",
                "Mozambique",
                "Myanmar",
                "Namibia",
                "Nauru",
                "Nepal",
                "Netherlands (the)",
                "New Caledonia",
                "New Zealand",
                "Nicaragua",
                "Niger (the)",
                "Nigeria",
                "Niue",
                "Norfolk Island",
                "Northern Mariana Islands (the)",
                "Norway",
                "Oman",
                "Pakistan",
                "Palau",
                "Palestine, State of",
                "Panama",
                "Papua New Guinea",
                "Paraguay",
                "Peru",
                "Philippines (the)",
                "Pitcairn",
                "Poland",
                "Portugal",
                "Puerto Rico",
                "Qatar",
                "Republic of North Macedonia",
                "Romania",
                "Russian Federation (the)",
                "Rwanda",
                "Réunion",
                "Saint Barthélemy",
                "Saint Helena, Ascension and Tristan da Cunha",
                "Saint Kitts and Nevis",
                "Saint Lucia",
                "Saint Martin (French part)",
                "Saint Pierre and Miquelon",
                "Saint Vincent and the Grenadines",
                "Samoa",
                "San Marino",
                "Sao Tome and Principe",
                "Saudi Arabia",
                "Senegal",
                "Serbia",
                "Seychelles",
                "Sierra Leone",
                "Singapore",
                "Sint Maarten (Dutch part)",
                "Slovakia",
                "Slovenia",
                "Solomon Islands",
                "Somalia",
                "South Africa",
                "South Georgia and the South Sandwich Islands",
                "South Sudan",
                "Spain",
                "Sri Lanka",
                "Sudan (the)",
                "Suriname",
                "Svalbard and Jan Mayen",
                "Sweden",
                "Switzerland",
                "Syrian Arab Republic",
                "Taiwan (Province of China)",
                "Tajikistan",
                "Tanzania, United Republic of",
                "Thailand",
                "Timor-Leste",
                "Togo",
                "Tokelau",
                "Tonga",
                "Trinidad and Tobago",
                "Tunisia",
                "Turkey",
                "Turkmenistan",
                "Turks and Caicos Islands (the)",
                "Tuvalu",
                "Uganda",
                "Ukraine",
                "United Arab Emirates (the)",
                "United Kingdom of Great Britain and Northern Ireland (the)",
                "United States Minor Outlying Islands (the)",
                "United States of America (the)",
                "Uruguay",
                "Uzbekistan",
                "Vanuatu",
                "Venezuela (Bolivarian Republic of)",
                "Viet Nam",
                "Virgin Islands (British)",
                "Virgin Islands (U.S.)",
                "Wallis and Futuna",
                "Western Sahara",
                "Yemen",
                "Zambia",
                "Zimbabwe",
                "Åland Islands"
            ]
        };

        componentDidUpdate(prevProps) {

            const {error, isAuthenticated} = this.props;

            if(error !== prevProps.error) {
                if(error.id ==='REGISTER_FAIL'){
                    this.setState({ msg:error.msg.msg });

                } else {
                    this.setState({msg: null})
                }
            }

            //If authenticated, close modal

            if(this.state.modal){

                if(isAuthenticated){
                    this.toggle();

                }

            }

        }

        toggle = () => {

            // Clear errors
            this.props.clearErrors();

            this.setState({
                modal: !this.state.modal
            });
        };

        onChange = (e) => {
            this.setState({[e.target.name]: e.target.value});
        };

        chooseCountry() {
    
            return this.state.countryList.map((country, index) =>{
                return <option value={country} key={index}>{country}</option>
            })
         };
    
        onSubmit = e => {

            e.preventDefault();
    
            const {firstName, lastName, userName, password, email, country} = this.state;
    
            // //Create user object
    
            const newUser = {
                firstName,
                lastName, 
                userName, 
                password,
                email,
                country,
            };
    
            //Attempt to register
    
            this.props.register(newUser);
    
        }

    render() {
    return (
        <div>
            <NavLink onClick={this.toggle} href="#">
                Register
            </NavLink>
            <Modal isOpen={this.state.modal} toggle={(e) => this.onSubmit(e)}>
                <ModalHeader color="info" toggle={this.toggle}>Registration Form</ModalHeader>
                <ModalBody>

                    {this.state.msg ? (
                        <Alert color="danger">{this.state.msg}</Alert>
                        ) : null}

                    <Form onSubmit={this.onSubmit}>  
                        <FormGroup>
                           
                            <Input className="mb-3" type="text" name="firstName" id="firstName" placeholder="First Name" onChange={this.onChange}/>

                            
                            <Input className="mb-3" type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={this.onChange}/>
                        </FormGroup>

                        <FormGroup>
                            
                            <Input className="mb-3" type="text" name="userName" id="userName" placeholder="UserName" onChange={this.onChange}/>

                            
                            <Input className="mb-3" type="text" name="email" id="email" placeholder="E-mail address" onChange={this.onChange}/>

                            
                            <Input className="mb-3" type="text" name="password" id="password" placeholder="Password" onChange={this.onChange}/>


                        </FormGroup>

                        <FormGroup>
                            
                            <Input className="mb-3" type="select" name="country" id="country" onChange={this.onChange}>
                                <option value="false">Choose your country</option>
                                {this.chooseCountry()}
                            </Input>
                        </FormGroup>
                        <Button size="lg" block color="info">Submit</Button>

                    </Form>   
                </ModalBody> 
            </Modal>
        </div>
    )}
}

const mapStatetoProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        error:state.error
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        register : (newUser) => dispatch(register(newUser)),
        clearErrors: () => dispatch(clearErrors())
        
    }
}


export default  connect (mapStatetoProps, mapDispatchtoProps) (RegisterModal);