import React from "react";

type ButtonProps = {
  label: string;
  color: "blue" | "green" | "red" | "yellow" | "purple" | "gray" | "light"; // Agrega los colores que quieras soportar
  onClick?: () => void;
};

const colorClasses: Record<string, string> = {
  blue: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
  green:
    "text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
  red: "text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
  yellow:
    "text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 dark:focus:ring-yellow-900",
  purple:
    "text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900",
  gray: "text-white bg-gray-800 hover:bg-gray-900 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700",
  light:
    "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-600 dark:focus:ring-gray-700",
};

const Button: React.FC<ButtonProps> = ({ label, color, onClick }) => {
  return (
    <button
      type="button"
      className={`font-medium rounded-full text-sm px-5 py-2.5 focus:outline-none focus:ring-4 mb-2 ${colorClasses[color]}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
