import React from 'react';
import Navbar from "../Navbar/Navbar";
import './app.css';
import {Switch, Route} from "react-router-dom";
import Registration from "../Registration/Registration";
import Login from "../Login/Login";
import {useSelector} from "react-redux";
import {StateType} from "../../strore/store";

function App() {

  const isAuth = useSelector<StateType>(state => state.user.isAuth)

  return (
    <div className='app'>
      <Navbar/>
      <div className='mainContainer'>
        {
          !isAuth &&
          <Switch>
            <Route path='/registration' component={Registration} />
            <Route path='/login' component={Login} />
          </Switch>
        }

      </div>
    </div>
  );
}

export default App;
