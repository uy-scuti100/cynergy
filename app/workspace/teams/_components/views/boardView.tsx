"use client";
import Link from "next/link";
import { TeamCard } from "../misc/teamcard";
import BoardViewTeamSkeleton from "../skeletons/board-view-teams-skeleton";
import { useState } from "react";
import { ITeam } from "@/lib/types/types";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoEye } from "react-icons/io5";
import { FaEdit, FaTrash } from "react-icons/fa";
import ReusableModal from "@/app/_components/modal/modal";
import DeleteTeamDialog from "../forms/team/delete-team-form";
import EditTeamForm from "../forms/team/edit-team-form";

type BoardViewProps = {
	teams: any[];
	isLoading: boolean;
	isError: boolean;
};
export default function BoardView({
	teams,
	isError,
	isLoading,
}: BoardViewProps) {
	const [openEdit, setOpenEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [selectedEditTeam, setSelectedEditTeam] = useState<ITeam | null>(null); // State for selected team
	const [selectedDeleteTeam, setSelectedDeleteTeam] = useState<ITeam | null>(
		null
	); // State for selected team

	const handleEditClick = (team: ITeam) => {
		setSelectedEditTeam(team);
		setOpenEdit(true);
	};
	const handleDeleteClick = (team: ITeam) => {
		setSelectedDeleteTeam(team);
		setOpenDelete(true);
	};
	//
	return (
		<div className="">
			{teams?.length > 0 && (
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 items-center justify-between gap-2 relative">
					{teams?.map((team) => (
						<>
							<div className="relative h-[150px] max-w-[250px]">
								<TeamCard
									team={{ ...team, description: team.description || "" }}
								/>

								<div className="absolute top-0 right-0">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" className="h-8 w-8 p-0">
												<MoreHorizontal className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem>
												<Link
													key={team.id}
													href={`/workspace/teams/${team.id}`}
													className="flex items-center"
												>
													<IoEye className="mr-2 h-4 w-4" />
													View Details
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem onClick={() => handleEditClick(team)}>
												<FaEdit className="mr-2 h-4 w-4" />
												Edit
											</DropdownMenuItem>
											<DropdownMenuItem onClick={() => handleDeleteClick(team)}>
												<FaTrash className="mr-2 h-4 w-4" />
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</div>
						</>
					))}
				</div>
			)}

			{isLoading && (
				<div className="grid grid-cols-2 sm:flex items-center justify-between gap-2">
					{Array(6)
						.fill(0)
						.map((_, index) => (
							<BoardViewTeamSkeleton key={index} />
						))}
				</div>
			)}

			{isError && (
				<div className="flex items-center justify-center w-full p-4 bg-red-100 border border-red-300 rounded-md">
					<div className="flex items-center">
						<svg
							className="w-6 h-6 text-red-500 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span className="text-red-700 font-medium">
							Error loading teams
						</span>
					</div>
				</div>
			)}
			{teams?.length < 1 && (
				<div className="flex flex-col items-center justify-center w-full h-64">
					<svg
						className="w-24 h-24 text-gray-400 dark:text-neutral-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
						/>
					</svg>
					<p className="mt-4 text-lg font-medium text-gray-600 dark:text-neutral-400">
						No teams found
					</p>
				</div>
			)}
			{selectedEditTeam && (
				<ReusableModal isOpen={openEdit} onClose={setOpenEdit}>
					<EditTeamForm
						teamId={selectedEditTeam.id} // Pass selected team ID
						name={selectedEditTeam.name} // Pass selected team name
						description={selectedEditTeam.description || ""} // Pass selected team description
						onClose={() => setOpenEdit(false)} // Close modal after editing
					/>
				</ReusableModal>
			)}

			{selectedDeleteTeam && (
				<ReusableModal isOpen={openDelete} onClose={setOpenDelete}>
					<DeleteTeamDialog
						teamId={selectedDeleteTeam.id}
						teamName={selectedDeleteTeam.name}
						onClose={() => setOpenDelete(false)}
					/>
				</ReusableModal>
			)}
		</div>
	);
}
