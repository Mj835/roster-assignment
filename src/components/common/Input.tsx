import { InputHTMLAttributes, forwardRef, useId } from "react";
import { clsx } from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const autoId = useId();
    const inputId = id || autoId;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            "block w-full rounded-md shadow-sm transition-colors",
            "border-gray-300 bg-white text-gray-900",
            "placeholder:text-gray-400",
            "focus:border-blue-500 focus:ring-blue-500",
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "",
            "disabled:bg-gray-50 disabled:text-gray-500",
            "px-3 py-2 text-base",
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-description`
              : undefined
          }
          {...props}
        />
        {error ? (
          <p className="mt-1 text-sm text-red-600" id={`${inputId}-error`}>
            {error}
          </p>
        ) : helperText ? (
          <p
            className="mt-1 text-sm text-gray-500"
            id={`${inputId}-description`}
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
