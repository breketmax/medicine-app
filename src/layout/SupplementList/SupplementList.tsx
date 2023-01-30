import React, { useEffect, useState } from 'react';
import ListHeader from '../../components/ListHeader/ListHeader';
import SupplementItem from '../../components/SupplementItem/SupplementItem';
import { useAppSelector } from '../../hooks/redux';
import { ISupp } from '../../types/ISupplement';
import { getFilteredSupplements } from '../../utils/catalog';
import "./SupplementList.css"

const SupplementList = () => {
  const {activeCatalog,supplements,filter} = useAppSelector(state => state.rootReducer.supplementReducer)
  const [filteredCatalog,setFilteredCatalog] = useState<ISupp[]>([]);
  useEffect(() => {
    setFilteredCatalog(getFilteredSupplements(supplements.SupplementsList,activeCatalog,filter));
  }, [activeCatalog,supplements,filter]);

  return (
    <div className="supllement-list">
      <ListHeader/>
      {filteredCatalog.map(s=>(<SupplementItem {...s}/>))}
    </div>
  );
};

export default SupplementList;