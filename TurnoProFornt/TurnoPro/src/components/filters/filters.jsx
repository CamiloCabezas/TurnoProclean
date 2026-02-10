import React, { useState } from "react";
import "./filters.css";
import { useDispatch, useSelector } from "react-redux";
import { setStartDate, setEndDate } from "../../features/filtros/filtrosSlice";

const DateFilter = () => {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector(state => state.filtros);

  // 🔹 Estado local (lo que el usuario escribe)
  const [localStartDate, setLocalStartDate] = useState(startDate || "");
  const [localEndDate, setLocalEndDate] = useState(endDate || "");

  const aplicarFiltros = () => {
        

    dispatch(setStartDate(localStartDate));
    dispatch(setEndDate(localEndDate));
  };

  return (
    <div className="date-filter-container">
      <div className="Title_filter">
        <h4 >Selecciona el rango de fechas</h4>
      </div>

      <div className="info">
        <div>
          <label>Desde:</label>
          <input
            type="date"
            value={localStartDate}
            onChange={(e) => setLocalStartDate(e.target.value)}
          />
        </div>

        <div>
          <label>Hasta:</label>
          <input
            type="date"
            value={localEndDate}
            onChange={(e) => setLocalEndDate(e.target.value)}
          />
        </div>
        </div>
        <button onClick={aplicarFiltros} className="aplicar_filtros">
          Aplicar filtros
        </button>
        
      </div>
  );
};

export default DateFilter;
