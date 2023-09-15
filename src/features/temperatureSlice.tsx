import { createSlice } from '@reduxjs/toolkit';

const temperatureSlice = createSlice({
  name: 'temperature',
  initialState: true, // Initial state
  reducers: {
    toggleTemperatureMeasure: (state) => !state,
  },
});

export const { toggleTemperatureMeasure } = temperatureSlice.actions;
export default temperatureSlice.reducer;
