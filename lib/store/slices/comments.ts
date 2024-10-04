import { IComment } from "@/lib/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateProps = {
	comments: IComment[];
};

const initialState: InitialStateProps = {
	comments: [],
};

export const commentsSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {
		setComments: (state, action: PayloadAction<IComment[]>) => {
			if (action.payload && Array.isArray(action.payload)) {
				state.comments = action.payload.map((comment) => ({
					...comment,
					parent: undefined,
					replies: [],
				}));
			}
		},
		addComment: (state, action: PayloadAction<IComment>) => {
			if (action.payload) {
				state.comments.push({
					...action.payload,
					parent: undefined,
					comments: [],
				});
			}
		},
		updateComment: (state, action: PayloadAction<IComment>) => {
			if (action.payload && action.payload.id) {
				const index = state.comments.findIndex(
					(comment) => comment.id === action.payload.id
				);
				if (index !== -1) {
					state.comments[index] = {
						...action.payload,
						parent: undefined,
						comments: [],
					};
				}
			}
		},
		deleteComment: (state, action: PayloadAction<string>) => {
			if (action.payload) {
				state.comments = state.comments.filter(
					(comment) => comment.id !== action.payload
				);
			}
		},
	},
});

export const { setComments, addComment, updateComment, deleteComment } =
	commentsSlice.actions;
export default commentsSlice.reducer;
