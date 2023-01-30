import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchSupplement } from './store/reducers/ActionCreator';
import "./App.css"
import CategoryPanel from './layout/CategoryPanel/CategoryPanel';
import SupplementList from './layout/SupplementList/SupplementList';

function App() {
  const dispatch = useAppDispatch();
  const {supplements,error,isLoading} = useAppSelector(state => state.rootReducer.supplementReducer)

  useEffect(() => {
    dispatch(fetchSupplement());
  }, []);

  if(isLoading){
    return <h1>Loading </h1>
  }
  return (
    <div className="App">
      <CategoryPanel/>
      <SupplementList/>
    </div>
  );
}

export default App;
