import React from "react";

type InputProps = {
  id: string;
  label?: string;
  size?: "small" | "default" | "large";
  state?: "default" | "success" | "error";
  placeholder?: string;
  helperText?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const sizeClasses: Record<string, string> = {
  small: "p-2 text-xs",
  default: "p-2.5 text-sm",
  large: "p-4 text-base",
};

const stateClasses: Record<string, string> = {
  default:
    "border-gray-300 transition-all focus:ring-blue-500 focus:border-blue-500",
  success:
    "border-green-500 transition-all focus:ring-green-500 focus:border-green-500",
  error:
    "border-red-500 transition-all focus:ring-red-500 focus:border-red-500",
};

const Input: React.FC<InputProps> = ({
  id,
  label,
  size = "default",
  placeholder,
  state = "default",
  helperText,
  value,
  onChange,
}) => {
  return (
    <div className="mb-6">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <input
        type="text"
        placeholder={placeholder}
        id={id}
        className={`block w-full ${sizeClasses[size]} text-gray-900 outline-none border rounded-lg bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${stateClasses[state]}`}
        value={value}
        onChange={onChange}
      />
      {helperText && (
        <p
          className={`mt-1 text-sm ${
            state === "error"
              ? "text-red-500"
              : state === "success"
                ? "text-green-500"
                : "text-gray-500"
          }`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
