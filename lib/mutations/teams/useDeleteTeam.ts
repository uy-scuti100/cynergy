import { deleteTeam } from "@/actions/teams";
import { ITeam } from "@/lib/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteTeamMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (teamId: string) => deleteTeam(teamId),
		onMutate: async (teamId) => {
			await queryClient.cancelQueries({ queryKey: ["teams"] });

			const previousTeams = queryClient.getQueryData<ITeam[]>(["teams"]);

			queryClient.setQueryData(["teams"], (oldTeams: ITeam[] | undefined) => {
				return oldTeams?.filter((team) => team.id !== teamId) || [];
			});

			return { previousTeams };
		},
		onError: (err, teamId, context) => {
			queryClient.setQueryData(["teams"], context?.previousTeams);
			console.error("Error while deleting team:", err);
			toast.error("Error deleting team", {
				description: "There was an issue deleting the team.",
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["teams"] });
			toast.success("Team deleted successfully!", {
				description: "Your team has been successfully deleted.",
			});
		},
	});
};
