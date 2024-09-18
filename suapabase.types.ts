export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	public: {
		Tables: {
			_prisma_migrations: {
				Row: {
					applied_steps_count: number;
					checksum: string;
					finished_at: string | null;
					id: string;
					logs: string | null;
					migration_name: string;
					rolled_back_at: string | null;
					started_at: string;
				};
				Insert: {
					applied_steps_count?: number;
					checksum: string;
					finished_at?: string | null;
					id: string;
					logs?: string | null;
					migration_name: string;
					rolled_back_at?: string | null;
					started_at?: string;
				};
				Update: {
					applied_steps_count?: number;
					checksum?: string;
					finished_at?: string | null;
					id?: string;
					logs?: string | null;
					migration_name?: string;
					rolled_back_at?: string | null;
					started_at?: string;
				};
				Relationships: [];
			};
			comments: {
				Row: {
					content: string;
					created_at: string;
					id: string;
					parent_id: string | null;
					task_id: string;
					user_id: string;
				};
				Insert: {
					content: string;
					created_at?: string;
					id: string;
					parent_id?: string | null;
					task_id: string;
					user_id: string;
				};
				Update: {
					content?: string;
					created_at?: string;
					id?: string;
					parent_id?: string | null;
					task_id?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "comments_parent_id_fkey";
						columns: ["parent_id"];
						isOneToOne: false;
						referencedRelation: "comments";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "comments_task_id_fkey";
						columns: ["task_id"];
						isOneToOne: false;
						referencedRelation: "tasks";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "comments_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			project_members: {
				Row: {
					created_at: string;
					id: string;
					project_id: string;
					role: Database["public"]["Enums"]["roles"];
					user_id: string;
				};
				Insert: {
					created_at?: string;
					id: string;
					project_id: string;
					role: Database["public"]["Enums"]["roles"];
					user_id: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					project_id?: string;
					role?: Database["public"]["Enums"]["roles"];
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "project_members_project_id_fkey";
						columns: ["project_id"];
						isOneToOne: false;
						referencedRelation: "projects";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "project_members_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			projects: {
				Row: {
					created_at: string;
					description: string | null;
					id: string;
					name: string;
					owner_id: string;
					start_date: string | null;
					team_id: string;
				};
				Insert: {
					created_at?: string;
					description?: string | null;
					id: string;
					name: string;
					owner_id: string;
					start_date?: string | null;
					team_id: string;
				};
				Update: {
					created_at?: string;
					description?: string | null;
					id?: string;
					name?: string;
					owner_id?: string;
					start_date?: string | null;
					team_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "projects_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "projects_team_id_fkey";
						columns: ["team_id"];
						isOneToOne: false;
						referencedRelation: "teams";
						referencedColumns: ["id"];
					}
				];
			};
			task_assignees: {
				Row: {
					assigned_by: string;
					created_at: string;
					id: string;
					task_id: string;
					user_id: string;
				};
				Insert: {
					assigned_by: string;
					created_at?: string;
					id: string;
					task_id: string;
					user_id: string;
				};
				Update: {
					assigned_by?: string;
					created_at?: string;
					id?: string;
					task_id?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "task_assignees_assigned_by_fkey";
						columns: ["assigned_by"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "task_assignees_task_id_fkey";
						columns: ["task_id"];
						isOneToOne: false;
						referencedRelation: "tasks";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "task_assignees_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			tasks: {
				Row: {
					created_at: string;
					created_by: string;
					description: string | null;
					due_date: string | null;
					id: string;
					priority: Database["public"]["Enums"]["priority"];
					project_id: string;
					start_date: string | null;
					status: Database["public"]["Enums"]["task_status"];
					tags: string[] | null;
					title: string;
				};
				Insert: {
					created_at?: string;
					created_by: string;
					description?: string | null;
					due_date?: string | null;
					id: string;
					priority: Database["public"]["Enums"]["priority"];
					project_id: string;
					start_date?: string | null;
					status: Database["public"]["Enums"]["task_status"];
					tags?: string[] | null;
					title: string;
				};
				Update: {
					created_at?: string;
					created_by?: string;
					description?: string | null;
					due_date?: string | null;
					id?: string;
					priority?: Database["public"]["Enums"]["priority"];
					project_id?: string;
					start_date?: string | null;
					status?: Database["public"]["Enums"]["task_status"];
					tags?: string[] | null;
					title?: string;
				};
				Relationships: [
					{
						foreignKeyName: "tasks_created_by_fkey";
						columns: ["created_by"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "tasks_project_id_fkey";
						columns: ["project_id"];
						isOneToOne: false;
						referencedRelation: "projects";
						referencedColumns: ["id"];
					}
				];
			};
			team_members: {
				Row: {
					created_at: string;
					id: string;
					role: Database["public"]["Enums"]["roles"];
					team_id: string;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					id: string;
					role: Database["public"]["Enums"]["roles"];
					team_id: string;
					user_id: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					role?: Database["public"]["Enums"]["roles"];
					team_id?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "team_members_team_id_fkey";
						columns: ["team_id"];
						isOneToOne: false;
						referencedRelation: "teams";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "team_members_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			teams: {
				Row: {
					created_at: string;
					description: string | null;
					id: string;
					name: string;
					owner_id: string;
				};
				Insert: {
					created_at?: string;
					description?: string | null;
					id: string;
					name: string;
					owner_id: string;
				};
				Update: {
					created_at?: string;
					description?: string | null;
					id?: string;
					name?: string;
					owner_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "teams_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			users: {
				Row: {
					created_at: string;
					email: string;
					id: string;
					name: string;
					profile_picture: string | null;
				};
				Insert: {
					created_at?: string;
					email: string;
					id: string;
					name: string;
					profile_picture?: string | null;
				};
				Update: {
					created_at?: string;
					email?: string;
					id?: string;
					name?: string;
					profile_picture?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "users_id_fkey";
						columns: ["id"];
						isOneToOne: true;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			priority: "low" | "medium" | "high";
			roles:
				| "owner"
				| "team_admin"
				| "project_admin"
				| "contributor"
				| "viewer";
			task_status: "backlog" | "in_review" | "in_progress" | "complete";
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
	  }
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
			PublicSchema["Views"])
	? (PublicSchema["Tables"] &
			PublicSchema["Views"])[PublicTableNameOrOptions] extends {
			Row: infer R;
	  }
		? R
		: never
	: never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
	  }
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
	? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
			Insert: infer I;
	  }
		? I
		: never
	: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
	  }
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
	? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
			Update: infer U;
	  }
		? U
		: never
	: never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema["Enums"]
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
	? PublicSchema["Enums"][PublicEnumNameOrOptions]
	: never;
