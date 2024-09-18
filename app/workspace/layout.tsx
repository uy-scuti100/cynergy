import { client } from "@/lib/types/prisma";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import Logo from "@/components/global/logo";
import { RouteSelect } from "../_components/route-select/route-select";
import { Plan } from "../_components/plans/plans";
import { Separator } from "@/components/ui/separator";

import ReusableAccordion from "../_components/reusable-accordion/reusable-accordion";
import { fakeProjects, fakeTasks, fakeTeam } from "@/lib/constants/links";
import SideNav from "../_components/side-nav/side-nav";
import Header from "../_components/header/header";

export default async function WorkspaceLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const supabase = createClient();
	const { data: currentUser } = await supabase.auth.getUser();
	const id = currentUser.user?.id;

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
						<Logo />
					</div>
				</div>
				<div className="py-2 ml-3">
					<SideNav />
				</div>
				<Separator />
				<div className="py-2 ml-6 pr-3 h-[calc(100vh_-_292px_-_61px)] overflow-y-auto">
					<ReusableAccordion
						tag="team"
						projects={fakeTeam.map((project) => ({
							...project,
							id: project.id.toString(),
						}))}
					/>
					<ReusableAccordion
						tag="projects"
						projects={fakeProjects.map((project) => ({
							...project,
							id: project.id.toString(),
						}))}
					/>
					<ReusableAccordion
						tag="tasks"
						projects={fakeTasks.map((project) => ({
							...project,
							id: project.id.toString(),
						}))}
					/>
				</div>
				<Plan />
			</aside>
			<div className="flex-1">
				{/* <Header /> */}
				<Header {...(user as HeaderProps)} />
				{children}
			</div>
		</main>
	);
}
