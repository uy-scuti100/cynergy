"use client";

import { linkDetails } from "@/lib/constants/links";

import { useState } from "react";
import { SidebarLink } from "../sidebar-link/sidebar-link";

export default function SideNav({}) {
	const [openNav, setOpenNav] = useState(false);
	return (
		<nav>
			<div className="flex flex-col gap-1">
				{linkDetails.map((link, index) => (
					<SidebarLink
						setOpenNav={setOpenNav}
						key={index}
						icon={link.icon}
						label={link.label}
						href={link.href}
					/>
				))}
			</div>
		</nav>
	);
}

{
	/* <div className="bg-background flex cursor-pointer items-center justify-center h-[60px]">
				<div className="flex items-center justify-center">
					<Logo />
				</div>
				<div className="flex flex-col gap-8 pt-4 h-[calc(100vh-128px)] overflow-y-auto px-2">
					<div className="flex items-center border px-2">
						<Search className="h-5 w-5 text-muted-foreground" />
						<Input
							readOnly
							onFocus={(e) => {
								e.target.blur(), setOpen(true);
							}}
							type="search"
							placeholder="Search..."
							className="bg-none focus:outline-none outline-none focus:ring-0 border-none rounded-none shadow-none ring-0 focus:ring-offset-0 focus-visible:ring-0 placeholder:font- placeholder:text-sm placeholder:font-medium placeholder:text-muted-foreground"
						/>
						<div className="flex items-center">
							<Command size={14} />
							<span className="text-xs">K</span>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						{linkDetails?.map((link, index) => (
							<SidebarLink
								key={index}
								icon={link.icon}
								label={link.label}
								href={link.href}
							/>
						))}
					</div>
				</div>

				<Separator />
			</div>

			<div className="pt-4 h-[calc(100vh-128px)] overflow-y-auto"></div>
			<Plan /> */
}
