// import { createProject } from "@/actions/projects";
import { createProject } from "@/actions/projects";
import { IProject } from "@/lib/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CreateProjectMutationVariables {
	name: string;
	description: string;
	start_date?: string | null;
	end_date?: string | null;
	team_id: string;
	owner_id: string;
}
export const useCreateProjectMutation = (
	userId: string,
	onClose: () => void
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			name,
			description,
			start_date,
			end_date,
			team_id,
			owner_id,
		}: CreateProjectMutationVariables) =>
			createProject(name, description, owner_id, team_id, start_date, end_date),
		onMutate: async (newProject) => {
			await queryClient.cancelQueries({ queryKey: ["projects"] });

			const previousProjects = queryClient.getQueryData<IProject[]>([
				"projects",
			]);

			queryClient.setQueryData(
				["projects"],
				(oldProjects: IProject[] | undefined) => {
					const newProjectWithTempId = { id: "temp-id", ...newProject };

					return Array.isArray(oldProjects)
						? [...oldProjects, newProjectWithTempId]
						: [newProjectWithTempId];
				}
			);

			return { previousProjects };
		},
		onError: (err, newProject, context) => {
			if (context?.previousProjects) {
				queryClient.setQueryData(["projects"], context.previousProjects);
			}
			console.log("Error while creating project:", err);
			toast.error("Error creating project", {
				description: "There was an issue creating the project.",
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			toast.success("Project created successfully!", {
				description: "Your project has been successfully created.",
			});
			onClose(); // Close the modal after successful creation
		},
	});
};
