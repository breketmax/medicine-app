import { ISchedule, IInDay } from './../../types/ISchedule';
import { ISupp } from './../../types/ISupplement';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState{
  modalProduct:ISupp[],
  supplementSchedule:ISchedule
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
  modalProduct:[],
  supplementSchedule:{
    article:"",
    period: 'Ежедневно',
    inDay:[
      {
        time:"10:00",      
        doza:1
      },
    ],
  },

  
}

const modalSlice = createSlice({
  name:'modal',
  initialState,
  reducers:{
    setModalProduct(state,action:PayloadAction<ISupp>){
      state.modalProduct = [action.payload];
      state.supplementSchedule.article = action.payload.Article;

    },
    unsetModalProduct(state){
      state.modalProduct = [];
      state.supplementSchedule = initialState.supplementSchedule;
    },
    changeInDay(state,action:PayloadAction<IInDay[]>){
      state.supplementSchedule.inDay.push(...action.payload)
    },
    sliceInDay(state,action:PayloadAction<number>){
      state.supplementSchedule.inDay = state.supplementSchedule.inDay.slice(0,action.payload)
    },
    changeTime(state,action:PayloadAction<ITime>){
      state.supplementSchedule.inDay[action.payload.i].time = action.payload.timeValue;
    },
    sortTimes(state){
      state.supplementSchedule.inDay = state.supplementSchedule.inDay.sort((a,b) => a.time > b.time ? 1 : -1) 
    },
    changeDose(state,action:PayloadAction<IDose>){
      state.supplementSchedule.inDay[action.payload.i].doza = action.payload.dozeValue
    },
    deleteTaking(state,action:PayloadAction<number>){
      if(state.supplementSchedule.inDay.length === 1){
        state.supplementSchedule.inDay = state.supplementSchedule.inDay.filter((_,i) => i !== action.payload);
        state.modalProduct = [];
        state.supplementSchedule = initialState.supplementSchedule; 
        return;
      }
      state.supplementSchedule.inDay = state.supplementSchedule.inDay.filter((_,i) => i !== action.payload) 
    },
  },
});


export default modalSlice.reducer;
export const {setModalProduct,unsetModalProduct,changeInDay,sliceInDay,changeTime,changeDose,deleteTaking,sortTimes} = modalSlice.actions;