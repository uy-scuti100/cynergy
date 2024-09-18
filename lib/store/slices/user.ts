import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
	id: string;
	email: string;
	name: string;
	profile_picture?: string;
}

const initialState: UserState = {
	id: "",
	email: "",
	name: "",
	profile_picture: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserState>) => {
			state.id = action.payload.id;
			state.email = action.payload.email;
			state.name = action.payload.name;
			state.profile_picture = action.payload.profile_picture;
		},
		clearUser: (state) => {
			state.id = "";
			state.email = "";
			state.name = "";
			state.profile_picture = "";
		},
	},
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
