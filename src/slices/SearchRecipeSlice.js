import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    // data: [],
    data: {
      results: [],
      totalResults: 0, // Default value
    },
    loading: false,
    error: null,
  };



// Helper function to construct the query string from paramsObject
const buildQueryString = (paramsObject) => {
  const filteredParams = Object.fromEntries(
      Object.entries(paramsObject).filter(([_, value]) => value !== '' && value !== undefined && value.length !== 0)
  );
  
  const queryString = new URLSearchParams(filteredParams).toString();
  console.log("querystring------------->",queryString)
  return queryString;
};

// Define async thunk action creator with parameters
export const fetchRecipe = createAsyncThunk(
  'Recipe/fetchRecipe',
  async (paramsObject, { rejectWithValue }) => {
      console.log("paramsObject--------------->", paramsObject)
      try {
          const queryString = buildQueryString(paramsObject); // Build the query string
          console.log("queryString------------>", queryString);
          const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?${queryString}`);
          console.log("response.data------------->", response.data)
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
  
  
//   export default SearchRecipeSlice.reducer;
  export const SearchRecipeReducer = SearchRecipeSlice.reducer;