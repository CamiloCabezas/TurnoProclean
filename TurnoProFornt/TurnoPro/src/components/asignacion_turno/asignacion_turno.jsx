import "./asignacion_turno.css"

const Asignacion_turno = ({ dia, cerrar }) => {
  return (
    <div className="modal_overlay">
      <div className="modal_content">
        <h3>Asignación turno</h3>
        <p>Día: {dia}</p>

        <button onClick={cerrar}>Cerrar</button>
      </div>
    </div>
  );
};

export default Asignacion_turno;