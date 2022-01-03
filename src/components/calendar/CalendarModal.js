import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/events';




const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');


const now=moment().minutes(0).seconds(0).add(1,'hours');
const nowPlus=now.clone().add(1,'hours');


const initEvent={
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus.toDate()
}

export const CalendarModal = () => {

    

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus.toDate());


    const [titleValid, setTitleValid] = useState(true)

    const [formValues, setFormValues] = useState(initEvent);


    const dispatch = useDispatch();

    const {modalOpen} = useSelector(state => state.ui)
    const {activeEvent} = useSelector(state => state.calendar)




    const {notes, title, start, end}= formValues;

    useEffect(() => {
        if (dateStart !== null) {
            setDateEnd(moment(dateStart).add(1, 'hours').toDate())
        }
    }, [dateStart]);


    useEffect(() => {
        
        if(activeEvent){
            setFormValues(activeEvent);
        }
        else{
            setFormValues(initEvent);
        }

        
    }, [activeEvent], [setFormValues])

    const handleInputChange=({target})=>{
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }


    const closeModal= ()=>{
        //TODO cerrar modal
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent())
        setFormValues(initEvent);
        
    }

    const handleStartDateChange=(e)=>{
        setDateStart(moment(e).toDate());
        setFormValues({
            ...formValues,
            start: e
        })

    }

    const handleEndDateChange= (e)=>{
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }


    const handleSubmitForm=(e)=>{
        e.preventDefault();

        const momentStart=moment(start);
        const momentEnd=moment(end);

        if(momentStart.isSameOrAfter(momentEnd)){

            return Swal.fire('Error', 'La fecha fin debe ser mayor al inicio', 'error');
        }

        if(title.trim().length <2){

            
            return setTitleValid(false);
        }

        if(activeEvent){
            dispatch(eventStartUpdate(formValues));
        }
        else{

            //TODO: realizar grabacion
        
            dispatch(eventStartAddNew(formValues))

        }

        

        setTitleValid(true);
        closeModal();
    }

    /* minDate={dateStart} 
    es para la parte de la validacion de las fechas, para que la de inicio no supera la del final
    se usan los estados tal como lo tenemos en el codigo.

    */

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                closeTimeoutMS={200}
                className="modal"
                overlayClassName="modal-fondo"
            >
                <h1>{(activeEvent)
                ?
                ('Editar Evento')
                :
                ('Crear evento')
            }</h1>
                <hr />
                <form className="container" onSubmit={handleSubmitForm}>
                    <div className="form-group">
                        <KeyboardDateTimePicker
                            inputVariant="outlined"
                            ampm={false}
                            label="Fecha y hora inicio"
                            value={dateStart}
                            onChange={handleStartDateChange}
                            format="MMMM dd yyyy, HH:mm "
                        />
                    </div>
                    <div className="form-group">
                        <KeyboardDateTimePicker
                            inputVariant="outlined"
                            ampm={false}
                            label="Fecha y hora fin"
                            value={dateEnd}
                            onChange={handleEndDateChange}
                            minDate={dateStart}
                            minDateMessage="End Date should be at least start Date "
                            format="MMMM dd yyyy, HH:mm "
                        />
                    </div>
                    <hr />
                    <div className="form-group">
                        <label>Titulo y notas</label>
                        <input
                            type="text"
                            className={`form-control ${!titleValid && 'is-invalid'}`}
                            placeholder="Título del evento"
                            name="title"
                            value={title}
                            onChange={handleInputChange}
                            autoComplete="off" />
                        <small id="emailHelp" className="form-text text-muted"> Una descripción corta </small>
                    </div>
                    <div className="form-group">
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="Notas"
                            rows="5"
                            name="notes"
                            value={notes}
                            onChange={handleInputChange}
                        >
                        </textarea>
                        <small id="emailHelp" className="form-text text-muted"> Información adicional </small>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    ><i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>
                </form>
            </Modal>
        </MuiPickersUtilsProvider> 
    );
}
