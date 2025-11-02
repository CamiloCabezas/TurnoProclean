
import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL;
const LOGIN_URL = `${BASE_URL}token/`
const MOVIMIENTOS_URL = `${BASE_URL}movimientos/`
const REFRESH_URL = `${BASE_URL}token/refresh/`
const USER_EMPRESA = `${BASE_URL}empleados/`

export const login = async (username, password) => {
    const response = await axios.post(LOGIN_URL,
        {username:username, password:password},
        {withCredentials:true}
    )
    console.log(response.data)
    return response.data
}

// export const refresh_token = async () => {
//     const response = await axios.post(REFRESH_URL,
//         {},
//         {withCredentials : true}
//     )
//     return response.data
// }


export const get_movimientos = async () => {
    const response = await axios.get(MOVIMIENTOS_URL,
        {withCredentials: true}
    )
    
    return response.data
}


export const get_empleados_empresa = async (empresa) => {
    const response = await axios.get(`${USER_EMPRESA}${encodeURIComponent(empresa)}/`);

    return response.data
}





