"use server";

import { client } from "@/lib/types/prisma";

// create team
export const createProject = async (
	name: string,
	description: string,
	owner_id: string,
	teamId: string,
	start_date?: string | null,
	end_date?: string | null
) => {
	let project;
	try {
		project = await client.projects.create({
			data: {
				owner_id,
				name,
				description,
				team_id: teamId,
				start_date,
				end_date,
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error("Failed to create project");
	}

	return project;
};

// get all teams
export const getProjects = async ({ team_id }: { team_id: string }) => {
	// Fetch teams owned by the user
	const projects = await client.projects.findMany({
		where: {
			team_id,
		},
		// include: {
		// 	team: {
		// 		select: {
		// 			user_id: true,
		// 		},
		// 	},
		// 	projects: {
		// 		select: {
		// 			id: true,
		// 		},
		// 	},
		// },
		orderBy: {
			created_at: "desc",
		},
	});

	// const memberTeams = await client.teams.findMany({
	// 	where: {
	// 		team_members: {
	// 			some: {
	// 				user_id: userId,
	// 			},
	// 		},
	// 	},
	// 	include: {
	// 		team_members: {
	// 			select: {
	// 				user_id: true,
	// 			},
	// 		},
	// 		projects: {
	// 			select: {
	// 				id: true,
	// 			},
	// 		},
	// 	},
	// 	orderBy: {
	// 		created_at: "desc",
	// 	},
	// });

	// // Add member count to each team
	// const formattedOwnedTeams = ownedTeams.map((team) => ({
	// 	...team,
	// 	memberCount: team.team_members.length,
	// 	projectCount: team.projects.length,
	// }));

	// const formattedMemberTeams = memberTeams.map((team) => ({
	// 	...team,
	// 	memberCount: team.team_members.length,
	// 	projectCount: team.projects.length,
	// }));

	// return {
	// 	ownedTeams: formattedOwnedTeams,
	// 	memberTeams: formattedMemberTeams,
	// };
};
// get single team

export const getTeamById = async (id: string) => {
	const team = await client.teams.findUnique({
		where: {
			id,
		},
		include: {
			team_members: true,
			projects: true,
		},
	});

	return team;
};

// update team
// actions/updateTeam.ts
export const updateTeam = async (
	teamId: string,
	teamName: string,
	description: string
) => {
	let team;
	try {
		team = await client.teams.update({
			where: { id: teamId },
			data: {
				name: teamName,
				description: description,
			},
		});
	} catch (error) {
		console.error(error);
		throw new Error("Failed to update team");
	}

	return team;
};

// actions/deleteTeam.ts
export const deleteTeam = async (teamId: string) => {
	try {
		await client.teams.delete({
			where: { id: teamId },
		});
	} catch (error) {
		console.error(error);
		throw new Error("Failed to delete team");
	}
	return true; // Return true to indicate success
};
