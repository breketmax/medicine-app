import React from 'react';
import "./Select.css"

interface OptionsProps{
  name:string,
  value:string | number
}

interface SelectProps{
  options:OptionsProps[],
  selected?:boolean,
  title?:string
  children?:React.ReactNode,
  onChange?:React.ChangeEventHandler<HTMLSelectElement>,
  defaultValue?:number | string,
  value?:number | string
}

const Select:React.FC<SelectProps> = ({options,selected,title,children,onChange,defaultValue,value}) => {
  return (
    <div className="custom-select-block">
      <span className='select-title'>{title}</span>
      <div className="select-wrapper">
        <select className="custom-select" onChange={onChange}  defaultValue={defaultValue} value={value}>
          {options.map(opt => (<option key={opt.name} value={opt.value} >{opt.name}</option>))}
        </select>
        {children}
      </div>
    </div>  
  
  );
};

export default Select;