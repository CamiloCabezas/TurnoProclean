import { useState } from "react"
import "./login.css"
import Input from "../../components/input";
import "bootstrap-icons/font/bootstrap-icons.css";
import { login } from "../../endpoints/api";

const Login = () => {

    const [username , setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password)
        setUsername("")
        setPassword("")
    }

    return (
    <div className="d-flex justify-content-center align-items-center vh-100 login-bg">
        <div className="card p-4 shadow-lg login-card">
            <h2 className="text-center mb-4 text-light">Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
            <Input 
            value = {username}
            type = "email"
            placeholder = "Example@mail.com"
            label = "Email"
            onChange={(e) => setUsername(e.target.value)}
            />

            <Input
                value = {password}
                type = "password"
                placeholder = "••••••••••••"
                label = "Password"
                onChange={(e) => setPassword(e.target.value)}
            />


            <button type="submit" className="btn btn-login w-100 mt-3" >
                Ingresar
            </button>
            </form>
        </div>
        </div>

    )
}

export default Login