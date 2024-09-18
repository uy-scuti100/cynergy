"use client";
import { useQuery } from "@tanstack/react-query";
import { getTeams } from "@/actions/index";
import { IUser } from "@/lib/types/types";

const TeamsList = ({ user }: { user: IUser }) => {
	const userId = user.id;
	const {
		data: teams,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["teams"],
		queryFn: () => getTeams({ userId }),
	});

	if (isLoading) return <div>Loading teams...</div>;
	if (isError) return <div>Error loading teams</div>;

	return (
		<div>
			<h2>Teams</h2>
			<ul>
				{teams?.map((team: any) => (
					<li key={team.id}>
						<div>
							<strong>{team.name}</strong>
							<p>{team.description}</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TeamsList;
