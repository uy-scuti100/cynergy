import { ITeam } from "@/lib/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateProps = {
	teams: ITeam[];
};

const initialState: InitialStateProps = {
	teams: [],
};

export const teamsSlice = createSlice({
	name: "teams",
	initialState,
	reducers: {
		setTeams: (state, action: PayloadAction<ITeam[]>) => {
			if (action.payload) {
				state.teams = action.payload;
			}
		},
		addTeam: (state, action: PayloadAction<ITeam>) => {
			if (action.payload) {
				state.teams.push(action.payload);
			}
		},
		updateTeam: (state, action: PayloadAction<ITeam>) => {
			if (action.payload && action.payload.id) {
				const index = state.teams.findIndex(
					(team) => team.id === action.payload.id
				);
				if (index !== -1) {
					state.teams[index] = action.payload;
				}
			}
		},
		deleteTeam: (state, action: PayloadAction<string>) => {
			if (action.payload) {
				state.teams = state.teams.filter((team) => team.id !== action.payload);
			}
		},
	},
});

export const { setTeams, addTeam, updateTeam, deleteTeam } = teamsSlice.actions;
export default teamsSlice.reducer;
