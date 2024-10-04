// hooks/useCreateTeamMutation.ts
import { createTeam } from "@/actions/teams";
import { ITeam } from "@/lib/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTeamMutation = (userId: string, onClose: () => void) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			name,
			description,
		}: {
			name: string;
			description: string;
		}) => createTeam(name, description, userId),
		onMutate: async (newTeam) => {
			await queryClient.cancelQueries({ queryKey: ["teams"] });

			const previousTeams = queryClient.getQueryData<ITeam[]>(["teams"]);

			queryClient.setQueryData(["teams"], (oldTeams: ITeam[] | undefined) => {
				const newTeamWithTempId = { id: "temp-id", ...newTeam };

				return Array.isArray(oldTeams)
					? [...oldTeams, newTeamWithTempId]
					: [newTeamWithTempId];
			});

			return { previousTeams };
		},
		onError: (err, newTeam, context) => {
			if (context?.previousTeams) {
				queryClient.setQueryData(["teams"], context.previousTeams);
			}
			console.error("Error while creating team:", err);
			toast.error("Error creating team", {
				description: "There was an issue creating the team.",
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["teams"] });
			toast.success("Team created successfully!", {
				description: "Your team has been successfully created.",
			});
			onClose(); // Close the modal after successful creation
		},
	});
};
