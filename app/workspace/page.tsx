import { Button } from "@/components/ui/button";

import UsableHeading from "../_components/reusable-header/usableheader";

import { Plus } from "lucide-react";

export default async function page() {
	return (
		<div className="common__styles">
			<div className="flex items-center justify-between">
				<UsableHeading
					title="Project Dashboard"
					description="lets see how this goes"
				/>
				<Button className="rounded-2xl py-6 px-4 flex items-center gap-1">
					<Plus className="sm:mr-2 h-4 w-4" />
					<span> New project</span>
				</Button>
			</div>
		</div>
	);
}
