import React, { useState } from 'react';
import "./CoursePanel.css"
import {ReactComponent as Arrow} from "./arrow.svg";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import CourseList from '../../components/CourseList/CourseList';
import Select from '../../components/Select/Select';
import { changeView, minimizeAllCard } from '../../store/reducers/CourseSlice';


const CoursePanel = () => {
  const [isOpened,setIsOpened] = useState<boolean>(false)
  const dispatch = useAppDispatch();
  const {courseSupplements,courseDuration,view} = useAppSelector(state => state.rootReducer.courseReducer);
  const durationOptions = [
    {name:"1 неделя",value:"1w"},
    {name:"2 недели",value:"2w"},
    {name:"3 недели",value:"3w"},
    {name:"4 недели",value:"4w"},
    {name:"1,5 месяца",value:"1.5m"},
    {name:"2 месяца",value:"2m"},
  ]; 

  const minimizeAll = () =>{
    dispatch(minimizeAllCard());
  }
  const handlePanel = () => {
    minimizeAll();
    setIsOpened(!isOpened)
  };
  return (
    <div className={isOpened ? "course-panel" : "course-panel closed"}>
      <div className="course-panel-header">
        <button className='show-panel btn' onClick={handlePanel}><Arrow/></button>
        <span className="panel-header-title">
          Мой курс приема
        </span>
        <Select options={durationOptions} value={courseDuration}/>
        <button className="minimize-all-btn" onClick={minimizeAll}>Свернуть все</button>
      </div>
      <div className="course-panel-control">
        <button className={view === 'byTime' ? 'btn control-button active' : 'btn control-button'} onClick={() => dispatch(changeView('byTime'))}>По времени приема</button>
        <button className={view === 'bySupplement' ? 'btn control-button active' : 'btn control-button'} onClick={() => dispatch(changeView('bySupplement'))}>По биодобавке</button>
        <button className='btn control-button'></button>
      </div>
      {courseSupplements.length ? <CourseList /> : <h2 className='no-supplements-title'>Выберите биодобавку, чтобы собрать свой персональный курс</h2> }
      
    </div>
  );
};

export default CoursePanel;