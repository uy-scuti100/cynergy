export interface ITask {
	id: string;
	title: string;
	description?: string;
	project_id: string;
	created_by: string;
	status: "backlog" | "in_review" | "in_progress" | "complete";
	priority: "low" | "medium" | "high";
	due_date?: Date;
	start_date?: Date;
	created_at: Date;
	comments?: Comment[]; // Array of related comments
	assignees?: TaskAssignee[]; // Array of related task assignees
}

export interface IComment {
	id: string;
	task_id: string;
	user_id: string;
	content: string;
	parent_id?: string; // ID of the parent comment if it’s a reply
	created_at: Date;
	task: Task; // Related task
	user: User; // Related user
	parent?: Comment; // Parent comment for replies
	replies: Comment[]; // Replies to this comment
}

export interface IUser {
	id: string;
	email: string;
	name: string;
	profile_picture?: string | null;
	teams_owned?: Team[]; // Teams owned by the user
	teams?: TeamMember[]; // Teams the user is a member of
	projects_owned?: Project[]; // Projects owned by the user
	tasks_created?: Task[]; // Tasks created by the user
	tasks_assigned?: TaskAssignee[]; // Tasks assigned to the user
	assigned_tasks?: TaskAssignee[]; // Tasks assigned by the user
}

export interface ITeam {
	id: string;
	name: string;
	description: string;
	owner_id: string;
	created_at: Date;
	owner: User; // Owner of the team
	members?: TeamMember[]; // Members of the team
	projects?: Project[]; // Projects under this team
}

export interface ITeamMember {
	id: string;
	user_id: string;
	team_id: string;
	role: "owner" | "team_admin" | "project_admin" | "contributor" | "viewer";
	created_at: Date;
	user: User; // Related user
	team: Team; // Related team
}

export interface IProject {
	id: string;
	name: string;
	description?: string;
	team_id: string;
	owner_id: string;
	created_at: Date;
	team: Team; // Team associated with the project
	owner: User; // Owner of the project
	members: ProjectMember[]; // Members of the project
	tasks: Task[]; // Tasks related to the project
}

export interface IProjectMember {
	id: string;
	user_id: string;
	project_id: string;
	role: "project_admin" | "contributor" | "viewer";
	created_at: Date;
	user: User; // Related user
	project: Project; // Related project
}

export interface ITaskAssignee {
	id: string;
	task_id: string;
	user_id: string;
	assigned_by: string;
	created_at: Date;
	task: Task; // Related task
	user: User; // Assignee user
	assigner: User; // User who assigned the task
}
