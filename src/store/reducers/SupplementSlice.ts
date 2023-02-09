import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { ISupplement, ISupStatus } from "../../types/ISupplement";
import { fetchSupplement } from "./ActionCreator";


interface SupplementState{
  supplements:ISupplement,
  isLoading:boolean,
  error:string,
  activeCatalog:string,
  filter:string
}

const initialState:SupplementState = {
    supplements:{
      PartnerLogo:"",
      SupplementsList:[]
    },
    error:'',
    isLoading:false,
    activeCatalog:"all",
    filter:""
}

const supplementSlice = createSlice({
  name:'supplements',
  initialState,
  reducers:{
    changeActiveCatalog(state,action:PayloadAction<string>){
      state.activeCatalog = action.payload;
    },
    changeFilter(state,action:PayloadAction<string>){
      state.filter = action.payload;
    },
    changeSupplementStatus(state,action:PayloadAction<ISupStatus>){
      state.supplements.SupplementsList.forEach(sup => {
        if(sup.Article === action.payload.article){
          sup.isAdd = action.payload.status
        }
      });
    }
  },
  extraReducers:{
    [fetchSupplement.pending.type]:(state)=>{
      state.isLoading = true;
    },
    [fetchSupplement.fulfilled.type]:(state,action:PayloadAction<ISupplement>) =>{
      state.supplements = action.payload;
      state.supplements.SupplementsList.forEach(sup => sup.isAdd = false)
      state.isLoading = false;
      state.error = ''
    },
    [fetchSupplement.rejected.type]:(state,action:PayloadAction<string>)=>{
      state.error = action.payload;
      state.isLoading = true;
    }
  }
});



export default supplementSlice.reducer;
export const {changeActiveCatalog,changeFilter,changeSupplementStatus} = supplementSlice.actions;