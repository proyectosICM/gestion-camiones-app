export const server = "http://192.168.1.232:8080";
export const baseURL = `${server}/api/`;
export const loginURL = `${server}/login`

export const fondoURL = "../../styles/fondo.jpg";

/* Usuario URL */
export const usuarioURL = `${baseURL}usuarios`;
export const infoUserURL = `${baseURL}usuarios/info/`;

/* Camiones URL */
export const camionesURL = `${baseURL}camiones`;

/* Checklist Camion */
export const checklistCamionURL = `${baseURL}checkListCamion`;

/* Checklist Carreta */
export const checklistCarretaURL = `${baseURL}checkListCarreta`;

/* RGS (Registro General de Salidas) */
export const rgsURL = `${baseURL}RGS`;
export const rgsByUserAndStateURL = `${rgsURL}/findByUserAndEstado`;

//Observaciones
export const obsURL = `${baseURL}Obs`;
export const obsxRgsURL = `${obsURL}/xRGS`;

//Registro Cambio de llantas de Salidas
export const cambioLlantasURL = `${baseURL}cambio-llantas`;

//Observaciones
export const FallasImagenURL = `${baseURL}fallas-imagen`;
export const EnviarImagenURL = `${baseURL}fallas-imagen/guardar-imagen`;
