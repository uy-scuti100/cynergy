"use client";

import Logo from "@/components/global/logo";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AiFillMacCommand } from "react-icons/ai";

import { HiOutlineX } from "react-icons/hi";
import { Dispatch } from "react";
import { Separator } from "@/components/ui/separator";
import {
	fakeProjects,
	fakeTasks,
	fakeTeam,
	linkDetails,
} from "@/lib/constants/links";
import { Plan } from "../plans/plans";
import { CommandMenu } from "../command-menu/command_opener";
import ReusableAccordion from "../reusable-accordion/reusable-accordion";
import { SidebarLink } from "../sidebar-link/sidebar-link";
import PriorityAccordion from "../priority";
import useFetchTeam from "@/lib/queries/useFetchTeam";
import Image from "next/image";
interface MobileNavProps {
	id: string | null;
	openNav: boolean;
	toggleNav: () => void;
	navRef: React.RefObject<HTMLDivElement>;
	open: boolean;
	setOpen: Dispatch<React.SetStateAction<boolean>>;
	setOpenNav: Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileNavigation({
	id,
	openNav,
	toggleNav,
	setOpenNav,
	navRef,
	open,
	setOpen,
}: MobileNavProps) {
	const { teamsData, isLoading, isError } = useFetchTeam(id as string);
	return (
		<>
			<nav
				className={`z-50 inset-0 ${
					openNav ? "translate-x-0" : "-translate-x-full"
				} custom-easing md:hidden fixed inset-0 overflow-hidden custom-easing z-[50] backdrop-blur-md`}
			>
				<div
					ref={navRef}
					className="bg-[var(--background)] absolute top-0 rounded-sm ring-offset-background transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none inset-y-0 left-0 h-full w-2/4 border-r"
				>
					<div className="bg-background flex justify-between text-4xl border-b px-4 py-2 cursor-pointer items-center">
						<div className="flex items-center justify-between w-full">
							{/* <Logo /> */}
							<Image src="/new-logo.png" alt="logo" width={150} height={50} />
							<HiOutlineX size={20} onClick={toggleNav} />
						</div>
					</div>

					<div className="flex flex-col gap-4 pt-4 h-[calc(100vh-128px)] overflow-y-auto px-2">
						{/* search */}
						<div className="flex items-center border px-2 rounded">
							<Search className="h-5 w-5 text-muted-foreground" />
							<Input
								readOnly
								onFocus={(e) => {
									e.target.blur(), setOpen(true);
								}}
								type="search"
								placeholder="Search..."
								className="bg-none focus:outline-none outline-none focus:ring-0 border-none shadow-none ring-0 focus:ring-offset-0 focus-visible:ring-0 placeholder:font- placeholder:text-sm placeholder:font-medium rounded-none"
							/>
							<div className="flex items-center">
								<AiFillMacCommand size={14} />
								<span className="text-xs">K</span>
							</div>
						</div>
						{/* links */}
						<div className="flex flex-col gap-1">
							{linkDetails.map((link, index) => (
								<SidebarLink
									setOpenNav={setOpenNav}
									key={index}
									icon={link.icon}
									label={link.label}
									href={link.href}
								/>
							))}
							<Separator />
						</div>
						{/* teams, projects and tasks accordion */}
						<div className="ml-3 pr-3 h-[calc(100vh_-_292px_-_61px)] overflow-y-auto">
							<ReusableAccordion
								tag="team"
								projects={{
									ownedTeams:
										teamsData?.ownedTeams.map((team) => ({
											...team,
											id: team.id.toString(),
										})) || [],
									memberTeams:
										teamsData?.memberTeams.map((team) => ({
											...team,
											id: team.id.toString(),
										})) || [],
								}}
							/>

							{/* <ReusableAccordion
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
							/> */}
							<div className="mt-5">
								<PriorityAccordion />
							</div>
						</div>
						{/* priorities  tab*/}
					</div>
					<Plan />
				</div>
			</nav>
			<CommandMenu open={open} setOpen={setOpen} />
		</>
	);
}
