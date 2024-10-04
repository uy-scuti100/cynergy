import { useQuery } from "@tanstack/react-query";
import { ITeam } from "../types/types";
import { getTeamById } from "@/actions/teams";

export const useFetchSingleTeam = (teamId: string) => {
	return useQuery({
		queryKey: ["team", teamId],
		queryFn: () => getTeamById(teamId),
		enabled: !!teamId,
	});
};
