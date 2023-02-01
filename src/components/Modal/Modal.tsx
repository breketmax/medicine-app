import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeInDay, sliceInDay, unsetModalProduct } from '../../store/reducers/ModalSlice';
import Input from '../Input/Input';
import Select from '../Select/Select';
import "./Modal.css";
import {ReactComponent as Close} from "./close.svg";
import Button from '../Button/Button';
import { IInDay } from '../../types/ISchedule';
import { calcNextScheduleTime } from '../../utils/catalog';


 
const Modal:React.FC = () => {
  const {modalProduct:[supplement],supplementSchedule} = useAppSelector(state => state.rootReducer.modalReducer)
  const [isShow,setIsShow] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const periodOptions =[{name:"Ежедневно",value:"daily"},{name:"Еженедельно",value:"weekly"}];
  const inDay = [
    {
      name:"1",
      value:1,
      default:true
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
    if(supplement){
      setIsShow(true);
    }
    else{
      setIsShow(false)
    }

  }, [supplement]);

  const closeModal = () => {
    dispatch(unsetModalProduct());
  }

  const stopPropogation= (e:React.MouseEvent<HTMLDivElement>) =>{
    e.stopPropagation();
  };


  const handleInDay = (e:React.ChangeEvent<HTMLSelectElement>) => {
    if(supplementSchedule.inDay.length > +e.target.value){
      dispatch(sliceInDay(+e.target.value))
    }
    else{
      let additionalDayTaking:IInDay[] = [];
      for (let i = 1; i < (Number(e.target.value) - supplementSchedule.inDay.length + 1); i++) {
        let newDayTake:IInDay = {
          time:calcNextScheduleTime(supplementSchedule.inDay[supplementSchedule.inDay.length - 1].time,i),
          doza:1
        }
        additionalDayTaking.push(newDayTake);
      }
      dispatch(changeInDay(additionalDayTaking));
    }
  }

  return (
    supplement &&
    <div className={isShow ?"modal-wrapper show" :"modal-wrapper"} onClick={closeModal}>
        <div className="modal-window" onClick={stopPropogation}>
            <div className="modal-header">
              <div className="modal-image"><img src={supplement.Picture} alt="product-preview" /></div>
              <div className="modal-name">{supplement.GoodsCommercialName}</div>
              <div className="modal-info">1шт:афав</div>
            </div>
            <div className="modal-body-wrapper">
              <div className="modal-body">
                <div className="static-body">
                  <Select title='Как принимать?' options={periodOptions} selected/>
                  <Select title='Сколько раз в день' options={inDay} selected onChange={handleInDay}/>
                </div>
                <div className="computed-wrapper">

                {supplementSchedule.inDay.map((ind,i) => (
                  i === 0 ? <div className="computed-body">
                  <Input title="Время" onChange={() =>{}} value={ind.time}/>
                  <Select title='Дозировка' options={doza} selected><button className="delete-day"><Close/></button></Select>   
                </div> :
                   <div className="computed-body">
                   <Input onChange={() =>{}} value={ind.time}/>
                   <Select options={doza} selected><button className="delete-day"><Close/></button></Select>   
                 </div>
                ))}
                  
                 
                </div>
              </div>
              <Button onClick={() =>{}} status={true}>Добавить в курс</Button>
            </div>

        </div>
    </div>
  );
};

export default Modal;