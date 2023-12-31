import {createSlice} from '@reduxjs/toolkit';

import {RootState} from '..';
import {LightTheme, DarkTheme} from '../../themes/theme';

interface themeSliceState {
  theme: typeof LightTheme;
}

const initialState: themeSliceState = {
  theme: DarkTheme,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setLightTheme: state => {
      state.theme = LightTheme;
    },
    setDarkTheme: state => {
      state.theme = DarkTheme;
    },
  },
});

export const {setLightTheme, setDarkTheme} = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.theme;

export default themeSlice.reducer;
