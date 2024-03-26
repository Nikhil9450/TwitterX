import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    loading: false,
    error: null,
  };

  export const viewRecipe = createAsyncThunk(
    'View_Recipe/viewRecipe',
    async (paramsObject, { rejectWithValue }) => {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${paramsObject.id}/information`, {
            params: paramsObject // Pass paramsObject as the request parameters
          });
          console.log('single recipe data--------->', response.data)
        return response.data;
      } catch (error) {
        // Use rejectWithValue to provide additional context about the error
        return rejectWithValue(error.response.data);
      }
    }
  );

const ViewRecipeSlice= createSlice({
    name:'View_Recipe',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
      builder
        .addCase(viewRecipe.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(viewRecipe.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(viewRecipe.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload ? action.payload.message : action.error.message;
        });
    },
})

export const ViewRecipeReducer = ViewRecipeSlice.reducer;