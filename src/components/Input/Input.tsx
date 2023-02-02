import React from 'react';
import "./Input.css"


interface InputProps{
  title?:string,
  onChange:React.ChangeEventHandler<HTMLInputElement>,
  value:string,
  onBlur?:React.FocusEventHandler<HTMLInputElement>
}

const Input:React.FC<InputProps> = ({onChange,title,value,onBlur}) => {
  return (
    <div className="custom-input-block">
      <span className='input-title'>{title}</span>
      <div className="input-wrapper">
          <input value={value} className="custom-input" onChange={onChange}  onBlur={onBlur}/>
      </div>
    </div>  
  
  );
};

export default Input;