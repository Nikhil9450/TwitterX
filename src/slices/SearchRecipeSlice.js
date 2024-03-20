import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    data: [],
    loading: false,
    error: null,
  };

  // Helper function to construct the query string from paramsObject
  const buildQueryString = (paramsObject) => {
    const queryString = Object.keys(paramsObject).map((key) => {
      const value = Array.isArray(paramsObject[key]) ? paramsObject[key].join(',') : paramsObject[key];
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }).join('&');
  
    // Manually replace %2C with commas in the queryString
    return queryString.replace(/%2C/g, ',');
  };
// Define async thunk action creator with parameters
export const fetchRecipe = createAsyncThunk(
    'Recipe/fetchRecipe',
    async (paramsObject, { rejectWithValue }) => {
      console.log("paramsObject--------------->" ,paramsObject)
      try {
        const queryString = buildQueryString(paramsObject); // Build the query string
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?${queryString}`);
        return response.data;

        // const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        //     params: paramsObject // Pass paramsObject as the request parameters
        //   });
        // return response.data;
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