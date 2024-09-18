import UsableHeading from "@/app/_components/reusable-header/usableheader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateTeamModal from "./_components/createTeamModal";
import { createClient } from "@/lib/supabase/server";
import { client } from "@/lib/types/prisma";
import TeamsList from "./_components/teamslist";

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
		return null; // or handle the case when user is not found
	}

	return (
		<div className="common__styles">
			<div className="flex items-center justify-between">
				<UsableHeading
					title="Teams page"
					description="lets see how this goes"
				/>
				<CreateTeamModal user={user} />
			</div>

			<div>
				<TeamsList user={user} />
			</div>
		</div>
	);
}
