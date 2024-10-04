import { Button } from "@/components/ui/button";
import { ITeam } from "@/lib/types/types";
import { MoreHorizontal } from "lucide-react";
import { FaUsers } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";

export const TeamCard = ({ team }: { team: ITeam }) => {
	const memberCount = team.members ? team.members.length : 0;
	const projectCount = team.projects ? team.projects.length : 0;
	return (
		<div className="h-[150px] max-w-[250px] w-full p-4 rounded-lg shadow relative bg-[var(--light-background)] hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-900 duration-300 transition-colors">
			<div className="">
				<h3 className="font-semibold capitalize">
					{team.name.substring(0, 20)}
				</h3>
				<p className="text-sm opacity-50 line-clamp-3 text-gray-500">
					{team.description?.substring(0, 30)}
				</p>
			</div>

			{/* <div className="absolute top-3 right-3 z-50 ">
				<Button variant="ghost" className="h-8 w-8 p-0">
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</div> */}

			<div className="flex  gap-1 absolute bottom-3 left-3">
				<div className="flex items-center gap-2">
					<FaUsers
						// style={{ color: "var(--accent)" }}
						className="text-[var(--accent)]"
					/>
					<span className="text-sm text-gray-500 font-bold">
						{memberCount + 1}
					</span>{" "}
				</div>
				<div className=" flex items-center gap-2">
					<MdAssignmentAdd
						// style={{ color: "var(--accent)" }}
						className="text-[var(--accent)]"
					/>
					<span className="text-sm text-gray-500 font-bold">
						{projectCount}
					</span>
				</div>
			</div>
		</div>
	);
};

// </p>
// <div className="flex items-end justify-end mt-6 gap-6">
// <p className="mt-2 flex items-center gap-2">
//     <MdAssignmentAdd className="text-[var(--accent)]" />
//     <p className="text-sm text-gray-500">
//         {projectCount} project(s)
//     </p>
// </p>
