import './menu.css'
import { get_empleados_empresa, get_turnos_asignados } from '../../endpoints/api'
import { useState, useEffect } from 'react'
import DateFilter from '../../components/filters/filters'
import "react-datepicker/dist/react-datepicker.css";

const Menu = () => {
    const [turnosAsignados, setturnosAsignados] = useState([])
    // Prueba
    const [dates, setDates] = useState([])
    // 

  useEffect(() => {
    const fetchEmpleados = async () => {
      const data = await get_turnos_asignados("Chayas Peluqueria");
      if (data) {
        setturnosAsignados(data);
        console.log("Empleados cargados:", data);
      } else {
        console.log("No se pudieron cargar los empleados.");
      }
    };

    fetchEmpleados();
  }, []);

  function toYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}


  // Esto estara mal pero es para pruebas -----------------
  useEffect(() => {
    const start = new Date("2025-11-13");
    const end = new Date("2025-11-20");
    const listDates = [];
    let current = new Date(start)
    while(current <= end){
      listDates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    setDates(listDates)
    console.log(listDates);
    
  },[])
// --------------------------------------------------------


    return (
  <div className="menu">
    <div className='title'>
      <h1>Personal de Operaciones</h1>
    </div>

    <DateFilter />

    <div className="container-menu">
      {dates.map((date, index) => {

        console.log(date);
        
        // Filtrar los turnos que coinciden con la fecha
        const turnosDeEseDia = turnosAsignados.filter(
          (turno) => turno.fecha === toYYYYMMDD(date)
        );

        return (
          <div key={index} className="turnoFecha">
            <div>
              <h4>{date.toLocaleDateString("es-CO")}</h4>
            </div>
            

            <ul>
              {turnosDeEseDia.length > 0 ? (
                turnosDeEseDia.map((turno, i) => (
                  <li key={i}>
                    {turno.empleado} — {turno.tipo_turno.nombre} (
                    {turno.tipo_turno.hora_inicio} - {turno.tipo_turno.hora_fin})
                  </li>
                ))
              ) : (
                <li>No hay turnos asignados</li>
              )}
            </ul>
          </div>
        );
      })}
    </div>
  </div>
);
}


export default Menu