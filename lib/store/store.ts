//this is our redux store
"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

import tasksReducer from "./slices/tasks";
import commentsReducer from "./slices/comments";
import userReducer from "./slices/user";
import teamsReducer from "./slices/teams";
import teamMembersReducer from "./slices/team-members";
import projectsReducer from "./slices/projects";
import projectMembersReducer from "./slices/project-members";
import taskAssigneesReducer from "./slices/task-assignees";
const rootReducer = combineReducers({
	//add all your reducers here
	tasks: tasksReducer,
	comments: commentsReducer,
	user: userReducer,
	teams: teamsReducer,
	teamMembers: teamMembersReducer,
	projects: projectsReducer,
	projectMembers: projectMembersReducer,
	taskAssignees: taskAssigneesReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

//we export these type definitions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//this useAppSelector has type definitions added
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
