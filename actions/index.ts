"use server";

import { client } from "@/lib/types/prisma";

export const createTeam = async (
	teamName: string,
	description: string,
	userId: string
) => {
	const team = await client.teams.create({
		data: {
			owner_id: userId,
			name: teamName,
			description: description,
		},
	});

	return team;
};

export const getTeams = async ({ userId }: { userId: string }) => {
	const response = await client.teams.findMany({
		where: {
			owner_id: userId,
		},
	});
	return response;
};
