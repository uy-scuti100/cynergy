import { IProjectMember } from "@/lib/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateProps = {
	projectMembers: IProjectMember[];
};

const initialState: InitialStateProps = {
	projectMembers: [],
};

export const projectMembersSlice = createSlice({
	name: "projectMembers",
	initialState,
	reducers: {
		setProjectMembers: (state, action: PayloadAction<IProjectMember[]>) => {
			if (action.payload) {
				state.projectMembers = action.payload;
			}
		},
		addProjectMember: (state, action: PayloadAction<IProjectMember>) => {
			if (action.payload) {
				state.projectMembers.push(action.payload);
			}
		},
		removeProjectMember: (state, action: PayloadAction<string>) => {
			if (action.payload) {
				state.projectMembers = state.projectMembers.filter(
					(member) => member.id !== action.payload
				);
			}
		},
	},
});

export const { setProjectMembers, addProjectMember, removeProjectMember } =
	projectMembersSlice.actions;
export default projectMembersSlice.reducer;
