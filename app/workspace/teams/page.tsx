import UsableHeading from "@/app/_components/reusable-header/usableheader";
import { createClient } from "@/lib/supabase/server";
import { client } from "@/lib/types/prisma";
import TeamsList from "./_components/misc/teamslist";
import { redirect } from "next/navigation";
import TeamDialog from "./_components/forms/team/create-team-dialog";

export default async function page() {
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

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="common__styles">
			<div className="flex items-center justify-between pr-5 md:pr-0 ">
				<UsableHeading title="Teams" />
				<TeamDialog user={user} message="New Team" />
			</div>

			<div className="mt-10">
				<TeamsList user={user} />
			</div>
		</div>
	);
}
