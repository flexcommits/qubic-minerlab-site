import React from "react";

// Styles
import "./style.scss";

interface ButtonProps {
  text?: string;
  width?: string;
  height?: string;
  className?: string;
  icon?: any;
  onClick?: (e:any) => void;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  disabled?: boolean;
}

const Button = ({
  text,
  width = "103px",
  height = "38px",
  className,
  onClick,
  icon,
  type = "button",
  disabled = false,
}: ButtonProps) => {
  return (
    <section
      className={`relative ${className}`}
      style={{ width: width, height: height }}
    >
      <img
        className="absolute"
        src="/assets/vectorArts/btn-vector.png"
        alt="vector"
      />

      <img
        className="absolute bottom-0 rotate-[270deg]"
        src="/assets/vectorArts/btn-vector.png"
        alt="vector"
      />
      <img
        className="absolute right-0 rotate-90"
        src="/assets/vectorArts/btn-vector.png"
        alt="vector"
      />

      <img
        className="absolute right-0 bottom-0 rotate-180"
        src="/assets/vectorArts/btn-vector.png"
        alt="vector"
      />

      <button
        type={type}
        onClick={onClick ? (e) => onClick(e) : () => false}
        className={`primary-btn flex items-center justify-center mx-auto ${disabled ? 'disabled' : ''}`}
        disabled={disabled}
      >
        <div className={`${text ? 'mr-2' : ''} text-[24px]`}>{icon}</div>
        {text}
      </button>
    </section>
  );
};

export default Button;
