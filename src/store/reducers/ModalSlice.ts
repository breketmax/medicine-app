import { ISchedule, PeriodEnum, IInDay } from './../../types/ISchedule';
import { ISupp } from './../../types/ISupplement';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState{
  modalProduct:ISupp[],
  supplementSchedule:ISchedule
}

const initialState:ModalState ={
  modalProduct:[],
  supplementSchedule:{
    article:"",
    period: 'Ежедневно',
    inDay:[
      {
        time:"23:00",      
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
    }
  },
});


export default modalSlice.reducer;
export const {setModalProduct,unsetModalProduct,changeInDay,sliceInDay} = modalSlice.actions;