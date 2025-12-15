import "./marcajes_turno.css"

export default function MarcajeModal({ turno, cerrar }) {
    const ahora = new Date();
    const horaActual = ahora.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
    });
    return (
        <div className="modal_overlay">
        <div className="modal_content">

            <h3>Marcaje</h3>

            <p><strong>Empleado:</strong> {turno.empleado}</p>
            <p><strong>Fecha:</strong> {turno.fecha}</p>
            <p>
            <strong>Turno:</strong> {turno.tipo_turno.nombre}
            ({turno.tipo_turno.hora_inicio} - {turno.tipo_turno.hora_fin})
            </p>
            <p><strong>Hora Marcaje:</strong>{horaActual}</p>

            <form>
            <button type="submit">Registrar marcaje</button>
            <button type="button" onClick={cerrar}>Cancelar</button>
            </form>

        </div>
        </div>
    )
    }
