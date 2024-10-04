import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { X } from "lucide-react";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useCreateTeamMutation } from "@/lib/mutations/teams/useCreateTeamMutation";
import { Input } from "@/components/ui/input";

interface TeamFormProps {
	userId: string;
	onClose: () => void;
}

const formSchema = z.object({
	name: z.string().min(1, "Team name is required"),
	description: z.string().optional(),
});

export default function CreateTeamForm({ userId, onClose }: TeamFormProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	const mutation = useCreateTeamMutation(userId, onClose);
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
}
