import React from 'react';
import Navbar from "../Navbar/Navbar";
import './app.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Registration from "../Registration/Registration";

function App() {
  return (
    <div className='app'>
      <Navbar/>
      <BrowserRouter>
        <Switch>
          <Route path='/registration' component={Registration} />
        </Switch>
        <div className='mainContainer'>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
