import { createSlice } from '@reduxjs/toolkit';

export const DropdownFilterEventSlice = createSlice({
  name: 'Dropdown_filters',
  initialState: { filters: {
                            'diet':[],
                            'cuisines':[],
                            'type':[]
                          } 
                },  // Make sure to use an object for the initialState
  reducers: {
    DropdownEventHandler: (state, action) => {
      const { filters} = action.payload;
      state.filters = filters;
      console.log("action_payload------------>",action.payload)
    },
  },
});

export const { DropdownEventHandler } = DropdownFilterEventSlice.actions;
export const DropdownFilterReducer = DropdownFilterEventSlice.reducer;