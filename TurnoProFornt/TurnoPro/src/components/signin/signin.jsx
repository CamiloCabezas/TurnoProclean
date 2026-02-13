import "./signin.css"

const Signin = () => {
    return (
        <div className="signin-bg">
            <div className="signin-card">
                <h1 className="signin-title">Registro de empresa en TurnoPro</h1>
                <p className="signin-subtitle">
                    Completa los datos del usuario administrador y de la empresa.
                </p>

                <form className="signin-form">
                    {/* Datos de usuario (cuenta con la que la empresa inicia sesión) */}
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
                        />
                    </div>

                    <div className="signin-field-group">
                        <label className="signin-label" htmlFor="genero">
                            Género
                        </label>
                        <select
                            id="genero"
                            name="genero"
                            defaultValue="O"
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
                        />
                    </div>

                    {/* Datos de la empresa */}
                    <h2 className="signin-section-title">Datos de la empresa</h2>

                    <div className="signin-field-group">
                        <label className="signin-label" htmlFor="nombre">
                            Nombre de la empresa
                        </label>
                        <input
                            id="nombre"
                            type="text"
                            name="nombre"
                            className="signin-input"
                            placeholder="Ej: TurnoPro S.A."
                        />
                    </div>

                    <div className="signin-field-group">
                        <label className="signin-label" htmlFor="nit">
                            NIT / Identificación
                        </label>
                        <input
                            id="nit"
                            type="text"
                            name="nit"
                            className="signin-input"
                            placeholder="Ej: 123456789-0"
                        />
                    </div>

                    <div className="signin-field-group">
                        <label className="signin-label" htmlFor="descripcion">
                            Descripción de la empresa (opcional)
                        </label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            className="signin-textarea"
                            placeholder="Cuéntanos brevemente a qué se dedica tu empresa"
                        />
                    </div>

                    <div className="signin-field-group">
                        <label className="signin-label" htmlFor="direccion">
                            Dirección de la empresa
                        </label>
                        <input
                            id="direccion"
                            type="text"
                            name="direccion"
                            className="signin-input"
                            placeholder="Calle, número, ciudad"
                        />
                    </div>

                    <div className="signin-field-group">
                        <label className="signin-label" htmlFor="logo">
                            Logo de la empresa (opcional)
                        </label>
                        <input
                            id="logo"
                            type="file"
                            name="logo"
                            className="signin-file-input"
                            accept="image/*"
                        />
                    </div>

                    <button type="submit" className="signin-submit">
                        Registrarse como empresa
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Signin