    import React, { useState } from "react";
    import DatePicker from "react-datepicker";
    import "./filters.css"; 
    import "react-datepicker/dist/react-datepicker.css";

const DateFilter = () => {
    
    const [dateInicio, setDateInicio] = useState("");
    console.log(dateInicio);
    const [dateFin, setDateFin] = useState("");
    console.log(dateFin);
    

    return (
        <div className="date-filter-container">
        <h4>Selecciona el rango de fechas</h4>
            <label>Desde: </label>
            <input 
            type="date"
            onChange={(e) => setDateInicio(e.target.value)}/>
            <label>Hasta: </label>
            <input 
            type="date"
            onChange={(e) => setDateFin(e.target.value)}/>


        </div>
    );
    };

    export default DateFilter;
