// import {
// 	Accordion,
// 	AccordionContent,
// 	AccordionItem,
// 	AccordionTrigger,
// } from "@/components/ui/accordion";
// import { SiTarget } from "react-icons/si";
// import Link from "next/link";
// import { AiFillProduct } from "react-icons/ai";
// import { ImUsers } from "react-icons/im";

// export default function ReusableAccordion({
// 	projects,
// 	tag,
// }: {
// 	projects: any[];
// 	tag: string;
// }) {
// 	return (
// 		<Accordion type="multiple" className="border-0">
// 			<AccordionItem value="item-1">
// 				<AccordionTrigger className="hover:no-underline border-0 capitalize">
// 					{tag}
// 				</AccordionTrigger>
// 				<AccordionContent>
// 					<AccordionItem value="my-item-1">
// 						<AccordionTrigger className="hover:no-underline font-medium text-[var(--light-foreground)] pl-1">
// 							{tag === "team" ? "Owned Teams" : "Personal"}
// 						</AccordionTrigger>
// 						<AccordionContent>
// 							<div className="flex flex-col gap-1 pl-1.5">
// 								{personalProjects && personalProjects.length > 0 ? (
// 									personalProjects.map((project) => (
// 										<Link
// 											href={"/"}
// 											key={project.id}
// 											className="py-1 flex items-center gap-2"
// 										>
// 											{tag === "tasks" ? (
// 												<SiTarget className="h-4 w-4 opacity-50" />
// 											) : tag === "projects" ? (
// 												<AiFillProduct className="h-4 w-4 opacity-50" />
// 											) : (
// 												<ImUsers className="h-4 w-4 opacity-50" />
// 											)}

// 											<p>{project.name}</p>
// 										</Link>
// 									))
// 								) : (
// 									<div> Nothing found</div>
// 								)}
// 							</div>
// 						</AccordionContent>
// 					</AccordionItem>
// 					<AccordionItem value="my-item-2">
// 						<AccordionTrigger className="hover:no-underline text-[var(--light-foreground)] pl-1 font-medium">
// 							{tag === "team" ? "Member Teams" : "By Invitation"}
// 						</AccordionTrigger>

// 						<AccordionContent>
// 							<div className="flex flex-col gap-1 pl-1.5">
// 								{invitedProjects && invitedProjects.length > 0 ? (
// 									invitedProjects.map((project) => (
// 										<Link
// 											href={"/"}
// 											key={project.id}
// 											className="py-1 flex items-center gap-2"
// 										>
// 											{tag === "tasks" ? (
// 												<SiTarget className="h-4 w-4 opacity-50" />
// 											) : tag === "projects" ? (
// 												<AiFillProduct className="h-4 w-4 opacity-50" />
// 											) : (
// 												<ImUsers className="h-4 w-4 opacity-50" />
// 											)}

// 											<p>{project.name}</p>
// 										</Link>
// 									))
// 								) : (
// 									<div> Nothing found</div>
// 								)}
// 							</div>
// 						</AccordionContent>
// 					</AccordionItem>
// 				</AccordionContent>
// 			</AccordionItem>
// 		</Accordion>
// 	);
// }

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { SiTarget } from "react-icons/si";
import Link from "next/link";
import { AiFillProduct } from "react-icons/ai";
import { ImUsers } from "react-icons/im";

export default function ReusableAccordion({
	projects,
	tag,
}: {
	projects: { ownedTeams: any[]; memberTeams: any[] };
	tag: string;
}) {
	// Destructure ownedTeams and memberTeams from projects prop
	const { ownedTeams, memberTeams } = projects;

	return (
		<Accordion type="multiple" className="border-0">
			<AccordionItem value="item-1">
				<AccordionTrigger className="hover:no-underline border-0 capitalize">
					{tag}
				</AccordionTrigger>
				<AccordionContent>
					{/* Owned Teams */}
					<AccordionItem value="my-item-1">
						<AccordionTrigger className="hover:no-underline font-medium text-[var(--light-foreground)] pl-1">
							{tag === "team" ? "Owned Teams" : "Personal"}
						</AccordionTrigger>
						<AccordionContent>
							<div className="flex flex-col gap-1 pl-1.5">
								{ownedTeams && ownedTeams.length > 0 ? (
									ownedTeams.map((team) => (
										<Link
											href={`/workspace/teams/${team.id}`}
											key={team.id}
											className="py-1 flex items-center gap-2"
										>
											<ImUsers className="h-4 w-4 opacity-50" />
											<p className="first-letter:uppercase">{team.name}</p>
										</Link>
									))
								) : (
									<div>Nothing found</div>
								)}
							</div>
						</AccordionContent>
					</AccordionItem>
					{/* Member Teams */}
					<AccordionItem value="my-item-2">
						<AccordionTrigger className="hover:no-underline text-[var(--light-foreground)] pl-1 font-medium">
							{tag === "team" ? "Member Teams" : "By Invitation"}
						</AccordionTrigger>

						<AccordionContent>
							<div className="flex flex-col gap-1 pl-1.5">
								{memberTeams && memberTeams.length > 0 ? (
									memberTeams.map((team) => (
										<Link
											href={`/workspaces/teams/${team.id}`}
											key={team.id}
											className="py-1 flex items-center gap-2"
										>
											<ImUsers className="h-4 w-4 opacity-50" />
											<p>{team.name}</p>
										</Link>
									))
								) : (
									<div>Nothing found</div>
								)}
							</div>
						</AccordionContent>
					</AccordionItem>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
