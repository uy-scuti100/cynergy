import ReactDOM from "react-dom";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { createTeam } from "@/actions/index";
import { ITeam } from "@/lib/types/types";

type Props = {
	isOpen: boolean;
	onClose: Dispatch<SetStateAction<boolean>>;
	type: "project" | "team" | "task";
	userId: string;
};

export default function ReusableModal({
	isOpen,
	onClose,
	type,
	userId,
}: Props) {
	if (!isOpen) return null;

	const modalRef = useRef<HTMLDivElement | null>(null);

	const handleClickOutside = (event: { target: any }) => {
		if (modalRef.current && !modalRef.current.contains(event.target)) {
			onClose(false);
		}
	};

	useEffect(() => {
		// Add event listener for clicks
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Clean up the event listener on component unmount
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return ReactDOM.createPortal(
		<div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto dark:bg-black/90 bg-black/50 p-4">
			<div
				ref={modalRef}
				className="w-full max-w-xl rounded-lg bg-[var(--background)] p-4 shadow-lg "
			>
				{type === "project" ? (
					<div>project</div>
				) : type === "team" ? (
					<TeamForm userId={userId} onClose={() => onClose(false)} />
				) : type === "task" ? (
					// <ReusableHeaderComponent name={name || ""} />
					<div>task</div>
				) : null}
			</div>
		</div>,
		document.body
	);
}

interface TeamFormProps {
	userId: string;
	onClose: () => void; // Function to close the modal
}

const formSchema = z.object({
	name: z.string().min(1, "Team name is required"),
	description: z.string().optional(),
});

const TeamForm = ({ userId, onClose }: TeamFormProps) => {
	const queryClient = useQueryClient();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	const mutation = useMutation({
		mutationFn: ({
			name,
			description,
		}: {
			name: string;
			description: string;
		}) => createTeam(name, description, userId),
		onMutate: async (newTeam) => {
			await queryClient.cancelQueries({ queryKey: ["teams"] });
			const previousTeams = queryClient.getQueryData(["teams"]);

			queryClient.setQueryData(["teams"], (old: ITeam[]) => [
				...(old || []),
				{ id: "temp-id", ...newTeam }, // Optimistically add new team
			]);

			return { previousTeams };
		},
		onError: (err, newTeam, context) => {
			queryClient.setQueryData(["teams"], context?.previousTeams);
			toast.error("Error creating team", {
				description: "There was an issue creating the team.",
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["teams"] });
			toast.success("Team created successfully!", {
				description: "Your team has been successfully created.",
			});
			onClose(); // Close the modal
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		mutation.mutate({
			name: values.name,
			description: values.description || "",
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 relative py-8"
			>
				<button onClick={onClose} className="absolute top-2 right-2">
					<X />
				</button>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Team Name</FormLabel>
							<FormControl>
								<Input
									disabled={mutation.isPending}
									placeholder="Your team name"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input
									disabled={mutation.isPending}
									placeholder="Your description goes here..."
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex w-full justify-end gap-2">
					<Button
						variant={"outline"}
						disabled={mutation.isPending}
						className={mutation.isPending ? "cursor-not-allowed" : ""}
						type="button"
						onClick={onClose}
					>
						Cancel
					</Button>
					<Button
						disabled={mutation.isPending}
						className={mutation.isPending ? "cursor-not-allowed" : ""}
						type="submit"
					>
						create team
					</Button>
				</div>
			</form>
		</Form>
	);
};
