import { useRef, useState, useCallback, Dispatch, useEffect } from "react";
import { Command } from "cmdk";
import {
	ContactIcon,
	DocsIcon,
	FeedbackIcon,
	PlusIcon,
	ProjectsIcon,
	TeamsIcon,
	// TasksIcon,
	// DocumentIcon,
} from "../icons/icons";
import { RiTaskFill } from "react-icons/ri";
import { HiDocument } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface CommandMenuProps {
	open: boolean;
	setOpen: Dispatch<React.SetStateAction<boolean>>;
}
export const CommandMenu = ({ open, setOpen }: CommandMenuProps) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [inputValue, setInputValue] = useState("");

	const [pages, setPages] = useState<string[]>(["home"]);
	const activePage = pages[pages.length - 1];
	const isHome = activePage === "home";

	const popPage = useCallback(() => {
		setPages((pages) => {
			const x = [...pages];
			x.splice(-1, 1);
			return x;
		});
	}, []);

	// const onKeyDown = useCallback(
	// 	(e: KeyboardEvent) => {
	// 		if (isHome || inputValue.length) {
	// 			return;
	// 		}

	// 		if (e.key === "Backspace") {
	// 			e.preventDefault();
	// 			popPage();
	// 		}
	// 	},
	// 	[inputValue.length, isHome, popPage]
	// );
	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	function bounce() {
		if (ref.current) {
			ref.current.style.transform = "scale(0.96)";
			setTimeout(() => {
				if (ref.current) {
					ref.current.style.transform = "";
				}
			}, 100);

			setInputValue("");
		}
	}

	return (
		<Command.Dialog
			open={open}
			onClick={() => {
				setOpen(false);
			}}
			onOpenChange={setOpen}
			label="Global Command Menu"
			className="fixed inset-0 dark:bg-black/90 bg-black/50 z-[99999]"
		>
			<div
				className="cynergy  overflow-hidden w-full max-w-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto px-3"
				onClick={(e) => e.stopPropagation()}
			>
				<Command
					className="bg-[var(--background)] "
					ref={ref}
					onKeyDown={(e: React.KeyboardEvent) => {
						if (e.key === "Enter") {
							bounce();
						}
						if (e.key === "Escape") {
							setOpen(false);
						}

						if (isHome || inputValue.length) {
							return;
						}

						if (e.key === "Backspace") {
							e.preventDefault();
							popPage();
							bounce();
						}
					}}
				>
					<div className="flex justify-between items-center">
						<div>
							{pages.map((p) => (
								<div key={p} cmdk-cynergy-badge="">
									{p}
								</div>
							))}
						</div>
						<div>
							<Button
								variant={"ghost"}
								onClick={() => {
									if (isHome || inputValue.length) {
										return;
									} else {
										popPage();
									}
								}}
								disabled={isHome || inputValue.length < 0}
								className={`${
									isHome || inputValue.length > 0
										? "cursor-not-allowed opacity-50"
										: ""
								}`}
							>
								<ArrowLeft size={16} className="mr-2" /> Back
							</Button>
						</div>
					</div>
					<Command.Input
						autoFocus
						placeholder="What are you looking for?"
						onValueChange={(value) => {
							setInputValue(value);
						}}
						className="rounded"
					/>
					<Command.List>
						<Command.Empty>No results found.</Command.Empty>
						{activePage === "home" && (
							<Home
								searchProjects={() => setPages([...pages, "projects"])}
								searchTeams={() => setPages([...pages, "teams"])}
								searchTasks={() => setPages([...pages, "tasks"])}
								searchDocuments={() => setPages([...pages, "documents"])}
								searchHelp={() => setPages([...pages, "help"])}
							/>
						)}
						{activePage === "projects" && <Projects />}
						{activePage === "teams" && <Teams />}
						{activePage === "tasks" && <Tasks />}
						{activePage === "documents" && <Documents />}
						{activePage === "help" && <Help />}
					</Command.List>
				</Command>
			</div>
		</Command.Dialog>
	);
};

// Home page shows all search categories: Projects, Teams, Tasks, Documents, and Helpfunction
export function Home({
	searchProjects,
	searchTeams,
	searchTasks,
	searchDocuments,
	searchHelp,
}: {
	searchProjects: () => void;
	searchTeams: () => void;
	searchTasks: () => void;
	searchDocuments: () => void;
	searchHelp: () => void;
}) {
	return (
		<>
			<Command.Group heading="Projects">
				<Item shortcut="P R" onSelect={() => searchProjects()}>
					<ProjectsIcon />
					Search Projects...
				</Item>
				<Item shortcut="N P">
					<PlusIcon />
					Create New Project...
				</Item>
			</Command.Group>

			<Command.Group heading="Teams">
				<Item shortcut="T E" onSelect={() => searchTeams()}>
					<TeamsIcon />
					Search Teams...
				</Item>
				<Item shortcut="N T">
					<PlusIcon />
					Create New Team...
				</Item>
			</Command.Group>

			<Command.Group heading="Tasks">
				<Item shortcut="S T" onSelect={() => searchTasks()}>
					<RiTaskFill />
					Search Tasks...
				</Item>
			</Command.Group>

			<Command.Group heading="Documents">
				<Item shortcut="S D" onSelect={() => searchDocuments()}>
					<HiDocument />
					Search Documents...
				</Item>
			</Command.Group>

			<Command.Group heading="Help">
				<Item shortcut="S H" onSelect={() => searchHelp()}>
					<DocsIcon />
					Search Docs...
				</Item>
				<Item shortcut="⇧ F">
					<FeedbackIcon />
					Send Feedback...
				</Item>
				<Item shortcut="C S">
					<ContactIcon />
					Contact Support
				</Item>
			</Command.Group>
		</>
	);
}

function Projects() {
	return (
		<>
			<Item>Project 1</Item>
			<Item>Project 2</Item>
			<Item>Project 3</Item>
			<Item>Project 4</Item>
			<Item>Project 5</Item>
		</>
	);
}

function Teams() {
	return (
		<>
			<Item>Team 1</Item>
			<Item>Team 2</Item>
			<Item>Team 3</Item>
			<Item>Team 4</Item>
		</>
	);
}

function Tasks() {
	return (
		<>
			<Item>Task 1</Item>
			<Item>Task 2</Item>
			<Item>Task 3</Item>
			<Item>Task 4</Item>
		</>
	);
}

function Documents() {
	return (
		<>
			<Item>Document 1</Item>
			<Item>Document 2</Item>
			<Item>Document 3</Item>
			<Item>Document 4</Item>
		</>
	);
}

function Help() {
	return (
		<>
			<Item>How to Create a Project</Item>
			<Item>How to Join a Team</Item>
			<Item>Contact Support</Item>
		</>
	);
}

function Item({
	children,
	shortcut,
	onSelect = () => {},
}: {
	children: React.ReactNode;
	shortcut?: string;
	onSelect?: (value: string) => void;
}) {
	return (
		<Command.Item onSelect={onSelect}>
			{children}
			{shortcut && (
				<div cmdk-cynergy-shortcuts="">
					{shortcut.split(" ").map((key) => {
						return <kbd key={key}>{key}</kbd>;
					})}
				</div>
			)}
		</Command.Item>
	);
}
