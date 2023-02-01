import React from 'react';
import "./Input.css"


interface InputProps{
  title?:string,
  onChange:()=>void,
  value:string
}

const Input:React.FC<InputProps> = ({onChange,title,value}) => {
  return (
    <div className="custom-input-block">
      <span className='input-title'>{title}</span>
      <div className="input-wrapper">
          <input value={value} className="custom-input"/>
      </div>
    </div>  
  
  );
};

export default Input;