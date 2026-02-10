import { useState } from "react"
import "./login.css"
import Input from "../../components/input";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../../components/navbar/navbar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../features/auth/authSlice";
import { login } from "../../endpoints/api";

const Login = () => {
    const dispatch = useDispatch()   
    const navigate = useNavigate()

    const [username , setUsername] = useState("");
    const [password, setPassword] = useState("");

   
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const data = await login({
            username,
            password,
            })


            dispatch(loginSuccess(data))
            navigate('/menu')
        } catch (error) {
            console.error("ERROR LOGIN:", error)
            alert("Credenciales Incorrectas")
        }
        }

    return (
        <div>
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