export default function BoardViewTeamSkeleton() {
	return (
		<div className="h-[150px] max-w-[250px] w-full  p-4 rounded-lg shadow relative  hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 animate-pulse">
			<div className="">
				<div className="h-6 bg-gray-200 dark:bg-gray-700  rounded w-3/4"></div>
				<div className="mt-2 h-4 bg-gray-200 dark:bg-gray-700  rounded w-full"></div>
			</div>
			<div className="flex items-center gap-2 absolute bottom-3 left-3">
				<div className="h-5 w-5 bg-gray-200 dark:bg-gray-700  rounded-full"></div>
				<div className="h-4 bg-gray-200 dark:bg-gray-700  rounded w-auto"></div>
			</div>
		</div>
	);
}
