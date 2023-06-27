
import { addHours, differenceInSeconds, set } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css'
import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from 'date-fns/locale/es';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks';
registerLocale('es', es)

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

export const CalendarModal = () => {
    const { isDateModalOpen } = useUiStore();
    
    const [formSubmitted, setFormSubmitted] = useState(false);

    const {closeDateModal}  = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2)
    });

    useEffect(() => {
      if( activeEvent !==  null) {
        setFormValues({ ...activeEvent })
      }
    
      
    }, [activeEvent])
    
    

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';

        return (formValues.title.length > 0)
            ? ''
            : 'is-invalid';
    }, [formValues.title, formSubmitted])


    const noteClass = useMemo(() => {
        if (!formSubmitted) return '';

        return (formValues.notes.length > 0)
            ? ''
            : 'is-invalid';
    }, [formValues.notes, formSubmitted]);

    const onInputChange = ({ target }) => {

        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onCloseModal = () => {
        console.log('cerrando modal');
        closeDateModal();
      
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const difference = differenceInSeconds(formValues.end, formValues.start);
        console.log({ difference });

        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
            // console.log('Error en fechas');
            return;
        }

        if (formValues.title.length <= 0) return;

        if (formValues.notes.length <= 0) return;

        console.log(formValues);
       await  startSavingEvent(formValues);
       closeDateModal();
       setFormSubmitted(false);
    }

    return (
        <Modal
            isOpen={ isDateModalOpen }

            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}

        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-4">
                    <label>Fecha y hora inicio</label>

                    <div className="">
                        <DatePicker
                            selected={formValues.start}
                            className="form-control col-sm-12"
                            onChange={(event) => onDateChanged(event, 'start')}
                            dateFormat="Pp"
                            showTimeSelect
                            locale="es"
                            timeCaption='Hora'
                        />
                    </div>
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <div className="">
                        <DatePicker
                            minDate={formValues.start}
                            selected={formValues.end}
                            className="form-control col-sm-12"
                            onChange={(event) => onDateChanged(event, 'end')}
                            dateFormat="Pp"
                            showTimeSelect
                            locale="es"
                            timeCaption='Hora'
                        />
                    </div>
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className={`form-control ${ noteClass }`}
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}

                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}
