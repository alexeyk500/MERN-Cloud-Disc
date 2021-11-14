import React, {useEffect} from 'react';
import Navbar from "./Navbar/Navbar";
import './app.css';
import {Switch, Route, Redirect} from "react-router-dom";
import Registration from "./Registration/Registration";
import Login from "./Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../strore/store";
import {userAuthApiByJWTFromLocalStorage} from "../api/userApi";
import Disk from "./Disk/Disk";
import Profile from "./Profile/Profile";

function App() {

  const dispatch = useDispatch();
  const isAuth = useSelector((state: StateType) => state.user.isAuth);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(userAuthApiByJWTFromLocalStorage());
    }

    // eslint-disable-next-line
  }, [])

  return (
    <div className='app'>
      <Navbar/>
      <div className='mainContainer'>
        {
          isAuth ?
            <Switch>
              <Route exact path='/' component={Disk}/>
              <Route path='/profile' component={Profile}/>
              <Redirect to='/'/>
            </Switch>
            : <Switch>
              <Route path='/registration' component={Registration}/>
              <Route path='/login' component={Login}/>
              <Redirect to='/login'/>
            </Switch>
        }

      </div>
    </div>
  );
}

export default App;
