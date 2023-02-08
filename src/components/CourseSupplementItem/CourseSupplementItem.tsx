import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { changeDose, changeTime, ModalState, sortTimes } from '../../store/reducers/ModalSlice';
import { IInDay } from '../../types/ISchedule';
import { calcNextScheduleTime, getScheduleString, validateTime } from '../../utils/catalog';
import "./CourseSupplementItem.css";
import Input from '../Input/Input';
import Select from '../Select/Select';
import {ReactComponent as Arrow} from "./arrow.svg";
import {ReactComponent as Close} from "./close.svg";
import {ReactComponent as Delete} from "./delete.svg";
import { changeInDayCourse, deleteOneTake, deleteSupplement, minimizeCard, sliceInDayCourse } from '../../store/reducers/CourseSlice';

interface ISupplementItem{
  itemIndex:number,
  supplementSchedule:ModalState,
  isMinimized:boolean
}

const CourseSupplementItem:React.FC<ISupplementItem> = ({supplementSchedule:{inDay,period,supplement},isMinimized,itemIndex}) => {
  const periodOptions =[{name:"Ежедневно",value:"daily"},{name:"Еженедельно",value:"weekly"}];
  const inDayOptions = [
    {
      name:"1",
      value:1,
    },
    {
      name:"2",
      value:2,
    },
    {
      name:"3",
      value:3
    },
    {
      name:"4",
      value:4
    },
    {
      name:"5",
      value:5
    },
    {
      name:"6",
      value:6
    },
  ]
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
  const [inputStartValue,setInputStartValue] = useState<string>("")

  
  const changeTimeHandler = (e:React.ChangeEvent<HTMLInputElement>,i:number) => {
    let timeValue = validateTime(inDay[i].time,e.target.value);

    dispatch(changeTime({i,timeValue}))
  }
  const handleInDay = (e:React.ChangeEvent<HTMLSelectElement>) => {
    if(inDay.length > +e.target.value){
      dispatch(sliceInDayCourse({article:supplement.Article, index:+e.target.value}))
    }
    else{
      let additionalDayTaking:IInDay[] = [];
      for (let i = 1; i < (Number(e.target.value) - inDay.length + 1); i++) {
        let newDayTake:IInDay = {
          time:calcNextScheduleTime(inDay[inDay.length - 1].time,i),
          doza:1
        }
        additionalDayTaking.push(newDayTake);
      }
      dispatch(changeInDayCourse({article:supplement.Article,newInDay:additionalDayTaking}));
    }
  }
  const changeDoseHandler = (e:React.ChangeEvent<HTMLSelectElement>,i:number) => {
    dispatch(changeDose({i,dozeValue:+e.target.value}))
  }
  const deleteTakeFromCourse =(time:string) => {
    dispatch(deleteOneTake({article:supplement.Article,time}))
  }

  const orderTimesHandler = (i:number) =>{
    let [hours,minutes] = inDay[i].time.split(":");
    if(!hours.length || !minutes.length){
      dispatch(changeTime({i,timeValue:inputStartValue}));
      return
    }
    hours = hours.length ===1 ? "0" + hours : hours;
    minutes = minutes.length ===1 ? "0" + minutes : minutes;
    let timeValue = hours + ":" + minutes;

    dispatch(changeTime({i,timeValue}))
    dispatch(sortTimes());
  };

  const saveStartValue = (e:React.FocusEvent<HTMLInputElement>) => {
    setInputStartValue(e.target.value);
  };

  const minimizeItem = () =>{
    dispatch(minimizeCard(itemIndex));
  };

  const deleteFromCourse = () => {
    dispatch(deleteSupplement(supplement.Article))
  };

  return (
        <div className={isMinimized ? "course-supplement-item minimized" : "course-supplement-item"} >
            <div className="csi-header">
              <button className="csi-minimized-btn" onClick={minimizeItem}><Arrow/></button>
              <div className="csi-image"><img src={supplement.Picture} alt="product-preview" /></div>
              <div className="csi-name">{supplement.GoodsCommercialName}</div>
              <div className="csi-info">{getScheduleString(inDay)}</div>
              <button className="csi-delete-btn" onClick={deleteFromCourse}><Delete/></button>
            </div>
              <div className="csi-body-wrapper">
                <div className="csi-body">
                  <div className="static-body">
                    <Select title='Как принимать?' options={periodOptions} selected defaultValue="daily"/>
                    <Select title='Сколько раз в день' options={inDayOptions} selected onChange={handleInDay} value={inDay.length}/>
                  </div>
                  <div className="computed-wrapper">
                  {inDay.map((ind,i) => (
                    i === 0 ? <div className="computed-body" key={i}>
                    <Input title="Время" onChange={(e) => changeTimeHandler(e,i)} value={ind.time} onBlur={() => orderTimesHandler(i)} onFocus={saveStartValue}/>
                    <Select title='Дозировка' options={doza} selected defaultValue={1} onChange={(e) => changeDoseHandler(e,i)}><button className="delete-day"  onClick={() => deleteTakeFromCourse(ind.time)}><Close/></button></Select>   
                  </div> :
                     <div className="computed-body" key={i}>
                     <Input onChange={(e) => changeTimeHandler(e,i)}  value={ind.time} onBlur={() => orderTimesHandler(i)} onFocus={saveStartValue}/>
                     <Select options={doza} selected defaultValue={1} onChange={(e) => changeDoseHandler(e,i)}><button className="delete-day" onClick={() => deleteTakeFromCourse(ind.time)}><Close/></button></Select>   
                   </div>
                  ))}
                  </div>
                </div>
              </div>
        </div>
  );
};

export default CourseSupplementItem;