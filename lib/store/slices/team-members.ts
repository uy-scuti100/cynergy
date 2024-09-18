import { ITeamMember } from "@/lib/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateProps = {
	teamMembers: ITeamMember[];
};

const initialState: InitialStateProps = {
	teamMembers: [],
};

export const teamMembersSlice = createSlice({
	name: "teamMembers",
	initialState,
	reducers: {
		setTeamMembers: (state, action: PayloadAction<ITeamMember[]>) => {
			if (action.payload) {
				state.teamMembers = action.payload;
			}
		},
		addTeamMember: (state, action: PayloadAction<ITeamMember>) => {
			if (action.payload) {
				state.teamMembers.push(action.payload);
			}
		},
		removeTeamMember: (state, action: PayloadAction<string>) => {
			if (action.payload) {
				state.teamMembers = state.teamMembers.filter(
					(member) => member.id !== action.payload
				);
			}
		},
	},
});

export const { setTeamMembers, addTeamMember, removeTeamMember } =
	teamMembersSlice.actions;
export default teamMembersSlice.reducer;
