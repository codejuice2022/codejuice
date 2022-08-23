import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  enhancers: defaultEnhancers => [...defaultEnhancers],
});

export default store;
