

const Signin = () => {
    return (
        <div>
            <h1>Bienvenido a TurnoPro</h1>
            <p>Para continuar, por favor ingresa tu información de registro.</p>
            <form>
                <input type="text" placeholder="Nombre" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Contraseña" />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    )
}

export default Signin;