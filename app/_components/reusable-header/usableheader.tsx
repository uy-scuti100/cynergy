import { cn } from "@/lib/util/utils";

interface HeadingProps {
	title: string;
	description?: string;
	className?: string;
}
export default function UsableHeading({
	title,
	description,
	className,
}: HeadingProps) {
	return (
		<div className="flex flex-col gap-1">
			<h2
				className={cn(
					className,
					"text-[1.5rem] md:text-3xl font-semibold pb-2"
				)}
			>
				{title}
			</h2>
			<p className="text-xs sm:text-sm text-muted-foreground max-w-[250px] md:w-full">
				{description}
			</p>
		</div>
	);
}
