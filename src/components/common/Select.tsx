import { SelectHTMLAttributes, forwardRef, useId } from "react";
import { clsx } from "clsx";

interface Option {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Option[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, options, id, ...props }, ref) => {
    const autoId = useId();
    const selectId = id || autoId;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={clsx(
            "block w-full rounded-md shadow-sm transition-colors",
            "border-gray-300 bg-white text-gray-900",
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
              ? `${selectId}-error`
              : helperText
              ? `${selectId}-description`
              : undefined
          }
          {...props}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-gray-900"
            >
              {option.label}
            </option>
          ))}
        </select>
        {error ? (
          <p className="mt-1 text-sm text-red-600" id={`${selectId}-error`}>
            {error}
          </p>
        ) : helperText ? (
          <p
            className="mt-1 text-sm text-gray-500"
            id={`${selectId}-description`}
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
