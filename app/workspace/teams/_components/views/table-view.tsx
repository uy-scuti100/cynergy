// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { MoreHorizontal } from "lucide-react";
// import Link from "next/link";
// import { ColumnDef } from "@tanstack/react-table";
// import { ITeam } from "@/lib/types/types";
// import { DataTable } from "@/components/ui/data-table";
// import { Separator } from "@/components/ui/separator";
// import { IoEye } from "react-icons/io5";
// import { FaEdit } from "react-icons/fa";
// import { FaTrash } from "react-icons/fa";
// import ReusableModal from "@/app/_components/modal/modal";
// import EditTeamForm from "../forms/edit-team-modal";
// import { useState } from "react";

// interface BoardViewProps {
// 	teams: any[];
// 	isError: boolean;
// 	isLoading: boolean;
// }
// export default function TableView({
// 	teams,
// 	isError,
// 	isLoading,
// }: BoardViewProps) {
// 	const [open, setOpen] = useState(false);
// 	return (
// 		<>
// 			<DataTable
// 				columns={columns}
// 				data={
// 					teams?.map((team) => ({
// 						...team,
// 						createdAt: new Date(team.created_at).toLocaleDateString(),
// 					})) || []
// 				}
// 				searchKey="name"
// 			/>
// 			<ReusableModal
// 				children={<EditTeamForm onClose={() => setOpen(false)} />}
// 				isOpen={open}
// 				onClose={setOpen}
// 			/>
// 		</>
// 	);
// }
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { IoEye } from "react-icons/io5";
import { FaEdit, FaTrash } from "react-icons/fa";
import ReusableModal from "@/app/_components/modal/modal";
import EditTeamForm from "../forms/team/edit-team-form"; // Adjust path if needed
import { useState } from "react";
import { ITeam } from "@/lib/types/types";
import { DataTable } from "@/components/ui/data-table";
import DeleteTeamDialog from "../forms/team/delete-team-form";

interface BoardViewProps {
	teams: any[]; // Ensure you're using the correct type for teams
}

export default function TableView({ teams }: BoardViewProps) {
	const [openEdit, setOpenEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [selectedEditTeam, setSelectedEditTeam] = useState<ITeam | null>(null); // State for selected team
	const [selectedDeleteTeam, setSelectedDeleteTeam] = useState<ITeam | null>(
		null
	); // State for selected team

	const handleEditClick = (team: ITeam) => {
		setSelectedEditTeam(team);
		setOpenEdit(true);
	};
	const handleDeleteClick = (team: ITeam) => {
		setSelectedDeleteTeam(team);
		setOpenDelete(true);
	};

	const columns: ColumnDef<ITeam>[] = [
		{
			accessorKey: "name",
			header: "Name",
		},
		{
			accessorKey: "createdAt",
			header: "Created At",
		},
		{
			accessorKey: "actions",
			header: "Actions",
			cell: ({ row }) => {
				const team = row.original;
				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>
								<IoEye className="mr-2 h-4 w-4" />
								View Details
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleEditClick(team)}>
								<FaEdit className="mr-2 h-4 w-4" />
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleDeleteClick(team)}>
								<FaTrash className="mr-2 h-4 w-4" />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];

	return (
		<>
			<DataTable
				columns={columns}
				data={
					teams?.map((team) => ({
						...team,
						createdAt: new Date(team.created_at).toLocaleDateString(),
					})) || []
				}
				searchKey="name"
			/>

			{/* Modal for Editing Team */}
			{selectedEditTeam && (
				<ReusableModal isOpen={openEdit} onClose={setOpenEdit}>
					<EditTeamForm
						teamId={selectedEditTeam.id} // Pass selected team ID
						name={selectedEditTeam.name} // Pass selected team name
						description={selectedEditTeam.description || ""} // Pass selected team description
						onClose={() => setOpenEdit(false)} // Close modal after editing
					/>
				</ReusableModal>
			)}

			{selectedDeleteTeam && (
				<ReusableModal isOpen={openDelete} onClose={setOpenDelete}>
					<DeleteTeamDialog
						teamId={selectedDeleteTeam.id}
						teamName={selectedDeleteTeam.name}
						onClose={() => setOpenDelete(false)}
					/>
				</ReusableModal>
			)}
		</>
	);
}
