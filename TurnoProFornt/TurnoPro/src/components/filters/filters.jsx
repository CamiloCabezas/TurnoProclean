    import React, { useState } from "react";
    import DatePicker from "react-datepicker";
    import "./filters.css"; 
    import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { setStartDate, setEndDate} from '../../features/filtros/filtrosSlice'
const DateFilter = () => {
  const dispatch = useDispatch();
  const { startDate,  } = useSelector(state => state.filtros); 

    

    return (
        <div className="date-filter-container">
        <h4>Selecciona el rango de fechas</h4>
        
            <label>Desde: </label>

            <input 
            type="date"
            onChange={(e) => dispatch(setStartDate(e.target.value))}/>

            <label>Hasta: </label>

            <input 
            type="date"
            onChange={(e) => dispatch(setEndDate(e.target.value))}/>


        </div>
    );
    };

    export default DateFilter;
