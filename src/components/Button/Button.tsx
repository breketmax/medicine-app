import React from 'react';
import "./Button.css";

interface ButtonProps{
  children?:React.ReactNode,
  onClick:()=>void,
  status:boolean
}

const Button:React.FC<ButtonProps> = ({children,onClick,status}) => {
  return (
    <button className={status ? "custom-btn add" : "custom-btn"} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;