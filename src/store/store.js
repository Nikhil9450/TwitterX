import { configureStore } from '@reduxjs/toolkit';
import {registerReducer,loginReducer} from '../slices/AuthenticatorSlice';
import { BookmarkReducer } from '../slices/ButtonEventSlice';
import { SearchRecipeReducer } from '../slices/SearchRecipeSlice';
import { ViewRecipeReducer } from '../slices/ViewRecipeSlice';
export default configureStore({
  reducer: {
    signup: registerReducer,
    signin: loginReducer,
    bookmark:BookmarkReducer,
    recipeList:SearchRecipeReducer,
    recipeInformation:ViewRecipeReducer
    // Add more reducers here if needed
  },
});