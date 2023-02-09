import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeInDay, sliceInDay, unsetModalProduct,changeTime,changeDose,deleteTaking,sortTimes} from '../../store/reducers/ModalSlice';
import Input from '../Input/Input';
import Select from '../Select/Select';
import "./Modal.css";
import {ReactComponent as Close} from "./close.svg";
import Button from '../Button/Button';
import { IInDay } from '../../types/ISchedule';
import { calcNextScheduleTime, getScheduleString, validateTime } from '../../utils/catalog';
import { addSupplementInCourse } from '../../store/reducers/CourseSlice';
import { changeSupplementStatus } from '../../store/reducers/SupplementSlice';


 
const Modal:React.FC = () => {
  const {inDay,period,supplement} = useAppSelector(state => state.rootReducer.modalReducer)
  const [isShow,setIsShow] = useState<boolean>(false);
  const [inputStartValue,setInputStartValue] = useState<string>("")
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    if(supplement.Article){
      setIsShow(true);
    }
    else{
      setIsShow(false)
    }

  }, [supplement.Article]);

  const closeModal = () => {
    dispatch(unsetModalProduct());
  }

  const stopPropogation= (e:React.MouseEvent<HTMLDivElement>) =>{
    e.stopPropagation();
  };

  const changeTimeHandler = (e:React.ChangeEvent<HTMLInputElement>,i:number) => {
    let timeValue = validateTime(inDay[i].time,e.target.value);

    dispatch(changeTime({i,timeValue}))
  }
  const handleInDay = (e:React.ChangeEvent<HTMLSelectElement>) => {
    if(inDay.length > +e.target.value){
      dispatch(sliceInDay(+e.target.value))
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
      dispatch(changeInDay(additionalDayTaking));
    }
  }
  const changeDoseHandler = (e:React.ChangeEvent<HTMLSelectElement>,i:number) => {
    dispatch(changeDose({i,dozeValue:+e.target.value}))
  }
  const handleTaking =(i:number) => {
    dispatch(deleteTaking(i))
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
  const addInCourse = (article:string) => {
    dispatch(changeSupplementStatus({article,status:true}))
    dispatch(unsetModalProduct());
    dispatch(addSupplementInCourse({inDay,period,supplement}))
  }
  return (
    supplement &&
    <div className={isShow ?"modal-wrapper show" :"modal-wrapper"} onClick={closeModal}>
        <div className="modal-window" onClick={stopPropogation}>
            <div className="modal-header">
              <div className="modal-image"><img src={supplement.Picture} alt="product-preview" /></div>
              <div className="modal-name">{supplement.GoodsCommercialName}</div>
              <div className="modal-info">{getScheduleString(inDay)}</div>
            </div>
            <div className="modal-body-wrapper">
              <div className="modal-body">
                <div className="static-body">
                  <Select title='Как принимать?' options={periodOptions} selected defaultValue="daily"/>
                  <Select title='Сколько раз в день' options={inDayOptions} selected onChange={handleInDay} value={inDay.length}/>
                </div>
                <div className="computed-wrapper">

                {inDay.map((ind,i) => (
                  i === 0 ? <div className="computed-body" key={i}>
                  <Input title="Время" onChange={(e) => changeTimeHandler(e,i)} value={ind.time} onBlur={() => orderTimesHandler(i)} onFocus={saveStartValue}/>
                  <Select title='Дозировка' options={doza} selected defaultValue={1} onChange={(e) => changeDoseHandler(e,i)}><button className="delete-day"  onClick={() => handleTaking(i)}><Close/></button></Select>   
                </div> :
                   <div className="computed-body" key={i}>
                   <Input onChange={(e) => changeTimeHandler(e,i)}  value={ind.time} onBlur={() => orderTimesHandler(i)} onFocus={saveStartValue}/>
                   <Select options={doza} selected defaultValue={1} onChange={(e) => changeDoseHandler(e,i)}><button className="delete-day" onClick={() => handleTaking(i)}><Close/></button></Select>   
                 </div>
                ))}
                </div>
              </div>
              <Button onClick={() => addInCourse(supplement.Article)} status={false}>Добавить в курс</Button>
            </div>

        </div>
    </div>
  );
};

export default Modal;