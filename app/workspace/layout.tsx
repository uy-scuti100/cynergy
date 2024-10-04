import { client } from "@/lib/types/prisma";
import { createClient } from "@/lib/supabase/server";

import Logo from "@/components/global/logo";
import { Plan } from "../_components/plans/plans";
import { Separator } from "@/components/ui/separator";

import ReusableAccordion from "../_components/reusable-accordion/reusable-accordion";
import SideNav from "../_components/side-nav/side-nav";
import Header from "../_components/header/header";
import { getTeams } from "@/actions/teams";
import Image from "next/image";

export default async function WorkspaceLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const supabase = createClient();
	const { data: currentUser } = await supabase.auth.getUser();
	const id = currentUser.user?.id;
	const teamsData = await getTeams({ userId: id as string });

	const user = await client.users.findFirst({
		where: {
			id,
		},
		select: {
			id: true,
			email: true,
			name: true,
			profile_picture: true,
		},
	});
	interface HeaderProps {
		id: string | null;
		email: string | null;
		name: string | null;
		profile_picture: string | null;
	}

	return (
		<main className="flex ">
			<aside className="hidden md:block h-full w-[200px] fixed z-50 border-r">
				<div className="bg-background flex cursor-pointer items-center justify-start ml-6 h-[60px]">
					<div>
						<Image src="/new-logo.png" alt="logo" width={150} height={50} />
					</div>
				</div>
				<div className="py-2 ml-3">
					<SideNav />
				</div>
				<Separator />
				<div className="py-2 ml-6 pr-3 h-[calc(100vh_-_292px_-_61px)] overflow-y-auto">
					<ReusableAccordion
						tag="team"
						projects={{
							ownedTeams: teamsData.ownedTeams.map((team) => ({
								...team,
								id: team.id.toString(),
							})),
							memberTeams: teamsData.memberTeams.map((team) => ({
								...team,
								id: team.id.toString(),
							})),
						}}
					/>

					{/* <ReusableAccordion
						tag="projects"
						projects={[...teamsData.ownedTeams, ...teamsData.memberTeams].map(
							(team) => ({
								...team,
								id: team.id.toString(),
							})
						)}
					/>
					<ReusableAccordion
						tag="tasks"
						projects={[...teamsData.ownedTeams, ...teamsData.memberTeams].map(
							(team) => ({
								...team,
								id: team.id.toString(),
							})
						)}
					/> */}
				</div>
				<Plan />
			</aside>
			<div className="flex-1">
				<Header {...(user as HeaderProps)} />
				{children}
			</div>
		</main>
	);
}
