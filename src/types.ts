export interface user_return {
  sub: string; // Identificador del sujeto (subjet)
  id: string; // Identificador único del usuario
  id_usuario: string; // ID específico del usuario
  nombre_usuario: string; // Nombre de usuario
  clave: string; // Clave del usuario (puede ser un hash o similar)
  rol: "DOCENTE" | "ESTUDIANTE"; // Rol del usuario, limitado a 'DOCENTE' o 'ESTUDIANTE'
  fecha_registro: string; // Fecha de registro en formato ISO
  iat: number; // Timestamp de emisión del token
  exp: number; // Timestamp de expiración del token
  jti: string; // Identificador único del token JWT
}
