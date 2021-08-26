import React from 'react';
import Navbar from "../Navbar/Navbar";
import './app.css';
import {Switch, Route} from "react-router-dom";
import Registration from "../Registration/Registration";
import Login from "../Login/Login";

function App() {
  return (
    <div className='app'>
      <Navbar/>
        <div className='mainContainer'>
          <Switch>
            <Route path='/registration' component={Registration} />
            <Route path='/login' component={Login} />
          </Switch>
        </div>
    </div>
  );
}

export default App;
