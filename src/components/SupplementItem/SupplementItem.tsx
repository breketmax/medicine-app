import React from 'react';
import { ISupp } from '../../types/ISupplement';
import "./SupplementItem.css";

const SupplementItem:React.FC<ISupp> = (supplement) => {
  return (
    <div className="supplement_item">
      <div className="supplement-image"><img src={supplement.Picture} alt="supplement" /></div>
      <div className="supplement-name">{supplement.GoodsCommercialName}</div>
      <div className="supplement-description">{supplement.CommercialDescription}</div>
      <div className="supplement-price">{supplement.CurrentPrices} ₽</div>
      <button>добавить</button>
    </div>
  );
};

export default SupplementItem;