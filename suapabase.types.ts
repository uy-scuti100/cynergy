export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					operationName?: string;
					query?: string;
					variables?: Json;
					extensions?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	public: {
		Tables: {
			comments: {
				Row: {
					content: string;
					created_at: string | null;
					id: string;
					parent_id: string | null;
					project_id: string | null;
					task_id: string;
					user_id: string;
				};
				Insert: {
					content: string;
					created_at?: string | null;
					id?: string;
					parent_id?: string | null;
					project_id?: string | null;
					task_id: string;
					user_id: string;
				};
				Update: {
					content?: string;
					created_at?: string | null;
					id?: string;
					parent_id?: string | null;
					project_id?: string | null;
					task_id?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "fk_comment_parent";
						columns: ["parent_id"];
						isOneToOne: false;
						referencedRelation: "comments";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "fk_comment_project";
						columns: ["project_id"];
						isOneToOne: false;
						referencedRelation: "projects";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "fk_comment_task";
						columns: ["task_id"];
						isOneToOne: false;
						referencedRelation: "tasks";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "fk_comment_user";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			project_members: {
				Row: {
					created_at: string | null;
					id: string;
					project_id: string;
					role: Database["public"]["Enums"]["roles"];
					user_id: string;
				};
				Insert: {
					created_at?: string | null;
					id?: string;
					project_id: string;
					role: Database["public"]["Enums"]["roles"];
					user_id: string;
				};
				Update: {
					created_at?: string | null;
					id?: string;
					project_id?: string;
					role?: Database["public"]["Enums"]["roles"];
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "fk_project_member_project";
						columns: ["project_id"];
						isOneToOne: false;
						referencedRelation: "projects";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "fk_project_member_user";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			projects: {
				Row: {
					created_at: string | null;
					description: string | null;
					end_date: string | null;
					id: string;
					name: string;
					owner_id: string;
					start_date: string | null;
					team_id: string;
				};
				Insert: {
					created_at?: string | null;
					description?: string | null;
					end_date?: string | null;
					id?: string;
					name: string;
					owner_id: string;
					start_date?: string | null;
					team_id: string;
				};
				Update: {
					created_at?: string | null;
					description?: string | null;
					end_date?: string | null;
					id?: string;
					name?: string;
					owner_id?: string;
					start_date?: string | null;
					team_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "fk_project_owner";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "fk_project_team";
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
					created_at: string | null;
					id: string;
					task_id: string;
					user_id: string;
				};
				Insert: {
					assigned_by: string;
					created_at?: string | null;
					id?: string;
					task_id: string;
					user_id: string;
				};
				Update: {
					assigned_by?: string;
					created_at?: string | null;
					id?: string;
					task_id?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "fk_task_assignee_assigned_by";
						columns: ["assigned_by"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "fk_task_assignee_task";
						columns: ["task_id"];
						isOneToOne: false;
						referencedRelation: "tasks";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "fk_task_assignee_user";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			tasks: {
				Row: {
					created_at: string | null;
					created_by: string;
					description: string | null;
					end_date: string | null;
					id: string;
					priority: Database["public"]["Enums"]["priority"];
					project_id: string;
					start_date: string | null;
					status: Database["public"]["Enums"]["task_status"];
					tags: string[] | null;
					title: string;
				};
				Insert: {
					created_at?: string | null;
					created_by: string;
					description?: string | null;
					end_date?: string | null;
					id?: string;
					priority: Database["public"]["Enums"]["priority"];
					project_id: string;
					start_date?: string | null;
					status: Database["public"]["Enums"]["task_status"];
					tags?: string[] | null;
					title: string;
				};
				Update: {
					created_at?: string | null;
					created_by?: string;
					description?: string | null;
					end_date?: string | null;
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
						foreignKeyName: "fk_task_creator";
						columns: ["created_by"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "fk_task_project";
						columns: ["project_id"];
						isOneToOne: false;
						referencedRelation: "projects";
						referencedColumns: ["id"];
					},
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
					created_at: string | null;
					id: string;
					role: Database["public"]["Enums"]["roles"];
					team_id: string;
					user_id: string;
				};
				Insert: {
					created_at?: string | null;
					id?: string;
					role: Database["public"]["Enums"]["roles"];
					team_id: string;
					user_id: string;
				};
				Update: {
					created_at?: string | null;
					id?: string;
					role?: Database["public"]["Enums"]["roles"];
					team_id?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "fk_team_member_team";
						columns: ["team_id"];
						isOneToOne: false;
						referencedRelation: "teams";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "fk_team_member_user";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			teams: {
				Row: {
					created_at: string | null;
					description: string | null;
					id: string;
					name: string;
					owner_id: string;
				};
				Insert: {
					created_at?: string | null;
					description?: string | null;
					id?: string;
					name: string;
					owner_id: string;
				};
				Update: {
					created_at?: string | null;
					description?: string | null;
					id?: string;
					name?: string;
					owner_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "fk_team_owner";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			users: {
				Row: {
					created_at: string | null;
					email: string;
					id: string;
					name: string;
					profile_picture: string | null;
				};
				Insert: {
					created_at?: string | null;
					email: string;
					id?: string;
					name: string;
					profile_picture?: string | null;
				};
				Update: {
					created_at?: string | null;
					email?: string;
					id?: string;
					name?: string;
					profile_picture?: string | null;
				};
				Relationships: [];
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
