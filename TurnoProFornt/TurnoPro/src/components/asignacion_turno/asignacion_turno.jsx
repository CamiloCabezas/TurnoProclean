import { useEffect, useState } from "react";
import "./asignacion_turno.css"
import { get_tipo_turnos, get_empleados_empresa, post_asignacion_turno } from "../../endpoints/api";

const Asignacion_turno = ({ dia, cerrar }) => {
  const [tiposTurnos, setTipoTurnos] = useState([])
  const [turnoSeleccionado, setTurnoSeleccionado] = useState([])
  const [empleados, setEmpleados] = useState([])
  const [empleadoSeleccionado, setempleadoSeleccionado] = useState([])
  const [cargando, setCargando] =  useState(false)

  useEffect(() =>{
    const tipoTurnos = async () => {
      const dataEmpleados = await get_empleados_empresa("Chayas Peluqueria")
      const dataturnos = await get_tipo_turnos()
      if(dataturnos && dataEmpleados){
        setTipoTurnos(dataturnos)
        setEmpleados(dataEmpleados)
        
        
      }
      else{
        alert("No hemos encontrado ni Colaboradores ni turnos")
        
      }
    }
    tipoTurnos()
  }, [])

  const formatearFechaParaBackend = (fecha) => {
  const [day, month, year] = fecha.split("/")
  return `${year}-${month}-${day}`
}


  const AsignarTurno = async (e) => {
    e.preventDefault()

    if (turnoSeleccionado === "" || empleadoSeleccionado === ""){
      alert("Debes seleccionar un turno y un colaborador")
    }

 

    setCargando(true)

    try {
      const fechaBackend = formatearFechaParaBackend(dia)

      const asignacion = await post_asignacion_turno(
        empleadoSeleccionado,
        turnoSeleccionado,
        fechaBackend // ✅ formato correcto
      )

      alert("Se Asigno Correctamente ✅")
      cerrar()
    } catch (error) {
      alert("No se pudo asginar el turno ❌")
    } finally {
      setCargando(false)
    }




  }

  return (
    <div className="modal_overlay">
      <div className="modal_content">
        <h3>Asignación turno</h3>
        <button className="close_btn" onClick={cerrar} aria-label="Cerrar">
          <span></span>
          <span></span>
        </button>
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
          <div>
            <form onSubmit={AsignarTurno}>
              <button type="submit">
                {cargando ? "Asignando...":"Asignar Turno"}
              </button>
            </form>
          </div>
      </div>
    </div>
  );
};

export default Asignacion_turno;