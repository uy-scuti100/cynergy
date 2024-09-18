import { ITaskAssignee } from "@/lib/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateProps = {
	taskAssignees: ITaskAssignee[];
};

const initialState: InitialStateProps = {
	taskAssignees: [],
};

export const taskAssigneesSlice = createSlice({
	name: "taskAssignees",
	initialState,
	reducers: {
		setTaskAssignees: (state, action: PayloadAction<ITaskAssignee[]>) => {
			if (action.payload) {
				state.taskAssignees = action.payload;
			}
		},
		addTaskAssignee: (state, action: PayloadAction<ITaskAssignee>) => {
			if (action.payload) {
				state.taskAssignees.push(action.payload);
			}
		},
		removeTaskAssignee: (state, action: PayloadAction<string>) => {
			if (action.payload) {
				state.taskAssignees = state.taskAssignees.filter(
					(assignee) => assignee.id !== action.payload
				);
			}
		},
	},
});

export const { setTaskAssignees, addTaskAssignee, removeTaskAssignee } =
	taskAssigneesSlice.actions;
export default taskAssigneesSlice.reducer;
