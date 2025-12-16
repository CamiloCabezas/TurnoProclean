import "./marcajes_turno.css"
import { useState } from "react";

export default function MarcajeModal({ turno, cerrar }) {
    const ahora = new Date();
    const horaActual = ahora.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
    });
    const [tipoMarcaje, setTipoMarcaje] = useState(null);
    return (
        <div className="modal_overlay">
        <div className="modal_content">

            <div className="header">
                <h3>Marcaje</h3>
                <button className="close_btn" onClick={cerrar} aria-label="Cerrar">
                    <span></span>
                    <span></span>
                </button>
            </div>

            <div className="modal_body">
                <p><strong>Empleado:</strong> {turno.empleado}</p>
                <p><strong>Fecha:</strong> {turno.fecha}</p>
                <p>
                    <strong>Turno:</strong> {turno.tipo_turno.nombre}
                    ({turno.tipo_turno.hora_inicio} - {turno.tipo_turno.hora_fin})
                </p>
                <p><strong>Hora Marcaje:</strong> {horaActual}</p>


                <input
                type="checkbox"
                id="Entrada"
                checked={tipoMarcaje === "entrada"}
                onChange={() => setTipoMarcaje("entrada")}
                disabled={tipoMarcaje === "salida"}
                />
                <label htmlFor="Entrada">Marcar Entrada</label>

                <input
                type="checkbox"
                id="Salida"
                checked={tipoMarcaje === "salida"}
                onChange={() => setTipoMarcaje("salida")}
                disabled={tipoMarcaje === "entrada"}
                />
                <label htmlFor="Salida">Marcar Salida</label>



                <div className="container_confirmacion">
                    <form>
                        <button type="submit" className="boton_registro">Registrar marcaje</button>
                    </form>
                </div>
            </div>

        </div>
        </div>
    )
    }
