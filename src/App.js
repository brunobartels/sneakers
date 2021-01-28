import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  HashRouter,
} from "react-router-dom";

//import logo from './logo.svg';
import './css/reset.css';
import './css/App.css';

import UserHeader from './components/UserHeader';
import './components/UserHeader.css';

import ProductsList from './components/ProductsList';
import './components/ProductsList.css';

import Checkout from './pages/Checkout';


const userStates = {
    productId: null,
    productSize: null,
    productQnt: null
};

class App extends Component{
    render(){
      return (
        <div className="App container">
            <Router>
                <header className="appHeader">
                    <div className="containerLimit"><UserHeader></UserHeader></div>
                </header>
            <Switch>
              <Route exact path="/">
                <div className="containerLimit">
                    <h1 className="h1Title Sneakers">Sneakers</h1>
                    <ProductsList userStates={userStates}></ProductsList>
                </div>
              </Route>
              <Route exact path="/Checkout/:id">
                <div className="containerLimit">
                    <h1 className="h1Title Checkout">Checkout</h1>
                    <Link to="/" className="btBackHistory"><span class="material-icons">arrow_back</span>Back</Link>
                    <Checkout userStates={userStates}></Checkout>
                </div>
              </Route>
            </Switch>
            </Router>
         </div>
       )
    }
}

export default App;
