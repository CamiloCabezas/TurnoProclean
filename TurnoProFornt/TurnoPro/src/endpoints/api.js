
import api from "../api/axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const LOGIN_URL = `${BASE_URL}token/`
const MOVIMIENTOS_URL = `${BASE_URL}movimientos/`
const REFRESH_URL = `${BASE_URL}token/refresh/`
const USER_EMPRESA = `${BASE_URL}empleados/`
const TURNOS_EMPRESA = `${BASE_URL}TurnosAsignados/`
const MARCAJES = `${BASE_URL}maracaje_turno/`
const TIPO_TURNOS = `${BASE_URL}tipoTurnos/`
const ASIGNACION_TURNO = `${BASE_URL}asignarTurnos/`
const ID_EMPRESA = `${BASE_URL}id_empresa/`

export const login = async (credentials) => {
    const response = await api.post(LOGIN_URL,credentials
    )
    
    return response.data
}

export const get_id_empresa = async (username) => {
    const response = await api.get(`${ID_EMPRESA}${encodeURIComponent(username)}/`)
    return response.data
}


export const get_movimientos = async () => {
    const response = await api.get(MOVIMIENTOS_URL,
        {withCredentials: true}
    )
    
    return response.data
}


export const get_empleados_empresa = async (empresa) => {
    const response = await api.get(`${USER_EMPRESA}${encodeURIComponent(empresa)}/`);

    return response.data
}

export const get_turnos_asignados = async (empresa, listaFechas) => {
    const body = {
        fecha_inicio: listaFechas.length > 0 ? listaFechas[0] : null,
        fecha_fin: listaFechas.length > 0 ? listaFechas[listaFechas.length - 1] : null
    }
    const response = await api.post(`${TURNOS_EMPRESA}${encodeURIComponent(empresa)}/`, body)
    return response.data
}

export const post_marcas = async (turno_id, tipo_marca, hora_marca) => {
    const body = {
        turno_id : turno_id,
        tipo_marca : tipo_marca,
        hora_marca : hora_marca
    }

    const response = await api.post(`${MARCAJES}`, body)
    return response.data
}

export const post_asignacion_turno = async (empleado_id, tipo_turno, fecha) => {
    
    const body = {
        empleado_id : empleado_id,
        tipo_turno : tipo_turno,
        fecha : fecha
    }

    const response = await api.post(`${ASIGNACION_TURNO}`, body)
    return response.data
}


export const get_tipo_turnos = async () => {
    const response = await api.get(`${TIPO_TURNOS}`)
    return response.data
}





