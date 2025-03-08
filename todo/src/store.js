import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./reducers/taskReducer";  

const store = configureStore({
  reducer: {
    tasks: taskReducer,  
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),  
});

export default store;
