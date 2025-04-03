import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
            localStorage.setItem("tasks", JSON.stringify(state.tasks))
        },

        removedTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
            localStorage.setItem("tasks", JSON.stringify(state.tasks))
        },

        toggleComplete: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
                localStorage.setItem("tasks", JSON.stringify(state.tasks))
            }
        },
        editTask: (state, action) => {
            const { id, newText } = action.payload;
            const task = state.tasks.find((task) => task.id === id);
            if (task) {
                task.text = newText;
                localStorage.setItem("tasks", JSON.stringify(state.tasks));
            }
        },
    }
});

export const { addTask, removedTask, toggleComplete, editTask } = taskSlice.actions;

export default taskSlice.reducer;