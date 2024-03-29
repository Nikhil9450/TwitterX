import { configureStore } from '@reduxjs/toolkit';
import {registerReducer,loginReducer} from '../slices/AuthenticatorSlice';
import { BookmarkReducer } from '../slices/ButtonEventSlice';
import { SearchRecipeReducer } from '../slices/SearchRecipeSlice';
import { ViewRecipeReducer } from '../slices/ViewRecipeSlice';
import { DropdownFilterReducer } from '../slices/DropdownFilteredListSlice';
import { userReducer } from '../slices/UserSlice';
import { SearchItemReducer } from '../slices/SearchedItemSlice';
export default configureStore({
  reducer: {
    signup: registerReducer,
    signin: loginReducer,
    bookmark:BookmarkReducer,
    recipeList:SearchRecipeReducer,
    recipeInformation:ViewRecipeReducer,
    dropDownlist:DropdownFilterReducer,
    userName:userReducer,
    SearchItem:SearchItemReducer,
    // Add more reducers here if needed
  },
});