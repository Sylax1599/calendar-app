import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';


export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <Route 
        {...rest}
        component={
            (props)=>(
                (!isAuthenticated)
                ?
                (<Component {...props} />)
                :
                (<Redirect to="/" />)
            )
        }
        />
    )
}

//Esto puede servir para cualquier proyecto que haga

//Y esto para validar que siempre que se use, pues se el manden los parametros correctos
PublicRoute.protoType={
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}