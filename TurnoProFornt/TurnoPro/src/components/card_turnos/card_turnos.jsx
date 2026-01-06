import { get_empleados_empresa, get_turnos_asignados } from '../../endpoints/api'
import { useState, useEffect } from 'react'
import './card_turnos.css'
import MarcajeModal from '../marcajes_turno/marcajes_turno'
import Asignacion_turno from '../asignacion_turno/asignacion_turno'



const Card_turnos = () => {

    const [turnosAsignados, setturnosAsignados] = useState([])
    const [dates, setDates] = useState([])
    const [openMarcaciones, setOpenMarcaciones] = useState(false);
    const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
    const [openTurno, setOpenTurno] = useState(false)
    const [diaSeleccionado, setDiaSeleccionado] = useState(null);

    const abrirTurnos = (dia) => {
      setDiaSeleccionado(dia);
      setOpenTurno(true)
    }

    const abrirMarcaje = (turno) => {
        setTurnoSeleccionado(turno);
        setOpenMarcaciones(true);
    };
    
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
    return(
            <div className="container-menu">
                {dates.map((date, index) => {
            
                    
                    const turnosDeEseDia = turnosAsignados.filter(
                    (turno) => turno.fecha === toYYYYMMDD(date)
                    );

                    return (
                    <div key={index} className={turnosDeEseDia.length > 0 ? "turnoFecha" : "vacio"}>
                        <div>
                        <h4>{date.toLocaleDateString("es-CO")}</h4>
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
                                    <button className='turno_boton' onClick={()=> abrirTurnos(date.toLocaleDateString("es-CO"))}>
                                        Turno
                                    </button>
                                    <button className='marcaje_boton' onClick={() => abrirMarcaje(turno)}>
                                        Marcaje
                                    </button>
                                    

                                </div>
                                </li>                    
                            
                            ))
                        ) : (
                            <li >No hay turnos asignados</li>
                        )}
                        </ul>
                    </div>
                    );
                })}
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