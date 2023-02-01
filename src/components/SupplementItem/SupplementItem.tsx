import React from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { setModalProduct } from '../../store/reducers/ModalSlice';
import { ISupp } from '../../types/ISupplement';
import Button from '../Button/Button';
import "./SupplementItem.css";


const SupplementItem:React.FC<ISupp> = (supplement) => {
  const dispatch = useAppDispatch();
  const handleModal = (supplement:ISupp) => {
    dispatch(setModalProduct(supplement));
  }
  return (
    <div className="supplement_item">
      <div className="supplement-image"><img src={supplement.Picture} alt="supplement" /></div>
      <div className="supplement-name">{supplement.GoodsCommercialName}</div>
      <div className="supplement-description">{supplement.CommercialDescription}</div>
      <div className="supplement-price">{supplement.CurrentPrices} ₽</div>
      <Button onClick={()=>{handleModal(supplement)}} status={true}>Добавить</Button>
    </div>
  );
};

export default SupplementItem;