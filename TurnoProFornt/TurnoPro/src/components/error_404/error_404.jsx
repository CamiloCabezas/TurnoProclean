import { useNavigate } from "react-router-dom"
import "./error_404.css"

const Error_404 = () =>{
    const navigate = useNavigate()
    const cerrar = () => {
        console.log("Entre");
        
        navigate("/login")
    }

    return(
        <div className="modal_overlay1">
            <div className="modal_content">
                <div className="header-error">
                    <h3>Error al entrar</h3>
                    <button className="close_btn" onClick={cerrar} aria-label="Cerrar">
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className="body">
                    <p>Debes Entrar con tu cuenta para que puedas ingresar</p>
                    <button onClick={cerrar} className="btn_aceptar">Ok, Entiendo</button>
                </div>
            </div>
        </div>
    )
}

export default Error_404