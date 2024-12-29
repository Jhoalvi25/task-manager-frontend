import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const PORT = process.env.REACT_APP_API_URL || "http://localhost:3000";

const initialState = {
  tasks: [],
  status: "idle",
  error: null,
  filter: "all", // 'completed', 'pending', 'all'
};

// Acción para obtener todas las tareas
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(`${PORT}/api/tasks`);
  return response.data;
});

// Acción para marcar tarea como completada o pendiente
export const toggleTaskStatus = createAsyncThunk(
  "tasks/toggleTaskStatus",
  async (id) => {
    const response = await axios.put(`${PORT}/api/tasks/${id}`, {
      status: true,
    });
    return response.data;
  }
);

// Acción para editar tarea
export const editTask = createAsyncThunk("tasks/editTask", async (taskData) => {
  const response = await axios.put(
    `${PORT}/api/tasks/${taskData._id}`,
    taskData
  );
  return response.data;
});

// Acción para eliminar tarea
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await axios.delete(`${PORT}/api/tasks/${id}`);
  return id;
});

// Acción para crear nueva tarea
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData) => {
    const response = await axios.post(
      `${PORT}/api/tasks`,
      taskData
    );
    return response.data;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(toggleTaskStatus.fulfilled, (state, action) => {
        const task = state.tasks.find(
          (task) => task._id === action.payload._id
        );
        if (task) task.status = action.payload.status;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload; // Actualizar tarea en el estado
        }
      });
  },
});

export const { setFilter } = taskSlice.actions;
export default taskSlice.reducer;
