"use server";

import { client } from "@/lib/types/prisma";
export const createTeam = async (
	teamName: string,
	description: string | null,
	userId: string
) => {
	try {
		const team = await client.teams.create({
			data: {
				name: teamName,
				description,
				owner_id: userId,
			},
		});

		const teamMembership = await client.team_members.create({
			data: {
				user_id: userId,
				team_id: team.id,
				role: "owner",
			},
		});
		return team;
	} catch (error) {
		console.error("Error creating team:", error);
		throw new Error("Failed to create team");
	}
};
// get all teams
export const getTeams = async ({ userId }: { userId: string }) => {
	// Fetch teams owned by the user
	const ownedTeams = await client.teams.findMany({
		where: {
			owner_id: userId,
		},
		include: {
			team_members: true,
			projects: true,
		},
		orderBy: {
			created_at: "desc",
		},
	});

	const memberTeams = await client.teams.findMany({
		where: {
			team_members: {
				some: {
					user_id: userId,
				},
			},
		},
		include: {
			team_members: true,
			projects: true,
		},
		orderBy: {
			created_at: "desc",
		},
	});

	// Add member count to each team
	const formattedOwnedTeams = ownedTeams.map((team) => ({
		...team,
		memberCount: team.team_members.length,
		projectCount: team.projects.length,
	}));

	const formattedMemberTeams = memberTeams.map((team) => ({
		...team,
		memberCount: team.team_members.length,
		projectCount: team.projects.length,
	}));

	return {
		ownedTeams: formattedOwnedTeams,
		memberTeams: formattedMemberTeams,
	};
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
