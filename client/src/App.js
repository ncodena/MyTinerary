import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import Footer from './components/Footer';
import Landing from './views/Landing';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar/>
        <Landing/>
        <Footer/>
      </div>
    </Provider>
  );
}

export default App;
