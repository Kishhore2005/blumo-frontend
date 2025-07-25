import React from "react";

interface SubmitButtonProps {
  text: string;
  onClick: () => void;
  isLoading?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, onClick, isLoading }) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#2563eb", // blue-600
    color: "#ffffff",
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: isLoading ? "not-allowed" : "pointer",
    opacity: isLoading ? 0.7 : 1,
    transition: "background-color 0.3s",
  };

  const hoverStyle: React.CSSProperties = {
    backgroundColor: "#1d4ed8", // blue-700
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      onClick={onClick}
      style={isHovered ? { ...buttonStyle, ...hoverStyle } : buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isLoading}
    >
      {isLoading ? "Sending..." : text}
    </button>
  );
};

export default SubmitButton;
