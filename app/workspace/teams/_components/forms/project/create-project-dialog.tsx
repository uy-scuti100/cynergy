"use client";

import ReusableModal from "@/app/_components/modal/modal";
import { IUser } from "@/lib/types/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateProjectForm from "./create-project-form";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

interface CreateProjectModalProps {
	user: IUser;
	teamId: string;
	message?: string;
}
export default function ProjectDialog({
	teamId,
	user,
	message,
}: CreateProjectModalProps) {
	const [open, setOpen] = useState(false);
	const userId = user.id;

	return (
		<div>
			<Button
				className="py-2 rounded-2xl px-4 flex items-center gap-1"
				onClick={() => setOpen(true)}
			>
				<Plus className="sm:mr-2 h-4 w-4" />
				<span>{message}</span>
			</Button>
			<ReusableModal
				handleClickOut={false}
				children={
					<CreateProjectForm
						userId={userId}
						onClose={() => setOpen(false)}
						teamId={teamId}
					/>
				}
				isOpen={open}
				onClose={setOpen}
			/>
		</div>
	);
}
