interface HeadingProps {
	title: string;
	description: string;
}
export default function UsableHeading({ title, description }: HeadingProps) {
	return (
		<div className="flex flex-col gap-1 pb-4">
			<h2 className="text-[1.5rem] md:text-3xl font-semibold tracking-tight font-mont">
				{title}
			</h2>
			<p className=" text-xs sm:text-sm text-muted-foreground font-mont w-[250px]">
				{description}
			</p>
		</div>
	);
}
