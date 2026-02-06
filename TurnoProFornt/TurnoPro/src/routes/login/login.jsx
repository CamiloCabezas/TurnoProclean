import { useState } from "react"
import "./login.css"
import Input from "../../components/input";
import "bootstrap-icons/font/bootstrap-icons.css";
import { login } from "../../endpoints/api";
import Navbar from "../../components/navbar/navbar";

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
        <div>
            <Navbar/>
            <div className="login-bg">
                
                <div className="login-card">
                    <h2 className="">Iniciar sesión</h2>
                    <form onSubmit={handleSubmit}>
                    <Input 
                    value = {username}
                    type = "Usuario"
                    placeholder = "Pepito1234"
                    label = "Usuario"
                    onChange={(e) => setUsername(e.target.value)}
                    />

                    <Input
                        value = {password}
                        type = "password"
                        placeholder = "••••••••••••"
                        label = "Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />


                    <button type="submit" className="btn-login" >
                        Ingresar
                    </button>
                    </form>
                </div>
                </div>
        </div>

    )
}

export default Login