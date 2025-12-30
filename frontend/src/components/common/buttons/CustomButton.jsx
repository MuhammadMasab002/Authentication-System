import React from "react";
import clsx from "clsx";

export const BUTTON_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  OUTLINE: "outline",
  TEXT_PRIMARY: "text-primary",
  TEXT_DANGER: "text-danger",
  DANGER: "danger",
  SUCCESS: "success",
};

export const BUTTON_SIZES = {
  SM: "sm",
  MD: "md",
  LG: "lg",
};

const CustomButton = ({
  text,
  type = "button",

  // Icons
  leftIcon,
  rightIcon,
  iconOnly,

  // Variant & size
  variant = BUTTON_VARIANTS.PRIMARY,
  size = BUTTON_SIZES.MD,
  fullWidth = true,

  // States
  disabled = false,
  loading = false,

  // Accessibility
  ariaLabel,

  // Style
  className = "",

  // Events
  onClick,
}) => {
  /* ================= BASE ================= */
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  /* ================= SIZE ================= */
  const sizeStyles = {
    [BUTTON_SIZES.SM]: "text-sm px-3 py-1.5",
    [BUTTON_SIZES.MD]: "text-base px-4 py-2",
    [BUTTON_SIZES.LG]: "text-lg px-6 py-3",
  };

  /* ================= VARIANT ================= */
  const variantStyles = {
    [BUTTON_VARIANTS.PRIMARY]:
      "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500 disabled:bg-blue-300",

    [BUTTON_VARIANTS.SECONDARY]:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 focus:ring-gray-400 disabled:bg-gray-100",

    [BUTTON_VARIANTS.OUTLINE]:
      "border border-gray-400 text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-400 disabled:opacity-50",

    [BUTTON_VARIANTS.TEXT_PRIMARY]:
      "bg-transparent text-blue-600 hover:underline focus:ring-blue-400 disabled:text-blue-300",

    [BUTTON_VARIANTS.DANGER]:
      "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500 disabled:bg-red-300",
    [BUTTON_VARIANTS.TEXT_DANGER]:
      "bg-transparent text-red-600 hover:underline focus:ring-red-400 disabled:text-red-300",

    [BUTTON_VARIANTS.SUCCESS]:
      "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-green-500 disabled:bg-green-300",
  };

  const iconOnlyStyles = "p-2 rounded-full";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel || text}
      className={clsx(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth && "w-full",
        iconOnly && iconOnlyStyles,
        className
      )}
    >
      {/* Loading */}
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}

      {!loading && leftIcon && <span>{leftIcon}</span>}
      {!loading && text && <span>{text}</span>}
      {!loading && iconOnly && <span>{iconOnly}</span>}
      {!loading && rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};

export default CustomButton;
