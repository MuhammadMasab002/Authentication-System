import React, { useState } from "react";
import clsx from "clsx";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

export const INPUT_VARIANTS = {
  DEFAULT: "default",
  ERROR: "error",
  SUCCESS: "success",
  DISABLED: "disabled",
};

export const INPUT_SIZES = {
  SM: "sm",
  MD: "md",
  LG: "lg",
};

export const INPUT_TYPES = {
  TEXT: "text",
  EMAIL: "email",
  PASSWORD: "password",
  SEARCH: "search",
  NUMBER: "number",
};

const CustomFormInput = ({
  /* Core */
  label,
  type = INPUT_TYPES.TEXT,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,

  /* Variant & size */
  variant = INPUT_VARIANTS.DEFAULT,
  size = INPUT_SIZES.MD,

  /* Icons */
  leftIcon = null,
  rightIcon = null,

  /* Password toggle */
  enablePasswordToggle = true,

  /* States */
  disabled = false,
  errorMessage = "",

  /* Accessibility */
  id,
  autoComplete = "off",

  /* Styling */
  className = "",
  inputClassName = "",
}) => {
  const isPassword = type === INPUT_TYPES.PASSWORD;
  const [showPassword, setShowPassword] = useState(false);

  /* ================= BASE ================= */
  const baseWrapper =
    "flex items-center gap-2 rounded border transition focus-within:ring-2";

  const baseInput = "w-full bg-transparent outline-none placeholder-gray-400";

  /* ================= SIZE ================= */
  const sizeStyles = {
    [INPUT_SIZES.SM]: "px-2 py-1 text-sm",
    [INPUT_SIZES.MD]: "px-3 py-2 text-base",
    [INPUT_SIZES.LG]: "px-4 py-3 text-lg",
  };

  /* ================= VARIANT ================= */
  const variantStyles = {
    [INPUT_VARIANTS.DEFAULT]:
      "border-gray-300 focus-within:border-blue-500 focus-within:ring-blue-400",

    [INPUT_VARIANTS.ERROR]:
      "border-red-500 focus-within:border-red-500 focus-within:ring-red-400",

    [INPUT_VARIANTS.SUCCESS]:
      "border-green-500 focus-within:border-green-500 focus-within:ring-green-400",

    [INPUT_VARIANTS.DISABLED]: "border-gray-200 bg-gray-100 cursor-not-allowed",
  };

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label
          htmlFor={id || name}
          className="block mb-1 font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Wrapper */}
      <div
        className={clsx(
          baseWrapper,
          sizeStyles[size],
          variantStyles[variant],
          disabled && "opacity-60",
          className
        )}
      >
        {/* Left Icon */}
        {leftIcon && <span className="text-gray-500">{leftIcon}</span>}

        {/* Input */}
        <input
          id={id || name}
          type={isPassword && showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          className={clsx(baseInput, inputClassName)}
        />

        {/* Password Toggle Icon */}
        {isPassword && enablePasswordToggle && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? (
              <VisibilityOffRoundedIcon />
            ) : (
              <VisibilityRoundedIcon />
            )}
          </button>
        )}

        {/* Right Icon (non-password) */}
        {!isPassword && rightIcon && (
          <span className="text-gray-500">{rightIcon}</span>
        )}
      </div>

      {/* Error Message */}
      {errorMessage && variant === INPUT_VARIANTS.ERROR && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default CustomFormInput;
