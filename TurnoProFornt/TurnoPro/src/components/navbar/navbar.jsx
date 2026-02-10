import './navbar.css'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/auth/authSlice'

const Navbar = () => {
    const dispatch = useDispatch()

    const logOut =  () => {
        dispatch(logout())
    }
    return (
        <div className="Container-navbar">
            <h1 className="Title"> TurnoPro</h1>
            <div className='botones-navbar'>
                <a href="">Menu</a>
                <a href="">Personal</a>
                <a href="">Creacion</a>
                <a href="" onClick={logOut}>LogOut</a>
            </div>
        </div>
    )
}

export default Navbar