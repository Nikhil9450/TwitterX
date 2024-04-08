import {createSlice} from '@reduxjs/toolkit'

const initialState={
    open:false
}

const drawerSlice = createSlice({
    name:'drawer',
    initialState,
    reducers:{
        setDrawer(state,action){
           state.open=action.payload;
        //    console.log("drawer state-------->",action.payload);
        },
    },
});

export const {setDrawer} = drawerSlice.actions;
export const drawerReducer = drawerSlice.reducer;