"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, X } from "lucide-react";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/util/utils";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useCreateProjectMutation } from "@/lib/mutations/projects/useCreateprojectMutation";
import { useState } from "react";
import { format } from "date-fns";

interface ProjectFormProps {
	userId: string;
	teamId: string;
	onClose: () => void;
}

const formSchema = z.object({
	name: z.string().min(1, "Project name is required"),
	description: z.string().optional(),
	end_date: z.date().optional(), // Change to Date
	start_date: z.date().optional(), // Change to Date
});

export default function CreateProjectForm({
	userId,
	teamId,
	onClose,
}: ProjectFormProps) {
	const [startDate, setStartDate] = useState<Date | undefined>();
	const [endDate, setEndDate] = useState<Date | undefined>();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
			end_date: undefined,
			start_date: undefined,
		},
	});

	const mutation = useCreateProjectMutation(userId, onClose);

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		mutation.mutate({
			name: values.name,
			description: values.description || "",
			end_date: endDate ? endDate.toISOString() : undefined, // Convert to ISO string for backend
			start_date: startDate ? startDate.toISOString() : undefined, // Convert to ISO string for backend
			team_id: teamId,
			owner_id: userId,
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
							<FormLabel>Project Name</FormLabel>
							<FormControl>
								<Input placeholder="Your project name" {...field} />
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
								<Input placeholder="Your description goes here..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid grid-cols-2 w-full gap-2">
					<FormField
						control={form.control}
						name="start_date"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Start Date</FormLabel>
								<FormControl>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant={"outline"}
												className={cn(
													"w-full justify-start text-left font-normal",
													!startDate && "text-muted-foreground"
												)}
											>
												<CalendarIcon className="mr-2 h-4 w-4" />
												{startDate ? (
													format(startDate, "PPP")
												) : (
													<span>Pick a date</span>
												)}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0">
											<Calendar
												mode="single"
												selected={startDate}
												onSelect={setStartDate} // setStartDate is now compatible with the Date type
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="end_date"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>End Date</FormLabel>
								<FormControl>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant={"outline"}
												className={cn(
													"w-full justify-start text-left font-normal",
													!endDate && "text-muted-foreground"
												)}
											>
												<CalendarIcon className="mr-2 h-4 w-4" />
												{endDate ? (
													format(endDate, "PPP")
												) : (
													<span>Pick a date</span>
												)}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0">
											<Calendar
												mode="single"
												selected={endDate}
												onSelect={setEndDate} // setEndDate is now compatible with the Date type
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex w-full justify-end gap-2">
					<Button
						variant="outline"
						disabled={mutation.isPending}
						onClick={onClose}
					>
						Cancel
					</Button>
					<Button disabled={mutation.isPending} type="submit">
						Create Project
					</Button>
				</div>
			</form>
		</Form>
	);
}

{
	/* <DateRangePicker
									onUpdate={(values) => console.log(values)}
									initialDateFrom="2023-01-01"
									initialDateTo="2023-12-31"
									align="end"
									locale="en-US"
									showCompare={false}
								/> */
}
{
	/* <DateRangePicker
									onUpdate={(values) => console.log(values)}
									initialDateFrom="2023-01-01"
									initialDateTo="2023-12-31"
									align="end"
									locale="en-US"
									showCompare={false}
								/> */
}
