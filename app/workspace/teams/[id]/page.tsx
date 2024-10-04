import { getTeamById } from "@/actions/teams";
import UsableHeading from "@/app/_components/reusable-header/usableheader";
import { notFound, redirect } from "next/navigation";
import CreateProjectForm from "../_components/forms/project/create-project-form";

import { createClient } from "@/lib/supabase/server";
import { client } from "@/lib/types/prisma";
import ProjectDialog from "../_components/forms/project/create-project-dialog";

export default async function TeamPage({ params }: { params: { id: string } }) {
	const team = await getTeamById(params.id);
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
			<div className="flex items-center justify-between">
				<UsableHeading
					title={team?.name as string}
					className="capitalize"
					description={team?.description as string}
				/>
				<ProjectDialog user={user} message="New Project" teamId={params.id} />
			</div>
		</div>
	);
}

{
	/* <div className=" shadow-md rounded-lg p-6">
<p className="mb-2">
    <strong>ID:</strong> {team.id}
</p>
<p className="mb-2">
    <strong>Description:</strong> {team.description}
</p>
<p className="mb-2">
    <strong>Created At:</strong>{" "}
    {new Date(team.created_at).toLocaleDateString()}
</p>
<p className="mb-2">
    <strong>Members:</strong> {team.members.length}
</p>
{team.projects && (
    <div>
        <h2 className="text-xl font-semibold mt-4 mb-2">Projects:</h2>
        <ul className="list-disc list-inside">
            {team.projects.map((project) => (
                <li key={project.id}>{project.name}</li>
            ))}
        </ul>
    </div>
)}
</div> */
}
