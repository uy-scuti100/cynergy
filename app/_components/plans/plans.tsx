import { Button } from "@/components/ui/button";

export const Plan = () => {
	return (
		<div className="flex sticky top-[calc(100vh_-_68px)] flex-col h-12 border-t px-2 justify-end text-xs">
			<div className="flex items-center justify-between">
				<div>
					<p className="font-bold">Enterprise</p>
					<p className="text-stone-500">Pay as you go</p>
				</div>

				<Button>Support</Button>
			</div>
		</div>
	);
};
