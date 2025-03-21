import axios from "axios";
import { fetchTasksSuccess, addTaskSuccess, deleteTaskSuccess, fetchTasksError } from "../reducers/taskReducer";

export const fetchTasks = (filter = "all") => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:8000/task/filter?filter=${filter}`);
    dispatch(fetchTasksSuccess(response.data));
  } catch (error) {
    dispatch(fetchTasksError(error.message));
  }
};

export const addTask = (task) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:8000/task/addtasks", task);
    console.log(response.data)
    dispatch(addTaskSuccess(response.data));
  } catch (error) {
    dispatch(fetchTasksError(error.message));
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8000/task/tasks/${id}`);
    dispatch(deleteTaskSuccess(id));
  } catch (error) {
    dispatch(fetchTasksError(error.message));
  }
};
export const toggleComplete = (id, currentStatus) => async (dispatch) => {
  try {
      const response = await axios.patch(`http://localhost:8000/task/status/${id}`, { status: currentStatus });
      dispatch(fetchTasks());
  } catch (error) {
      console.error("Error toggling task status:", error);
  }
};

export const toggleImportant = (id) => async (dispatch) => {
  try {
    const response = await axios.patch(`http://localhost:8000/task/important/${id}`);
    dispatch(fetchTasks());  
  } catch (error) {
    console.error("Error updating important status:", error);
  }
};

 
