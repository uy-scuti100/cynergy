import { Command, Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export default function TopSearch() {
	return (
		<div>
			<div className="sticky top-[70px] w-full flex items-center gap-2 border rounded-lg px-3">
				<Search size={16} />
				<Input
					type="text"
					placeholder="Browse products or news"
					className="bg-none focus:outline-none outline-none focus:ring-0 border-none rounded-none shadow-none ring-0 focus:ring-offset-0 focus-visible:ring-0 placeholder:font-medium"
				/>
				<div className="flex items-center">
					<Command size={16} />
					<span className="text-sm">K</span>
				</div>
			</div>
		</div>
	);
}
