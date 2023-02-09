import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { changeDose, deleteTaking, ModalState,  } from '../../store/reducers/ModalSlice';

import {getCourseString } from '../../utils/catalog';
import "./CourseTimeItem.css";
import Select from '../Select/Select';
import {ReactComponent as Arrow} from "./arrow.svg";
import {ReactComponent as Close} from "./close.svg";
import {ReactComponent as Delete} from "./delete.svg";
import { changeDozeCourseArticle, deleteOneTake, deleteOneTakeArticle, deleteTime, minimizeTimeCard } from '../../store/reducers/CourseSlice';


interface ICourseTimetItem{
  time:string,
  timeSchedule:ModalState[],
  isMinimized:boolean
}

const CourseTimeItem:React.FC<ICourseTimetItem> = ({timeSchedule,isMinimized,time}) => {
  const doza = [
    {
      name:"¼ таблетки",
      value:0.25
    },
    {
      name:"½ таблетки",
      value:0.5
    },
    {
      name:"1 таблетка",
      value:1
    },
    {
      name:"2 таблетки",
      value:2
    },
    {
      name:"3 таблетки",
      value:3
    },
    {
      name:"4 таблетки",
      value:4
    },
  ]
  const dispatch = useAppDispatch();

  const changeDoseHandler = (e:React.ChangeEvent<HTMLSelectElement>,i:number) => {
    dispatch(changeDose({i,dozeValue:+e.target.value}))
  }
  const handleTaking =(i:number) => {
    dispatch(deleteTaking(i))
  }

  const minimizeItem = () =>{
    dispatch(minimizeTimeCard(time));
  };
  const deleteTimeInCourse =() => {
    dispatch(deleteTime(time))
  }
  const deleteTakeFromCourse =(article:string) => {
    dispatch(deleteOneTakeArticle({article,time}))
  }
  const changeDozeInCourse = (article:string,e:React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeDozeCourseArticle({article,doze:+e.target.value,time}))
  }

  return (
        <div className={isMinimized ? "course-time-item minimized" : "course-time-item"} >
            <div className="cti-header">
              <button className="cti-minimized-btn" onClick={minimizeItem} ><Arrow/></button>
              <div className="cti-name">Ежедневно в {time}</div>
              <div className="cti-info">{getCourseString(timeSchedule,time)}</div>
              <button className="cti-delete-btn" onClick={deleteTimeInCourse}><Delete/></button>
            </div>
              <div className="cti-body-wrapper">
                <div className="cti-body">
                  {timeSchedule.map(tm => (
                    <div className='cti-item'>
                       <div className="cti-image"><img src={tm.supplement.Picture} alt="product-preview" /></div>
                       <div className="cti-name">{tm.supplement.GoodsCommercialName}</div>
                       <Select options={doza} selected value={tm.inDay.filter(t => t.time === time)[0].doza} onChange={(e) => changeDozeInCourse(tm.supplement.Article,e)}><button className="delete-day" onClick={() => deleteTakeFromCourse(tm.supplement.Article)}><Close/></button></Select>   
                    </div>
                  ))}
                </div>
              </div>
        </div>
  );
};

export default CourseTimeItem;