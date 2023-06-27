import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";


export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    // TODO: llegar al backend
    if (calendarEvent._id) {
      // actualizando
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      //creando
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
    }
  }

  const startDeletingEvent = () => {

    dispatch(onDeleteEvent());

  }
  return {
    //propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent._id,
    //metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  }


}
