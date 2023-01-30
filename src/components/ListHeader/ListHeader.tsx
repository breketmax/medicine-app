import React, { useEffect, useState } from 'react';
import "./ListHeader.css"
import {ReactComponent as Increase} from "./increase.svg";
import {ReactComponent as Decrease} from "./decrease.svg";
import { useAppDispatch } from '../../hooks/redux';
import { changeFilter } from '../../store/reducers/SupplementSlice';


const ListHeader:React.FC = () => {
  const [nameFilter,setNameFilter] = useState<string>("");
  const [priceFilter,setPriceFilter] = useState<string>("");
  const dispatch = useAppDispatch();

  const nameFilterHandle = () => {
    setPriceFilter("");
    setNameFilter(prevState =>{
      if(prevState === "GoodsCommercialName_increase"){
        return "GoodsCommercialName_decrease"
      }  
      return "GoodsCommercialName_increase"
    })
  }

  const priceFilterHandle = () => {
    setNameFilter("");
    setPriceFilter(prevState =>{
      if(prevState === "CurrentPrices_increase"){
        return "CurrentPrices_decrease";
      }  
      return "CurrentPrices_increase";
    })
  }

  useEffect(()=>{
    dispatch(changeFilter(nameFilter+priceFilter))
  },[nameFilter,priceFilter]);

  return (
    <div className="supplement-header">
      <div className={ nameFilter? "name-header selected" : "name-header"}>Биодобавка <button onClick={nameFilterHandle}>{nameFilter === "GoodsCommercialName_decrease" ? <Decrease/>: <Increase/>}</button></div>
      <div className="description-header">Описание</div>
      <div className={ priceFilter? "price-header selected" : "price-header"}>Цена за шт., ₽<button onClick={priceFilterHandle}>{priceFilter === "CurrentPrices_decrease" ? <Increase/>: <Decrease/>}</button></div>
    </div>
  );
};

export default ListHeader;