import {createSlice} from '@reduxjs/toolkit';
const initialState={
    likedList:[]
}

const likeSlice = createSlice({
    name:'like',
    initialState,
    reducers: {
        likeRecipe(state, action) {
        state.likedList.push(action.payload); // Use 'push' to add a new item to the array
        },
        unlikeRecipe(state, action) {
        state.likedList = state.likedList.filter(item => item !== action.payload); // Filter out the item to unlike
        },
        updateList(state,action){
            state.likedList=action.payload;
        }
    },
});

export const {likeRecipe, unlikeRecipe,updateList}=likeSlice.actions;
export const likeReducer = likeSlice.reducer;
