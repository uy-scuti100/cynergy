// hooks/useUpdateTeamMutation.ts
import { updateTeam } from "@/actions/teams";
import { ITeam } from "@/lib/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateTeamMutation = (onClose: () => void) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			teamId,
			name,
			description,
		}: {
			teamId: string;
			name: string;
			description: string;
		}) => updateTeam(teamId, name, description), // Here we pass mutationFn correctly
		onMutate: async (updatedTeam) => {
			await queryClient.cancelQueries({ queryKey: ["teams"] });

			const previousTeams = queryClient.getQueryData<ITeam[]>(["teams"]);

			queryClient.setQueryData(["teams"], (oldTeams: ITeam[] | undefined) => {
				return (
					oldTeams?.map((team) =>
						team.id === updatedTeam.teamId
							? {
									...team,
									name: updatedTeam.name,
									description: updatedTeam.description,
							  }
							: team
					) || []
				);
			});

			return { previousTeams };
		},
		onError: (err, updatedTeam, context) => {
			queryClient.setQueryData(["teams"], context?.previousTeams);
			console.error("Error while updating team:", err);
			toast.error("Error updating team", {
				description: "There was an issue updating the team.",
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["teams"] });
			toast.success("Team updated successfully!", {
				description: "Your team has been successfully updated.",
			});
			onClose(); // Close the modal after successful update
		},
	});
};
