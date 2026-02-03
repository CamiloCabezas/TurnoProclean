import { use } from "react";
import "./marcajes_turno.css"
import { useState } from "react";
import { post_marcas } from "../../endpoints/api";

export default function MarcajeModal({ turno, cerrar,actualizarDatos }) {
    const ahora = new Date();
    const horaActual = ahora.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
    });
    const [tipoMarcaje, setTipoMarcaje] = useState(null);
    const [cargando, setCargando] = useState(null);
    const [hora, sethora] = useState("")

    const registrarMarcaje = async (e) => {
        e.preventDefault();

        if (!tipoMarcaje) {
            alert("Debes seleccionar si la marcación es de Entrada o Salida");
            return;
        }

        setCargando(true);

        try {
            const result_marcas = await post_marcas(
                turno.id,
                tipoMarcaje,
                horaActual
            );

            alert("Marcaje registrado correctamente ✅");
            await actualizarDatos()
            cerrar();

        } catch (error) {
            console.error(error);
            alert("Error al registrar el marcaje ❌");
        } finally {
            setCargando(false);
        }
    };


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
                onChange={() => setTipoMarcaje(tipoMarcaje === "entrada"?null:"entrada")}
                disabled={tipoMarcaje === "salida"}
                />
                <label htmlFor="Entrada">Marcar Entrada</label>

                <input
                type="checkbox"
                id="Salida"
                checked={tipoMarcaje === "salida"}
                onChange={() => setTipoMarcaje(tipoMarcaje==="salida"?null:'salida')}
                disabled={tipoMarcaje === "entrada"}
                />
                <label htmlFor="Salida">Marcar Salida</label>



                <div className="container_confirmacion">
                    <form onSubmit={registrarMarcaje}>
                        <button type="submit" className="boton_registro">{cargando ? "Registrando...": "Registrar marcaje"}</button>
                    </form>
                </div>
            </div>

        </div>
        </div>
    )
    }
