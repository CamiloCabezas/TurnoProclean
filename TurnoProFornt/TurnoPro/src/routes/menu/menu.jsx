import './menu.css'
import { get_empleados_empresa, get_turnos_asignados } from '../../endpoints/api'
import { useState, useEffect } from 'react'
import DateFilter from '../../components/filters/filters'
import Card_turnos from '../../components/card_turnos/card_turnos'
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from 'react-redux'

const Menu = () => {

  const {startDate,endDate} = useSelector(state => state.filtros)


    const [dates, setDates] = useState([])
    // 



  function toYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}


  // Esto estara mal pero es para pruebas -----------------
  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const listDates = [];
    let current = new Date(start)
    while (current <= end) {
      const formattedDate = current.toISOString().split('T')[0];
      listDates.push(formattedDate);
      current.setDate(current.getDate() + 1);
    }
    

    setDates(listDates)
    
  },[startDate,endDate])
// --------------------------------------------------------


    return (
  <div className="menu">
    <div className='title'>
      <h1>Personal de Operaciones</h1>
    </div>

    <DateFilter />
    <Card_turnos dates={dates}/>

  </div>
);
}


export default Menu