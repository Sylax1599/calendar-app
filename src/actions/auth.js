

import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { deletedEventsLogout } from "./events";


export const startLogin=(email, password) =>{
    //Es asincrono
    return async(dispatch) =>{
        const res= await fetchSinToken('auth', {email, password}, 'POST');

        const body= await res.json();
        //console.log(body);
        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        }
        else{
            
            
            
            
            
            //Aqui hay que mostrar el error correcto
            Swal.fire('Error', body.msg, 'error');
        }
    }
};

export const startRegister=(email, password, name) =>{
    return async(dispatch)=>{
        const res= await fetchSinToken('auth/new', {email, password, name}, 'POST')
        const body= await res.json();
        //console.log(body);
        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        }
        else{
            
            if(body.errors?.password){
                Swal.fire('Error', body.errors.password.msg, 'error');
            }

            if(body.errors?.email){
                Swal.fire('Error', body.errors.email.msg, 'error');
            }

           
        }
    }
}


//Esta funcion, la llamamos en el AppRouter, para ver si está checkeado
//Esta funcion sirve para validar si el usuario está logueado, y traernos toda la info del backend
//Para eso, hacemos uso del JWT
//Lo leemos del store, y ahí está la información del usuario, como el uid, y el name

export const startChecking= () => {
    return async (dispatch) =>{

        const res= await fetchConToken('auth/renew');
        const body= await res.json();
        
        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        }
        else{
            dispatch(checkingFinish());
        }

    }
}

const checkingFinish= () =>({type: types.authCheckingFinish});


const login= (user) =>({
    type: types.authLogin,
    payload: user
})

export const startLogout=()=>{
    return (dispatch) => {
        localStorage.clear();
        dispatch(deletedEventsLogout())
        dispatch(logout());
    }
}

const logout= () =>({
    type: types.authLogout
})