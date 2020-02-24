import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './store';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import Footer from './components/Footer';
import Landing from './views/Landing';
import Cities from './views/Cities';
import Itineraries from './views/Itineraries';
import './style/App.css';
import {loadUser} from './actions/authAction';

class App extends Component {

  componentDidMount(){
    store.dispatch(loadUser());
  }

  render() {
  return (
    <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar/>
              <div className="container">
                <div className="body">
                  <Route exact path="/" component={Landing}/>
                  <Route path="/cities" component={Cities}/>
                  <Route path="/itineraries/:name" component={Itineraries}/>
                </div>
              </div>
              <Footer/>
          </div>
        </Router>
    </Provider>
  )};
}

export default App;
