"use client";
import { IUser } from "@/lib/types/types";
import { MdSpaceDashboard } from "react-icons/md";
import { MdTableChart } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdWorkspacePremium } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";

import useFetchTeam from "@/lib/queries/useFetchTeam";
import BoardView from "../views/boardView";
import ListView from "../views/list-view";
import TableView from "../views/table-view";

export default function TeamsList({ user }: { user: IUser }) {
	const [activeTab, setActiveTab] = useState("Board");
	const [activeTeam, setActiveTeam] = useState("own");
	const userId = user.id;
	const { teamsData, isLoading, isError } = useFetchTeam(userId);

	return (
		<div className="flex flex-col gap-5">
			<div className="flex items-center gap-4 relative">
				<Button
					className="py-2 rounded-2xl px-4 flex items-center gap-1 justify-center"
					onClick={() => setActiveTeam("own")}
					variant={activeTeam === "own" ? "default" : "outline"}
				>
					<span> Owned Teams</span>
					<MdWorkspacePremium className="sm:ml-2 h-4 w-4" />
				</Button>

				<Button
					className="py-2 rounded-2xl px-4 flex items-center gap-1 justify-center"
					onClick={() => setActiveTeam("invited")}
					variant={activeTeam === "invited" ? "default" : "outline"}
				>
					<span> By Invitation</span>
					<IoPersonAddSharp className="sm:ml-2 h-4 w-4" />
				</Button>
			</div>
			{activeTeam === "own" && (
				<>
					<div className="flex justify-between gap-2 border-y pb-[8px] pt-2 dark:border-stroke-dark md:items-center">
						<div className="flex flex-1 items-center gap-2 md:gap-4">
							<TabButton
								name="Board"
								icon={<MdSpaceDashboard className="h-4 w-4" />}
								setActiveTab={setActiveTab}
								activeTab={activeTab}
							/>

							<TabButton
								name="Table"
								icon={<MdTableChart className="h-4 w-4" />}
								setActiveTab={setActiveTab}
								activeTab={activeTab}
							/>
							<TabButton
								name="List"
								icon={<FaList className="h-4 w-4" />}
								setActiveTab={setActiveTab}
								activeTab={activeTab}
							/>
						</div>
						<div className="flex items-center gap-2">
							<button className="opacity-50 hover:opacity-100 dark:text-neutral-500 dark:hover:text-gray-300">
								<FaFilter className="h-4 w-4" />
							</button>
						</div>
					</div>

					{activeTab === "Board" && (
						<BoardView
							isError={isError}
							isLoading={isLoading}
							teams={teamsData?.ownedTeams || []}
						/>
					)}
					{activeTab === "List" && (
						<ListView
							teams={teamsData?.ownedTeams || []}
							isLoading={isLoading}
							isError={isError}
						/>
					)}
					{activeTab === "Table" && (
						<TableView teams={teamsData?.ownedTeams || []} />
					)}
				</>
			)}
			{activeTeam === "invited" && (
				<>
					<div className="flex justify-between gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center">
						<div className="flex flex-1 items-center gap-2 md:gap-4">
							<TabButton
								name="Board"
								icon={<MdSpaceDashboard className="h-4 w-4" />}
								setActiveTab={setActiveTab}
								activeTab={activeTab}
							/>

							<TabButton
								name="Table"
								icon={<MdTableChart className="h-4 w-4" />}
								setActiveTab={setActiveTab}
								activeTab={activeTab}
							/>
							<TabButton
								name="List"
								icon={<FaList className="h-4 w-4" />}
								setActiveTab={setActiveTab}
								activeTab={activeTab}
							/>
						</div>
						<div className="flex items-center gap-2">
							<button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
								<FaFilter className="h-4 w-4" />
							</button>
						</div>
					</div>

					{activeTab === "Board" && (
						<BoardView
							isError={isError}
							isLoading={isLoading}
							teams={teamsData?.memberTeams || []}
						/>
					)}
					{activeTab === "List" && (
						<ListView
							teams={teamsData?.memberTeams || []}
							isLoading={isLoading}
							isError={isError}
						/>
					)}
					{activeTab === "Table" && (
						<TableView teams={teamsData?.memberTeams || []} />
					)}
				</>
			)}
		</div>
	);
}
type TabButtonProps = {
	name: string;
	icon: React.ReactNode;
	setActiveTab: (tabName: string) => void;
	activeTab: string;
};

const TabButton = ({ name, icon, setActiveTab, activeTab }: TabButtonProps) => {
	const isActive = activeTab === name;

	return (
		<button
			className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-[var(--foreground)] dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4 ${
				isActive
					? "text-[var(--foreground)] after:bg-[var(--foreground)] dark:text-white"
					: ""
			}`}
			onClick={() => setActiveTab(name)}
		>
			<span> {icon}</span>

			<span> {name}</span>
		</button>
	);
};
