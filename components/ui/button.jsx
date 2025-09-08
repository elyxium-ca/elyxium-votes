import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-3 py-2 rounded-xl font-medium transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
