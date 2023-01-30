import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { ISupp } from '../../types/ISupplement';
import { getFilteredSupplements } from '../../utils/catalog';

const SupplementList = () => {
  const {activeCatalog,supplements,filter} = useAppSelector(state => state.rootReducer.supplementReducer)
  const [filteredCatalog,setFilteredCatalog] = useState<ISupp[]>([]);
  useEffect(() => {
    setFilteredCatalog(getFilteredSupplements(supplements.SupplementsList,activeCatalog,filter));
  }, [activeCatalog,supplements,filter]);

  return (
    <div>
      {filteredCatalog.map(s=>(<h1>{s.GoodsCommercialName}</h1>))}
    </div>
  );
};

export default SupplementList;