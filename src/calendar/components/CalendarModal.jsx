
import { addHours, differenceInSeconds } from 'date-fns';
import { useState } from 'react';
import Modal from 'react-modal';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from 'date-fns/locale/es';
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

    const [open, setOpen] = useState(true);
    const [formValues, setFormValues] = useState({
        title: 'wilson',
        notes: 'wallas',
        start: new Date(),
        end: addHours(new Date(), 2)
    });

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
        setOpen(false)
    }
    const onSubmit = (event) => {
        event.preventDefault();

        const difference = differenceInSeconds( formValues.end, formValues.start);
        console.log({difference});

        if(isNaN(difference) || difference <= 0){
            console.log('Error en fechas');
            return;
        }

        if(formValues.title.length <= 0) return;

        console.log(formValues);
    }
    return (
        <Modal
            isOpen={open}

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
                        className="form-control"
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
                        className="form-control"
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
