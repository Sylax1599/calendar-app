
//Usaremos el fetch, para usar menos paquete en la aplicacion
//Y no hacerla tan cargada, pero se puede usar axios sin ningun problema

const baseUrl=process.env.REACT_APP_API_URL;


//Esta funcion nos sirve para hacer peticiones  sin el token
//Puede usarse de forma general, es decir en  otro proyecto de ser necesario

const fetchSinToken= (endpoint, data, method='GET') => {

    //Esto de una hace la petición al endpoint

    const url=`${baseUrl}/${endpoint}`; //localhost:400/api/endpoint

    if(method==='GET'){
        return fetch(url);
    }
    else{
        return fetch(url, {
            method,
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    //Y retorna la peticion, la puedes recibir como
    // const res= await fetchSinToken('auth', {}, 'POST' || 'GET)
    // const body= await res.json();
    //console.log(body) y ahí se vería la info dependiendo de la respuesta de la API

}


const fetchConToken= (endpoint, data, method='GET') => {

    //Esto de una hace la petición al endpoint

    const url=`${baseUrl}/${endpoint}`; //localhost:400/api/endpoint

    const token= localStorage.getItem('token') || '';

    //Aqui simplemente le mandamos en los headers, el token
    
    if(method==='GET'){
        return fetch(url,{
            method,
            headers:{
                'x-token': token
            }
        });
    }
    else{
        return fetch(url, {
            method,
            headers:{
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        });
    }

    //Y retorna la peticion, la puedes recibir como
    // const res= await fetchSinToken('auth', {}, 'POST' || 'GET)
    // const body= await res.json();
    //console.log(body) y ahí se vería la info dependiendo de la respuesta de la API
    
}


export {
    fetchSinToken,
    fetchConToken
}