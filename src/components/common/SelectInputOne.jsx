import React from "react";

const SelectInputOne = ({
  label,
  name,
  options,
  value,
  onChange,
  onBlur,
  required,
  ErrorMessage,
}) => {
  const inputClassSelect =
    "w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-red-800";

  return (
    <div>
      <label className="block text-xs font-semibold text-grey mb-1">
        {/* {label} */}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        className={inputClassSelect}
        style={{
          appearance: "none", // Remove the native dropdown arrow
          WebkitAppearance: "none", // For Safari
          MozAppearance: "none", // For Firefox
        }}
      >
        <option value=""> {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {ErrorMessage && (
        <ErrorMessage
          name={name}
          component="div"
          className="text-red-500 text-xs mt-1"
        />
      )}
    </div>
  );
};

export default SelectInputOne;
