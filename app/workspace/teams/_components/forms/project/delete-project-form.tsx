import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { useDeleteTeamMutation } from "@/lib/mutations/teams/useDeleteTeam";
import { cn } from "@/lib/util/utils";

interface DeleteTeamDialogProps {
	teamId: string;
	teamName: string;
	onClose: () => void;
}

export default function DeleteProjectDialog({
	teamId,
	teamName,
	onClose,
}: DeleteTeamDialogProps) {
	const mutation = useDeleteTeamMutation();
	const handleDelete = async () => {
		try {
			await mutation.mutateAsync(teamId);
			onClose();
		} catch (error) {
			console.log("Failed to delete team:", error);
		}
	};

	return (
		<div>
			<div className="grid w-full max-w-lg gap-4 p-6">
				<div className="flex flex-col space-y-2 text-center sm:text-left">
					<h3 className="text-lg font-semibold">Are you sure?</h3>

					<div className="text-sm">
						This action cannot be undone. This will permanently delete the team{" "}
						<span className="uppercase">{teamName}</span> and remove all
						associated data.
					</div>
				</div>

				<div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
					<Button
						className={cn(
							buttonVariants({ variant: "outline" }),
							"mt-2 sm:mt-0 text-foreground"
						)}
						onClick={onClose}
					>
						Cancel
					</Button>
					<Button onClick={handleDelete}>Delete</Button>
				</div>
			</div>
		</div>
	);
}

// <AlertDialog open={true} onOpenChange={onClose}>
// 	<AlertDialogContent>
// 		<AlertDialogHeader>
// 			<AlertDialogTitle>Are you sure?</AlertDialogTitle>
// 			<AlertDialogDescription>
// 				This action cannot be undone. This will permanently delete the team
// 				"{teamName}" and remove all associated data.
// 			</AlertDialogDescription>
// 		</AlertDialogHeader>
// 		<AlertDialogFooter>
// 			<AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
// 			<AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
// 		</AlertDialogFooter>
// 	</AlertDialogContent>
// </AlertDialog>
