
import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL;
const LOGIN_URL = `${BASE_URL}token/`
const MOVIMIENTOS_URL = `${BASE_URL}movimientos/`
const REFRESH_URL = `${BASE_URL}token/refresh/`
const USER_EMPRESA = `${BASE_URL}empleados/`
const TURNOS_EMPRESA = `${BASE_URL}TurnosAsignados/`
const MARCAJES = `${BASE_URL}maracaje_turno/`

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

export const get_turnos_asignados = async (empresa) => {
    const body = {
        fecha_inicio : "2025-11-12",
        fecha_fin: "2025-11-19"
    }
    const response = await axios.post(`${TURNOS_EMPRESA}${encodeURIComponent(empresa)}/`, body)
    return response.data
}

export const post_marcas = async (turno_id, tipo_marca, hora_marca) => {
    const body = {
        turno_id : turno_id,
        tipo_marca : tipo_marca,
        hora_marca : hora_marca
    }

    const response = await axios.post(`${MARCAJES}`, body)
    return response.data
}




