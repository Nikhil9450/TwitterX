import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    data: [],
    loading: false,
    error: null,
  };
// Define async thunk action creator with parameters
export const fetchRecipe = createAsyncThunk(
    'Recipe/fetchRecipe',
    async (paramsObject, { rejectWithValue }) => {
      try {
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
            params: paramsObject // Pass paramsObject as the request parameters
          });
        return response.data;
      } catch (error) {
        // Use rejectWithValue to provide additional context about the error
        return rejectWithValue(error.response.data);
      }
    }
  );
  const SearchRecipeSlice = createSlice({
    name: 'Recipe',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchRecipe.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchRecipe.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(fetchRecipe.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload ? action.payload.message : action.error.message;
        });
    },
  });
  
  export { fetchRecipe };
  
//   export default SearchRecipeSlice.reducer;
  export const SearchRecipeReducer = SearchRecipeSlice.reducer;