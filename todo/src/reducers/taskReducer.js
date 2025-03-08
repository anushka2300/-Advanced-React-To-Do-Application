import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchTasksSuccess: (state, action) => {
      state.tasks = action.payload;
    },
    addTaskSuccess: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTaskSuccess: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
    fetchTasksError: (state, action) => {
      state.error = action.payload;
    },
    updateTaskStatus: (state, action) => {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex((task) => task._id === updatedTask._id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
  },
});

export const { fetchTasksSuccess, addTaskSuccess, deleteTaskSuccess, fetchTasksError, updateTaskStatus } = taskSlice.actions;
export default taskSlice.reducer;
