import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { BriefcaseBusiness } from "lucide-react";

interface ReusableAccordionProps {
	id: string;
	name: string;
	description: string;
}
export default function ReusableAccordion({
	projects,
	tag,
}: {
	projects: ReusableAccordionProps[];
	tag: string;
}) {
	return (
		<Accordion type="multiple" className="border-0">
			<AccordionItem value="item-1">
				<AccordionTrigger className="hover:no-underline border-0 capitalize">
					{tag}
				</AccordionTrigger>
				<AccordionContent>
					<AccordionItem value="my-item-1">
						<AccordionTrigger className="hover:no-underline font-medium text-[var(--light-foreground)] pl-1">
							Personal
						</AccordionTrigger>
						<AccordionContent>
							<div className="flex flex-col gap-1 pl-1.5">
								{projects && projects.length > 1 ? (
									projects.map((project) => (
										<div
											key={project.id}
											className="py-1 flex items-center gap-2"
										>
											<BriefcaseBusiness className="h-4 w-4 opacity-50" />
											<p>{project.name}</p>
										</div>
									))
								) : (
									<div> Nothing found</div>
								)}
							</div>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="my-item-2">
						<AccordionTrigger className="hover:no-underline text-[var(--light-foreground)] pl-1 font-medium">
							By Invitation
						</AccordionTrigger>
						<AccordionContent>
							<div className="flex flex-col gap-1 pl-1.5">
								{projects && projects.length > 1 ? (
									projects.map((project) => (
										<div
											key={project.id}
											className="py-1 flex items-center gap-2"
										>
											<BriefcaseBusiness className="h-4 w-4 opacity-50" />
											<p>{project.name}</p>
										</div>
									))
								) : (
									<div> Nothing found</div>
								)}
							</div>
						</AccordionContent>
					</AccordionItem>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
