import './menu.css'
import { get_empleados_empresa } from '../../endpoints/api'
import { useState, useEffect } from 'react'
import DateFilter from '../../components/filters/filters'
import "react-datepicker/dist/react-datepicker.css";

const Menu = () => {
    const [empleados, setEmpleados] = useState([])
    // Prueba
    const [dates, setDates] = useState([])
    // 

  useEffect(() => {
    const fetchEmpleados = async () => {
      const data = await get_empleados_empresa("Chayas Peluqueria");
      if (data) {
        setEmpleados(data);
        console.log("Empleados cargados:", data);
      } else {
        console.log("No se pudieron cargar los empleados.");
      }
    };

    fetchEmpleados();
  }, []);



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
      <DateFilter />
      <div className="container-menu">
        <h1 className="title">Personal De Operación</h1>

        {dates.map((date, index) => (
          <div key={index} className="fecha-section">
            <h4>{date.toLocaleDateString("es-CO")}</h4>
            <ul>
              {empleados.map((empleado, i) => (
                <li key={i}>{empleado.nombre}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu