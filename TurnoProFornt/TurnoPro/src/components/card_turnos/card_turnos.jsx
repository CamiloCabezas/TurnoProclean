import { get_empleados_empresa, get_turnos_asignados } from '../../endpoints/api'
import { useState, useEffect } from 'react'
import './card_turnos.css'
import MarcajeModal from '../marcajes_turno/marcajes_turno'
import Asignacion_turno from '../asignacion_turno/asignacion_turno'



const Card_turnos = (dates) => {

    const [turnosAsignados, setturnosAsignados] = useState([])
    const [openMarcaciones, setOpenMarcaciones] = useState(false);
    const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
    const [openTurno, setOpenTurno] = useState(false)
    const [diaSeleccionado, setDiaSeleccionado] = useState(null);
    
    const abrirTurnos = (dia) => {
        console.log(dia);
        
      setDiaSeleccionado(dia);
      setOpenTurno(true)
    }

    

    const abrirMarcaje = (turno) => {
        setTurnoSeleccionado(turno);
        setOpenMarcaciones(true);
    };
    
    useEffect(() => {
        const fetchEmpleados = async () => {
          const data = await get_turnos_asignados(1, dates.dates);
          if (data) {
            console.log("data");
            setturnosAsignados(data);
          } else {
            alert("No se pudieron cargar los empleados.");
          }
        };
    
        fetchEmpleados();
      }, []);

    
    
    
    return(
            <div className="container-menu">
                {dates.dates.length > 0 ? dates.dates.map((date, index) => {
            
                    
                    const turnosDeEseDia = turnosAsignados.filter(
                    (turno) => turno.fecha === date
                    );
                    return (
                    <div key={index} className={turnosDeEseDia.length > 0 ? "turnoFecha" : "vacio"}>
                        <div>
                        <h4>{date}</h4>
                        </div>
                        

                        <ul>
                        {turnosDeEseDia.length > 0 ? (
                            turnosDeEseDia.map((turno, i) => (
                            
                                <li key={i} className='empaque'>
                                <div className='card_turnoAsignado'>
                                    {turno.empleado} — {turno.tipo_turno.nombre} 
                                    <div>
                                    ( {turno.tipo_turno.hora_inicio} - {turno.tipo_turno.hora_fin})
                                    </div>
                                </div>
                                <div className='marcaciones'>
                                    <div className='marcacion_entrada'>
                                    <p>Marcacion Entrada</p>
                                    {turno.hora_ingreso_real ? turno.hora_ingreso_real : "-.-"}
                                    </div>
                                    <div className='marcaciones_salida'>
                                    <p>Marcacion Salida</p>
                                    {turno.hora_salida_real ? turno.hora_salida_real : "-.-"}
                                    </div>
                                </div>
                                <div className='botones_turno'>
                                    <button className='turno_boton' onClick={()=> abrirTurnos(date)}>
                                        Turno
                                    </button>
                                    <button className='marcaje_boton' onClick={() => abrirMarcaje(turno)}>
                                        Marcaje
                                    </button>
                                    

                                </div>
                                </li>                    
                            
                            ))
                        ) : (
                            <li >No hay turnos asignados
                                                              <div className='botones_turno'>
                                    <button className='turno_boton' onClick={()=> abrirTurnos(date)}>
                                        Turno
                                    </button>
                                    <button className='marcaje_boton' onClick={() => abrirMarcaje(turno)}>
                                        Marcaje
                                    </button>
                                    

                                </div>
                            </li>
                        )}
                        </ul>
                    </div>
                    );
                }): <h2>No hay nada</h2>}
                    {openMarcaciones && turnoSeleccionado && (
                    <MarcajeModal
                        turno={turnoSeleccionado}
                        cerrar={() => {setOpenMarcaciones(false)}}
                    />
                    )}

                    {openTurno && diaSeleccionado &&(
                      <Asignacion_turno
                        dia={diaSeleccionado}
                        cerrar={() => {setOpenTurno(false)}}
                    />
                    )}
                </div>
    )
}


export default Card_turnos;