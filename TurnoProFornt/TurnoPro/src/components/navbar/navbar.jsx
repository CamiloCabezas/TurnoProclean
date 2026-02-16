import './navbar.css'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/auth/authSlice'
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const logOut =  () => {
        dispatch(logout())
        navigate("/login")
    }
    return (
        <div className="Container-navbar">
            {pathname === "/signin"  ? <h1 className="Title"> TurnoPro</h1> : (
                <>
                <h1 className="Title"> TurnoPro</h1>
                <div className='botones-navbar'>
                <a href="">Menu</a>
                <a href="">Personal</a>
                <a href="">Creacion</a>
                
            </div>
            <div className='logout'>
                <button className='btn_logout' onClick={logOut}>LogOut</button>
            </div></>
            )}
            
        </div>
    )
}

export default Navbar