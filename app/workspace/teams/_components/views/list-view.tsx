import Link from "next/link";
import { FaUsers } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import ListViewTeamSkeleton from "../skeletons/list-view-skeleton";

type ListViewProps = {
	teams: any[];
	isLoading: boolean;
	isError: boolean;
};

export default function ListView({ teams, isError, isLoading }: ListViewProps) {
	return (
		<div>
			<div className="flex flex-col gap-5">
				{teams?.length > 0 && (
					<div className="flex gap-4 flex-col">
						{teams.map((team) => {
							const memberCount = team.members ? team.members.length : 0;
							const projectCount = team.projects ? team.projects.length : 0;
							return (
								<menu key={team.id}>
									<Link href={`/workspace/teams/${team.id}`}>
										<div className="p-4 border rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
											<h3 className="font-semibold">{team.name}</h3>
											{team.description && (
												<p className="text-sm text-gray-500">
													{team.description}
												</p>
											)}
											<div className="flex items-end justify-end mt-6 gap-6">
												<p className="mt-2 flex items-center gap-2">
													<FaUsers className="text-[var(--accent)]" />
													<p className="text-sm text-gray-500">
														{memberCount + 1} member(s)
													</p>
												</p>

												<p className="mt-2 flex items-center gap-2">
													<MdAssignmentAdd className="text-[var(--accent)]" />
													<p className="text-sm text-gray-500">
														{projectCount} project(s)
													</p>
												</p>
											</div>
										</div>
									</Link>
								</menu>
							);
						})}
					</div>
				)}

				{isLoading && (
					<div className="flex flex-col gap-5">
						{Array(6)
							.fill(0)
							.map((_, index) => (
								<ListViewTeamSkeleton key={index} />
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
			</div>
		</div>
	);
}
