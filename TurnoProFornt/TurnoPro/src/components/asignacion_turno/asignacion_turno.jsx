import { useEffect, useState } from "react";
import "./asignacion_turno.css"
import { get_tipo_turnos, get_empleados_empresa } from "../../endpoints/api";

const Asignacion_turno = ({ dia, cerrar }) => {
  const [tiposTurnos, setTipoTurnos] = useState([])
  const [turnoSeleccionado, setTurnoSeleccionado] = useState("")
  const [empleados, setEmpleados] = useState([])
  const [empleadoSeleccionado, setempleadoSeleccionado] = useState("")

  useEffect(() =>{
    const tipoTurnos = async () => {
      const dataEmpleados = await get_empleados_empresa("Chayas Peluqueria")
      const dataturnos = await get_tipo_turnos()
      if(dataturnos && dataEmpleados){
        setTipoTurnos(dataturnos)
        setEmpleados(dataEmpleados)
        
      }
      else{
        console.log("No hay turnos creados");
        
      }
    }
    tipoTurnos()
  }, [])

  return (
    <div className="modal_overlay">
      <div className="modal_content">
        <h3>Asignación turno</h3>
        <p>Día: {dia}</p>
        <label>Tipo de Turno</label>

          <select
            value={turnoSeleccionado}
            onChange={(e) => setTurnoSeleccionado(e.target.value)}
          >
            <option value="">-- Selecciona un turno --</option>

            {tiposTurnos.map((turno) => (
              <option key={turno.id} value={turno.id}>
                {turno.nombre} ({turno.hora_inicio} - {turno.hora_fin})
              </option>
            ))}
          </select>
        <label>Colaborador</label>

          <select
            value={empleadoSeleccionado}
            onChange={(e) => setempleadoSeleccionado(e.target.value)}
          >
            <option value="">-- Selecciona un Colaborador --</option>

            {empleados.map((emple) => (
              <option key={emple.id} value={emple.id}>
                {emple.nombre} 
              </option>
            ))}
          </select>

        <button onClick={cerrar}>Cerrar</button>
      </div>
    </div>
  );
};

export default Asignacion_turno;