import moment from 'moment';
//Para darle formato a la fechas y puedan aparecer en el calendario.

export const prepareEvents= (events=[]) =>{

    return events.map(
        (e)=>({
            //retornamos todo el objeto tal cual
            //titulo, fecha, usuario, etc, solo queremos modificar las fechas

            ...e,
            end: moment(e.end).toDate(),
            start: moment(e.start).toDate()
        })
    );

    
}