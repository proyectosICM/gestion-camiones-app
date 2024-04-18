export const server = "http://192.168.1.232:8080";
export const baseURL = `${server}/api/`;
export const loginURL = `${server}/login`

export const fondoURL = "../../styles/fondo.jpg";

/* Usuario URL */
export const usuarioURL = `${baseURL}usuarios`;
export const infoUserURL = `${baseURL}usuarios/info/`;

/* Camiones URL */
export const camionesURL = `${baseURL}camiones`;
export const camionesByEmpresaAndSedeURL = `${baseURL}camiones/byEmpresaAndSedeAndEstado`;
export const camionesByEmpresaAndSedeAndTypeURL = `${baseURL}camiones/byEmpresaAndSedeAndEstadoAndTipo`;
/* Checklist Camion */
export const checklistCamionURL = `${baseURL}checkListCamion`;

/* Checklist Carreta */
export const checklistCarretaURL = `${baseURL}checkListCarreta`;

/* Checklist Expreso Camion */
export const checklistExpresoCamionURL = `${baseURL}expreso-camion`;
export const clecfindByCamionesModelIdURL = `${checklistExpresoCamionURL}/findByCamionesModelId`;

/* Checklist Expreso Camion */
export const checklistExpresoCarretaURL = `${baseURL}expreso-carreta`;
export const clecarrfindByCamionesModelIdURL = `${checklistExpresoCarretaURL}/findByCamionesModelId`;

/* RGS (Registro General de Salidas) */
export const rgsURL = `${baseURL}RGS`;
export const rgsByUserAndStateURL = `${rgsURL}/findByUserAndEstado`;
export const rgsChecklistURL = `${rgsURL}/checklist`

//Observaciones
export const obsURL = `${baseURL}Obs`;
export const obsxRgsURL = `${obsURL}/xRGS`;


//Registro Cambio de llantas de Salidas
export const cambioLlantasURL = `${baseURL}cambio-llantas`;

//Observaciones
export const FallasImagenURL = `${baseURL}fallas-imagen`;
export const EnviarImagenURL = `${baseURL}fallas-imagen/guardar-imagen`;
