import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import Footer from './components/Footer';
import Landing from './views/Landing';
import Cities from './views/Cities';
import './App.css';

function App() {
  return (
    <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar/>
            <Route path="/landing" component={Landing}/>
            <Route path="/cities" component={Cities}/>
            <Footer/>
          </div>
        </Router>
    </Provider>
  );
}

export default App;
