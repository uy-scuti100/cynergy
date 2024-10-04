"use client";
import { Button } from "@/components/ui/button";
import ReusableModal from "@/app/_components/modal/modal";
import { Plus } from "lucide-react";
import { useState } from "react";
import { IUser } from "@/lib/types/types";
import CreateTeamForm from "./create-team-form";

interface CreateTeamModalProps {
	user: IUser;
	message?: string;
}
export default function TeamDialog({ user, message }: CreateTeamModalProps) {
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
				children={
					<CreateTeamForm userId={userId} onClose={() => setOpen(false)} />
				}
				isOpen={open}
				onClose={setOpen}
			/>
		</div>
	);
}
