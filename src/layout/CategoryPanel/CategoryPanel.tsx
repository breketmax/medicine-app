import React, { useEffect, useState } from 'react';
import logo from "./bm.png";
import {ReactComponent as Arrow} from "./arrow.svg";
import menuIcon from "./menu.png";
import "./CategoryPanel.css";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCatalog } from '../../utils/catalog';
import { IPurpose } from '../../types/ISupplement';
import { changeActiveCatalog } from '../../store/reducers/SupplementSlice';

const CategoryPanel:React.FC = () => {
  const {supplements,activeCatalog} = useAppSelector(state => state.rootReducer.supplementReducer);
  const [catalog,setCatalog] = useState<IPurpose[]>([]);
  const dispatch = useAppDispatch();
  

  const [categoriesStatus,setCategoriesStatus] = useState<{catalogOpened:boolean,nutriciologiOpened:boolean,documentsOpened:boolean}>({catalogOpened:true,nutriciologiOpened:false,documentsOpened:false})
  const [panelClosed,setPanelClosed] = useState<boolean>(false);
  useEffect(() => {
    setCatalog(getCatalog(supplements));
  }, [supplements]);

  const handlePanel =() =>{
    setPanelClosed(prev => !prev)
  };

  const handleDocuments = () =>{
    setCategoriesStatus(prevState => ({catalogOpened:false,documentsOpened:!prevState.documentsOpened,nutriciologiOpened:false}))
  }
  const handleCatalog = () => {
    setCategoriesStatus(prevState => ({catalogOpened: !prevState.catalogOpened ,documentsOpened:false,nutriciologiOpened:false}))
  };
  const handleNutriciologi = () =>{
    setCategoriesStatus( prevState => ({catalogOpened:false,documentsOpened:false,nutriciologiOpened:!prevState.nutriciologiOpened}))
  }
  const handleCatalogCategory= (catName:string) =>{
    dispatch(changeActiveCatalog(catName))
  }
  return (
    <div className={panelClosed ? "category-panel closed": "category-panel"} >
        <div className="panel-header">
          <img src={logo} alt="supplement logo" className="logo"/>
          <button onClick={handlePanel}><img src={menuIcon} alt="show/hide side panel" /></button>
        </div>
        <div className={[categoriesStatus.catalogOpened ? "category opened" : "category",activeCatalog ==="all" ? "active" : " "].join(" ") }>
          <div className="category-title" onClick={handleCatalog}>
              Категория
              <Arrow/>
          </div>
          <div className="category-content">
            <ul>
              {catalog.map((cat) => (
                
                <li 
                  key ={cat.Purpose}
                  onClick={() => handleCatalogCategory(cat.Purpose)} 
                  className={ cat.Purpose === activeCatalog?  "category-item active" : "category-item"}>
                    <img src={cat.PurposePicture} alt="icon" />
                    <span>{cat.Purpose}</span>
                </li>))}
            </ul>
          </div>
        </div>
        <div className={categoriesStatus.nutriciologiOpened? "category opened" : "category" }>
          <div className="category-title" onClick={handleNutriciologi}>
              Нутрициологи
          </div>
        </div>
        <div className="category">
        <div className={categoriesStatus.documentsOpened? "category opened" : "category" }>
          <div className="category-title" onClick={handleDocuments}>
              Документы
              <Arrow/>
          </div>
          <div className="category-content">
            <ul>
             <li className="category-item">Пользовательское соглашение</li>
             <li className="category-item">Лицензии</li>
            </ul>
          </div>
        </div>
    </div>
    </div>
  );
};

export default CategoryPanel;