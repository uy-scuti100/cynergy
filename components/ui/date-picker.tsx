// "use client";

// import * as React from "react";
// import { addDays, format } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";
// import { DateRange } from "react-day-picker";

// import { cn } from "@/lib/util/utils";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
// 	Popover,
// 	PopoverContent,
// 	PopoverTrigger,
// } from "@/components/ui/popover";

// export function DatePickerWithRange({
// 	className,
// }: React.HTMLAttributes<HTMLDivElement>) {
// 	const [date, setDate] = React.useState<DateRange | undefined>({
// 		from: new Date(2022, 0, 20),
// 		to: addDays(new Date(2022, 0, 20), 20),
// 	});

// 	return (
// 		<div className={cn("grid gap-2", className)}>
// 			<Popover>
// 				<PopoverTrigger asChild>
// 					<Button
// 						id="date"
// 						variant={"outline"}
// 						className={cn(
// 							"w-[300px] justify-start text-left font-normal",
// 							!date && "text-muted-foreground"
// 						)}
// 					>
// 						<CalendarIcon className="mr-2 h-4 w-4" />
// 						{date?.from ? (
// 							date.to ? (
// 								<>
// 									{format(date.from, "LLL dd, y")} -{" "}
// 									{format(date.to, "LLL dd, y")}
// 								</>
// 							) : (
// 								format(date.from, "LLL dd, y")
// 							)
// 						) : (
// 							<span>Pick a date</span>
// 						)}
// 					</Button>
// 				</PopoverTrigger>
// 				<PopoverContent className="w-auto p-0" align="start">
// 					<Calendar
// 						initialFocus
// 						mode="range"
// 						defaultMonth={date?.from}
// 						selected={date}
// 						onSelect={setDate}
// 						numberOfMonths={2}
// 					/>
// 				</PopoverContent>
// 			</Popover>
// 		</div>
// 	);
// }

// "use client";

// import * as React from "react";
// import { addDays, format } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";
// import { DateRange } from "react-day-picker";

// import { cn } from "@/lib/util/utils";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
// 	Popover,
// 	PopoverContent,
// 	PopoverTrigger,
// } from "@/components/ui/popover";

// interface DatePickerWithRangeProps {
// 	selected: DateRange | undefined;
// 	onSelect: (date: DateRange | undefined) => void;
// 	className?: string;
// }

// export function DatePickerWithRange({
// 	selected,
// 	onSelect,
// 	className,
// }: DatePickerWithRangeProps) {
// 	return (
// 		<div className={cn("grid gap-2", className)}>
// 			<Popover>
// 				<PopoverTrigger asChild>
// 					<Button
// 						id="date"
// 						variant={"outline"}
// 						className={cn(
// 							"w-[300px] justify-start text-left font-normal",
// 							!selected && "text-muted-foreground"
// 						)}
// 					>
// 						<CalendarIcon className="mr-2 h-4 w-4" />
// 						{selected?.from ? (
// 							selected.to ? (
// 								<>
// 									{format(selected.from, "LLL dd, y")} -{" "}
// 									{format(selected.to, "LLL dd, y")}
// 								</>
// 							) : (
// 								format(selected.from, "LLL dd, y")
// 							)
// 						) : (
// 							<span>Pick a date</span>
// 						)}
// 					</Button>
// 				</PopoverTrigger>
// 				<PopoverContent className="w-auto p-0" align="start">
// 					<Calendar
// 						initialFocus
// 						mode="range"
// 						defaultMonth={selected?.from}
// 						selected={selected}
// 						onSelect={onSelect}
// 						numberOfMonths={2}
// 					/>
// 				</PopoverContent>
// 			</Popover>
// 		</div>
// 	);
// }

"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/util/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker() {
	const [date, setDate] = React.useState<Date>();

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-[280px] justify-start text-left font-normal",
						!date && "text-muted-foreground"
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? format(date, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
