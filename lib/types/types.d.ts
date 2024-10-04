export interface ITask {
	id: string;
	title: string;
	tags?: string[];
	description?: string;
	project_id: string;
	created_by: string;
	status: "backlog" | "in_review" | "in_progress" | "complete";
	priority: "low" | "medium" | "high";
	start_date?: string | null;
	end_date?: string | null;
	created_at: Date;
	task_assignees: ITaskAssignee[];
	comments?: IComment[];
}

export interface IComment {
	id: string;
	task_id: string;
	user_id: string;
	project_id?: string; // Optional to match schema
	content: string;
	parent_id?: string; // Optional to match schema
	created_at?: Date; // Optional to match schema
	parent?: IComment; // Parent comment for replies
	comments?: IComment[]; // Replies to this comment
}

export interface IUser {
	id: string;
	email: string;
	name: string;
	profile_picture?: string | null; // Matches schema
	teams_owned?: ITeam[]; // Teams owned by the user
	teams?: ITeamMember[]; // Teams the user is a member of
	projects_owned?: IProject[]; // Projects owned by the user
	tasks_created?: ITask[]; // Tasks created by the user
	tasks_assigned?: ITaskAssignee[]; // Tasks assigned to the user
}

export interface ITeam {
	id: string;
	name: string;
	description?: string; // Optional to match schema
	owner_id: string;
	created_at?: Date; // Optional to match schema
	members?: ITeamMember[]; // Members of the team
	projects?: IProject[]; // Projects under this team
}

export interface ITeamMember {
	id: string;
	user_id: string;
	team_id: string;
	role: "owner" | "team_admin" | "project_admin" | "contributor" | "viewer";
	created_at?: Date;
	user: IUser;
	team: ITeam;
}

export interface IProject {
	id: string;
	name: string;
	description?: string;
	team_id: string;
	owner_id: string;
	created_at?: Date;
	start_date?: string | null;
	end_date?: string | null;
	team: ITeam;
	owner: IUser;
	members?: IProjectMember[];
	tasks?: ITask[];
}

export interface IProjectMember {
	id: string;
	user_id: string;
	project_id: string;
	role: "project_admin" | "contributor" | "viewer"; // Matches `roles`
	created_at?: Date; // Optional to match schema
	user: IUser; // Related user
	project: IProject; // Related project
}

export interface ITaskAssignee {
	id: string;
	task_id: string;
	user_id: string;
	assigned_by: string;
	created_at?: Date; // Optional to match schema
	user: IUser; // Assignee user
	assigner: IUser; // User who assigned the task
	task: ITask; // Related task
}
