"use client";
import { Button } from "@/components/ui/button";
import ReusableModal from "../../../_components/modal/modal";

import { Plus } from "lucide-react";
import { useState, useTransition } from "react";

import { IUser } from "@/lib/types/types";

export default function CreateTeamModal({ user }: { user: IUser }) {
	const [open, setOpen] = useState(false);
	const userId = user.id;
	return (
		<div>
			<Button
				className="rounded-2xl py-6 px-4 flex items-center gap-1"
				onClick={() => setOpen(true)}
			>
				<Plus className="sm:mr-2 h-4 w-4" />
				<span> New Team</span>
			</Button>
			<ReusableModal
				type="team"
				userId={userId}
				isOpen={open}
				onClose={setOpen}
			/>
		</div>
	);
}
