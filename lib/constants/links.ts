import { TeamsIcon } from "@/app/_components/icons/icons";
import { Briefcase, LayoutDashboard, Settings } from "lucide-react";
import { RiTeamLine } from "react-icons/ri";

export const fakeProjects = [
	{
		id: 1,
		name: "Project 1",
		description: "This is the first project",
	},
	{
		id: 2,
		name: "Project 2",
		description: "This is the second project",
	},
	{
		id: 3,
		name: "Project 3",
		description: "This is the third project",
	},
];

export const fakeTeam = [
	{
		id: 1,
		name: "Team 1",
		description: "This is the first team",
	},
	{
		id: 2,
		name: "Team 2",
		description: "This is the second team",
	},
	{
		id: 3,
		name: "Team 3",
		description: "This is the third team",
	},
];

export const fakeTasks = [
	{
		id: 1,
		name: "Task 1",
		description: "This is the first task",
	},
	{
		id: 2,
		name: "Task 2",
		description: "This is the second task",
	},
	{
		id: 3,
		name: "Task 3",
		description: "This is the third task",
	},
	{
		id: 4,
		name: "Task 4",
		description: "This is the fourth task",
	},
];

export const linkDetails = [
	{
		label: "Dashboard",
		href: "/workspace",
		icon: LayoutDashboard,
	},
	{
		label: "Schedule",
		href: "/workspace/schedule",
		icon: Briefcase,
	},

	{
		label: "Teams",
		href: "/workspace/teams",
		icon: TeamsIcon,
	},
	{
		label: "Members",
		href: "/workspace/members",
		icon: RiTeamLine,
	},

	{
		label: "Settings",
		href: "/workspace/settings",
		icon: Settings,
	},
];
