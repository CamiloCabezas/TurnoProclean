import { Navigate } from "react-router-dom";
import Error_404 from "./components/error_404/error_404";

const PrivateRoute = ({children}) => {
    const user = localStorage.getItem("user");
    if(!user){
        return (
            <div>
                <Error_404/>
            </div>
        )

    }
    return children
}


export default PrivateRoute