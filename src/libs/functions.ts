export function generarNumeroAleatorio(): number {
    // Obtiene la parte final de la marca de tiempo para asegurar la unicidad
    const timestampPart = Date.now() % 10000; // Últimos 4 dígitos de la marca de tiempo
    // Genera un número aleatorio de 3 dígitos
    const randomPart = Math.floor(Math.random() * 900) + 100; // Un número entre 100 y 999
    // Combina ambas partes para formar un número de 7 dígitos
    const numeroAleatorio = parseInt(`${randomPart}${timestampPart}`);
    return numeroAleatorio;
  }
  
  