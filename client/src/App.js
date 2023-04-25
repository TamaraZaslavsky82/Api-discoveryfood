import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DiscoverIntro from '../src/components/Intro/DiscoveryIntro'
import Home from "./components/Home/Home";
import RecipesDetail from "../src/components/RecipesDetails/RecipesDetail"
import CreateRecipe from './components/CreateRecipe/CreateRecipe';

import Nav from '../src/components/Nav/Nav'
import Footer from './components/footer/Footer';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route render={({ location }) => (
            location.pathname !== '/' &&
          <Nav />
          
        )}/>
        
        <Switch> 
          <Route exact path='/' component={DiscoverIntro}/>
          <Route path='/home' component={Home}/>
          <Route path='/recipes/:id' component={RecipesDetail}/>
          <Route path='/recipes' component={CreateRecipe}/>
          
        </Switch>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
