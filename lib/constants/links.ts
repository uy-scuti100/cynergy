import { MdDashboard } from "react-icons/md";
import { BiSolidBriefcaseAlt } from "react-icons/bi";
import { ImUsers } from "react-icons/im";
import { FaUsers } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";

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
		icon: MdDashboard,
	},
	{
		label: "Schedule",
		href: "/workspace/schedule",
		icon: BiSolidBriefcaseAlt,
	},

	{
		label: "Teams",
		href: "/workspace/teams",
		icon: ImUsers,
	},
	{
		label: "Members",
		href: "/workspace/members",
		icon: FaUsers,
	},

	{
		label: "Settings",
		href: "/workspace/settings",
		icon: IoSettings,
	},
];
