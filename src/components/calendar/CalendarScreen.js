import React, { useEffect, useState } from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { messages } from '../../helpers/calender-messages-es';
import { Navbar } from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import {  eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

// const myEventsList=[{
//     title: 'Tarea',
//     start: moment().toDate(),
//     end: moment().add(2,'hours').toDate(),
//     bgcolor: '#fafafa',
//     user: {
//         _id: '123',
//         name: 'Alex'
//     }
// }]


export const CalendarScreen = () => {

    const dispatch = useDispatch();

    //TODO: Leer del store los events

    const {events, activeEvent} = useSelector(state => state.calendar)
    const {uid} = useSelector(state => state.auth)

    

    const [lastView, setLastView] = useState(
        localStorage.getItem("lastView") || 'month'
    )

    //Para que cargue las tareas de la base de datos

    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch])

    const onDoubleClick= (e) =>{
        dispatch(uiOpenModal());
        
    }

    const onSelectEvent=(e)=>{
        dispatch(eventSetActive(e))
        
    }

    const onViewChange= (e) =>{
        setLastView(e)
        localStorage.setItem("lastView", e);
    }

    const onSelectSlot=(e)=>{
        //Cuando le de click en otro lado, pues desactivamos el evento activo
        dispatch(eventClearActiveEvent());
        
    }


    const eventStyleGetter= (event, start, end, isSelected)=>{
    
        const style={
            backgroundColor: (uid===event.user._id) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: '#fff'
        }

        return{
            style
        }
    }
    
    return (
        <div className="calendar-screen">
            <Navbar />
            <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            messages={messages}
            eventPropGetter={eventStyleGetter}
            components={{
                event: CalendarEvent
            }}
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelectEvent}
            onView={onViewChange}
            view={lastView}
            onSelectSlot={onSelectSlot}
            selectable={true}
            />

            <AddNewFab />
            {
                (activeEvent)
                ?
                <DeleteEventFab/>
                :
                null
            }
            
            <CalendarModal />

        </div>
    )
}
