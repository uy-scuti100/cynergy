export default function ListViewTeamSkeleton() {
	return (
		<div className="p-4 border rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 animate-pulse">
			<div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
			<div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
			<div className="flex items-end justify-end mt-6 gap-6">
				<div className="flex items-center gap-2">
					<div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
					<div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
				</div>
				<div className="flex items-center gap-2">
					<div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
					<div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
				</div>
			</div>
		</div>
	);
}
