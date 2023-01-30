
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ISupplement } from '../../types/ISupplement';


export const fetchSupplement = createAsyncThunk(
  'supplements/fetchAll',
  async(_,thunkAPI) => {
    try {
      const response = await axios.get<ISupplement>("https://api.vitamin.trade/SupplementsList",
        {
          headers:{
            'accept':'application/json',
            'Authorization': 'ers45bsGH^)()Hhj',
          },
        }
      )
      return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue("Something goes wrong.")
    }
  }
);