import { ITask } from "@/lib/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateProps = {
	tasks: ITask[];
};

const initialState: InitialStateProps = {
	tasks: [],
};

export const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		setTasks: (state, action: PayloadAction<ITask[]>) => {
			if (action.payload) {
				state.tasks = action.payload as any;
			}
		},
		addTask: (state, action: PayloadAction<ITask>) => {
			if (action.payload) {
				state.tasks.push(action.payload as any);
			}
		},
		updateTask: (state, action: PayloadAction<ITask>) => {
			if (action.payload && action.payload.id) {
				const index = state.tasks.findIndex(
					(task) => task.id === action.payload.id
				);
				if (index !== -1) state.tasks[index] = action.payload as any;
			}
		},
		deleteTask: (state, action: PayloadAction<string>) => {
			if (action.payload) {
				state.tasks = state.tasks.filter((task) => task.id !== action.payload);
			}
		},
	},
});

export const { setTasks, addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
