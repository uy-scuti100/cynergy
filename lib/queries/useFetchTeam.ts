import { getTeams } from "@/actions/teams";
import { useQuery } from "@tanstack/react-query";

const useFetchTeam = (userId: string) => {
	const {
		data: teamsData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["teams", userId],
		queryFn: () => getTeams({ userId }),
	});

	return { teamsData, isLoading, isError };
};

export default useFetchTeam;
