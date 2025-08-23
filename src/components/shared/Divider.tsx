import React, { HTMLAttributes } from "react";

/**
 * Divider component
 * @returns
 */

// Divider variant
type DividerVariant = "solid" | "dashed" | "dotted";

// Divider component props
type DividerProps = {
  className?: HTMLAttributes<HTMLDivElement>["className"];
  children?: React.ReactNode;
  position?: "start" | "end" | "center";
  variant?: DividerVariant;
  height?: number;
};

export default function Divider({
  className,
  children,
  position = "center",
  variant = "solid",
  height,
}: DividerProps) {
  return (
    <div className={`relative flex items-center ${className}`}>
      {position !== "start" && (
        <div
          className={`flex-grow border-t-2 border-${variant} border-gray-300`}
          style={height ? { borderWidth: `${height}px !important` } : {}}
        />
      )}
      {children && (
        <span
          className={`whitespace-nowrap ${
            position === "center"
              ? "mx-2.5"
              : position === "start"
              ? "mr-2.5"
              : "ml-2.5"
          }`}
        >
          {children}
        </span>
      )}

      {position !== "end" && (
        <div
          className={`flex-grow border-t-2 border-${variant} border-gray-300`}
          style={height ? { borderWidth: `${height}px !important` } : {}}
        />
      )}
    </div>
  );
}
