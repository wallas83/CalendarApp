import { Calendar } from 'react-big-calendar';

import { addHours } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent, CalendarModal, Navbar } from "../"
import { getMessagesES, localizer } from '../../helpers';
import { useState } from 'react';




export const Calendarpage = () => {
    const [lastView, setLastView] = useState(localStorage.getItem('lastview') || 'week')
    const events = [{
        title: 'jefe cumpleanios',
        notes: 'Hay que comprar pastel',
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: '#fafafa',
        user: {
            _id: '123',
            name: 'Fernando'
        }
    }]
    
    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#347CF7',
            borderRadius: 'opx',
            opacity: 0.8,
            color: 'white',
        }
    
        return {
            style
        }
    }
    const onDoubleClick = (event) => {
    
    }
    const onSelect = (event) => {
    
    }
    
    const onViewChanged = (event) => {
        localStorage.setItem('lastview', event);
        setLastView( event )
    }
    return (
        <>
            <Navbar />

            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={ lastView }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />
                <CalendarModal/>
        </>
    )
}
