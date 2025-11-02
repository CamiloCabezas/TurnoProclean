import './menu.css'
import { get_empleados_empresa } from '../../endpoints/api'
import { useState, useEffect } from 'react'

const Menu = () => {
    const [empleados, setEmpleados] = useState([])

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

    return (
        <div className="menu">
            <div className="container-menu">
                <h1 className="title">Personal De Operacion</h1>

                <ul>
                    {empleados.map((empleado, index) => (
                        <li key={index}>{empleado.nombre}</li>
                    ))} 
                </ul>

            </div>
            
            

        </div>
    )
}

export default Menu