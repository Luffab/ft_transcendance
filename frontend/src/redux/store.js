import { configureStore } from '@reduxjs/toolkit';
//import configReducer from './reducers/counterSlice';
import configReducer from './reducers/config';
//import counterReducers from './reducers/counterSlice';

export default configureStore({
  reducer: {
    config: configReducer,
    //counters: counterReducers,
  },
});
