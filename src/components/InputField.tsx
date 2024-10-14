import { useFormContext } from "react-hook-form";

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
};

export const InputField = ({ label, name, type = "text", placeholder }: InputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext(); // Access RHF context

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`mt-1 block w-full px-3 py-2 border ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message as string}</p>
      )}
    </div>
  );
};
