import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';


export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

   
    localStorage.setItem('lastpath', rest.location.pathname);
    
    return (
        <Route 
        {...rest}
        component={
            (props)=>(
                (isAuthenticated)
                ?
                (<Component {...props} />)
                :
                //Para evitar un ciclo infinito
                //Aquí ponemos que lo redirija a la autenticación
                (<Redirect to="/login" />)
            )
        }
        />
    )
}

//Esto puede servir para cualquier proyecto que haga

//Y esto para validar que siempre que se use, pues se el manden los parametros correctos
PrivateRoute.protoType={
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}