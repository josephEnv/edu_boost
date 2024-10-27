import { motion } from "framer-motion";

// Generador de figuras aleatorias
export const generateShapes = (count: number) => {
  return Array.from({ length: count }).map((_, i) => {
    const size = Math.floor(Math.random() * 200) + 100; // Tamaño entre 20px y 100px
    const colorIndex = Math.floor(Math.random() * 5); // Índice para el color
    const colors = [
      "bg-blue-300",
      "bg-yellow-300",
      "bg-red-300",
      "bg-green-300",
      "bg-purple-300",
    ];

    // Calcular posiciones aleatorias en X e Y
    const xEnd = Math.random() * 1000; // Desplazamiento X aleatorio
    const yEnd = Math.random() * 700; // Desplazamiento Y aleatorio

    // Calcular rotación aleatoria
    const rotation = Math.random() * 360;

    // Pequeño movimiento aleatorio para "temblor" o ajuste después de la animación inicial
    const smallMovementX = Math.random() * 30 - 15; // Movimiento pequeño en X (-15 a 15)
    const smallMovementY = Math.random() * 30 - 15; // Movimiento pequeño en Y (-15 a 15)

    return (
      <motion.div
        key={i}
        className={`${colors[colorIndex]} absolute rounded-full`}
        style={{ width: size, height: size }}
        initial={{ opacity: 0, x: "50%", y: "50%" }} // Inicia desde el centro
        animate={{
          opacity: 1, // Mantener la opacidad constante
          x: xEnd + smallMovementX, // Mover en X a posición aleatoria con pequeño ajuste
          y: yEnd + smallMovementY, // Mover en Y a posición aleatoria con pequeño ajuste
          rotate: rotation, // Rotación estática
        }}
        transition={{
          duration: Math.random() * 4 + 2, // Duración aleatoria de la animación
          ease: "easeInOut", // Efecto de suavizado
        }}
      />
    );
  });
};
