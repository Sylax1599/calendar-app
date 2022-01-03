import React, { useEffect } from 'react'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'

import {
    BrowserRouter as Router,
    Switch,
    Redirect,
  } from "react-router-dom";
import { startChecking } from '../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    //Cierra sesión porque el AppRouter está pendiendte del cambio del uid, en el storage

    const {checking, uid} = useSelector(state => state.auth)


    const dispatch = useDispatch();

    useEffect(() => {
      //Lo que hacemos aquí es checkear
      dispatch(startChecking())
    }, [dispatch])

    if(checking){
      return (<h5>Espere....</h5>);
    }


    return (
        <Router>
      <div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <PublicRoute  
          exact path="/login" 
          component={LoginScreen}
          //Para pasarlo a un valor booleano
          isAuthenticated={!!uid}
          />
       
         <PrivateRoute 
         exact path="/" 
         component={CalendarScreen}
         isAuthenticated={!!uid}
          />
            
         <Redirect to="/" />
        </Switch>
      </div>
    </Router>
    )
}
