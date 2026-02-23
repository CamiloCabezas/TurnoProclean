import { useState } from "react";

const Crear_empleado = () => {

    // Aca lo ideal es que se crea el usuario luego de creado el usuario se creera el empleado

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        genero: "O",
        years: "",
        nombre: "",
        nit: "",
        descripcion: "",
        direccion: "",
        logo: null,
    })

    const handleSubmit = () =>{

    }

    const handleChange = (e) => {
        const { name, value, type, files } = e.target
        if (type === "file") {
            setFormData((prev) => ({ ...prev, [name]: files[0] ?? null }))
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }))
        }

        
    }
    return (
<div className="signin-bg">
            <div className="signin-card">
                <h1 className="signin-title">Registro de empleado para tu empresa</h1>
                <p className="signin-subtitle">
                    Completa los datos del usuario y la informacion adicional
                </p>

                <form className="signin-form" onSubmit={handleSubmit}>

                    <h2 className="signin-section-title">Datos de usuario</h2>

                    <div className="signin-field-group">
                        <label className="signin-label" htmlFor="username">
                            Nombre de usuario
                        </label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            className="signin-input"
                            placeholder="Ej: empresa_admin"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="signin-field-group">
                        <label className="signin-label" htmlFor="email">
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="signin-input"
                            placeholder="correo@empresa.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="signin-field-group">
                        <label className="signin-label" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className="signin-input"
                            placeholder="Mínimo 8 caracteres"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="signin-field-group">
                        <label className="signin-label" htmlFor="genero">
                            Género
                        </label>
                        <select
                            id="genero"
                            name="genero"
                            value={formData.genero}
                            onChange={handleChange}
                            className="signin-select"
                        >
                            <option value="O">Otro / Prefiero no decir</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </select>
                    </div>

                    <div className="signin-field-group">
                        <label className="signin-label" htmlFor="years">
                            Edad (opcional)
                        </label>
                        <input
                            id="years"
                            type="number"
                            name="years"
                            className="signin-input"
                            placeholder="Ej: 30"
                            min="1"
                            value={formData.years}
                            onChange={handleChange}
                        />
                    </div>
                </form>
        </div>
        </div>
    )
}

export default Crear_empleado;