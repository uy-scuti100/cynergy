import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProject } from "@/lib/types/types";

type InitialStateProps = {
	projects: IProject[];
};

const initialState: InitialStateProps = {
	projects: [],
};

export const projectsSlice = createSlice({
	name: "projects",
	initialState,
	reducers: {
		setProjects: (state, action: PayloadAction<IProject[]>) => {
			if (action.payload) {
				state.projects = action.payload;
			}
		},
		addProjects: (state, action: PayloadAction<IProject>) => {
			if (action.payload) {
				state.projects.push(action.payload);
			}
		},
		removeProjects: (state, action: PayloadAction<IProject>) => {
			if (action.payload) {
				state.projects = state.projects.filter(
					(project) => project.id !== action.payload.id
				);
			}
		},
		updateProject: (state, action: PayloadAction<IProject>) => {
			if (action.payload) {
				const index = state.projects.findIndex(
					(project) => project.id === action.payload.id
				);
				if (index !== -1) state.projects[index] = action.payload;
			}
		},
	},
});

export const { setProjects, addProjects, removeProjects, updateProject } =
	projectsSlice.actions;

export default projectsSlice.reducer;
