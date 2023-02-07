
import { ISupp } from './../../types/ISupplement';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInDay } from '../../types/ISchedule';

export interface ModalState{
  supplement:ISupp,
  period:   "Ежедневно" | "Еженедельно",
  inDay:IInDay[]
}
interface ITime{
  i:number,
  timeValue:string
}
interface IDose{
  i:number,
  dozeValue:number
}
const initialState:ModalState ={
  supplement:{
    Article:"",
    CommercialDescription:"",
    CurrentPrices:0,
    GoodsCommercialName:"",
    Picture:"",
    Purposes:[],
    SupplementForm:""

  },
  period: 'Ежедневно',
  inDay:[
    {
      time:"10:00",      
      doza:1
    },
  ],

  
}

const modalSlice = createSlice({
  name:'modal',
  initialState,
  reducers:{
    setModalProduct(state,action:PayloadAction<ISupp>){
      state.supplement = action.payload;
    },
    unsetModalProduct(){
      return initialState;
    },
    changeInDay(state,action:PayloadAction<IInDay[]>){
      state.inDay.push(...action.payload)
    },
    sliceInDay(state,action:PayloadAction<number>){
      state.inDay = state.inDay.slice(0,action.payload)
    },
    changeTime(state,action:PayloadAction<ITime>){
      state.inDay[action.payload.i].time = action.payload.timeValue;
    },
    sortTimes(state){
      state.inDay = state.inDay.sort((a,b) => a.time > b.time ? 1 : -1) 
    },
    changeDose(state,action:PayloadAction<IDose>){
      state.inDay[action.payload.i].doza = action.payload.dozeValue
    },
    deleteTaking(state,action:PayloadAction<number>){
      if(state.inDay.length === 1) return initialState;
      state.inDay = state.inDay.filter((_,i) => i !== action.payload) 
    },
  },
});


export default modalSlice.reducer;
export const {setModalProduct,unsetModalProduct,changeInDay,sliceInDay,changeTime,changeDose,deleteTaking,sortTimes} = modalSlice.actions;