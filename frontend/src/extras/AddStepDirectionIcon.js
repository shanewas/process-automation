import React from "react";

const AddStepDirectionIcon = ({ color = "red", reverse = false, ...props }) => {
  return (
    <svg
      style={{ ...(reverse ? { transform: "rotateX(180deg)" } : {}) }}
      width="37"
      height="23"
      viewBox="0 0 37 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.8 4H7.2V7.2H4V8.8H7.2V12H8.8V8.8H12V7.2H8.8V4ZM8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM8 14.4C4.472 14.4 1.6 11.528 1.6 8C1.6 4.472 4.472 1.6 8 1.6C11.528 1.6 14.4 4.472 14.4 8C14.4 11.528 11.528 14.4 8 14.4Z"
        fill={color}
      />
      <path
        d="M29.3869 9.5681C30.9802 11.6857 31.632 14.1987 31.4577 16.645L36.4988 17.3573L29.307 22.7682L23.8961 15.5765L28.9652 16.2928C29.0564 14.4846 28.5676 12.6374 27.3892 11.0711C25.2609 8.24237 21.6054 7.22593 18.425 8.30476L17.6234 5.94198C21.8073 4.53362 26.5913 5.85235 29.3869 9.5681Z"
        fill={color}
      />
    </svg>
  );
};

export default AddStepDirectionIcon;
