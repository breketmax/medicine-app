import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { ISupplement } from "../../types/ISupplement";
import { fetchSupplement } from "./ActionCreator";


interface SupplementState{
  supplements:ISupplement,
  isLoading:boolean,
  error:string,
  activeCatalog:string,
  filter:""
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
    }
  },
  extraReducers:{
    [fetchSupplement.pending.type]:(state)=>{
      state.isLoading = true;
    },
    [fetchSupplement.fulfilled.type]:(state,action:PayloadAction<ISupplement>) =>{
      state.supplements = action.payload;
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
export const {changeActiveCatalog} = supplementSlice.actions;