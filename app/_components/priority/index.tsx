import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { fakeProjects } from "@/lib/constants/links";
import {
	BriefcaseBusiness,
	SignalHigh,
	SignalLow,
	SignalMedium,
} from "lucide-react";
export default function PriorityAccordion() {
	return (
		<Accordion type="multiple" className="border-0">
			<AccordionItem value="item-1">
				<AccordionTrigger className="hover:no-underline border-0 capitalize">
					Priority
				</AccordionTrigger>
				<AccordionContent>
					<AccordionItem value="my-item-1">
						<AccordionItem value="my-item-1-1">
							<AccordionTrigger className="hover:no-underline font-medium text-[var(--light-foreground)] pl-1">
								<div className="flex items-end">
									<SignalHigh className="text-[#dc3545]" />
									High
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<div className="flex flex-col gap-1 pl-1.5">
									{fakeProjects && fakeProjects.length > 1 ? (
										fakeProjects.map((project) => (
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
						<AccordionItem value="my-item-1-2">
							<AccordionTrigger className="hover:no-underline font-medium text-[var(--light-foreground)] pl-1">
								<div className="flex items-end">
									<SignalMedium className="text-[#ffc107]" />
									Medium
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<div className="flex flex-col gap-1 pl-1.5">
									{fakeProjects && fakeProjects.length > 1 ? (
										fakeProjects.map((project) => (
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
						<AccordionItem value="my-item-1-3">
							<AccordionTrigger className="hover:no-underline font-medium text-[var(--light-foreground)] pl-1 py-0">
								<div className="flex items-end">
									<SignalLow className="text-[#28a745]" />
									Low
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<div className="flex flex-col gap-1 pl-1.5">
									{fakeProjects && fakeProjects.length > 1 ? (
										fakeProjects.map((project) => (
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
					</AccordionItem>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
