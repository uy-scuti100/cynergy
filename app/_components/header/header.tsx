"use client";
import { Menu, Search } from "lucide-react";
import { FaBell } from "react-icons/fa6";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import MobileNavigation from "../mobile-nav/mobile-nav";
import { CommandMenu } from "../command-menu/command_opener";
import { AiFillMacCommand } from "react-icons/ai";

interface HeaderProps {
	id: string | null;
	email: string | null;
	name: string | null;
	profile_picture: string | null;
}

export default function Header({
	id,
	name,
	email,
	profile_picture,
}: HeaderProps) {
	const [openNav, setOpenNav] = useState(false);
	const [open, setOpen] = useState(false);
	const navRef = useRef<HTMLDivElement | null>(null);

	const handleClickOutside = (event: { target: EventTarget | null }): void => {
		if (navRef.current && !navRef.current.contains(event.target as Node)) {
			setOpenNav(false);
		}
	};
	useEffect(() => {
		const updateBodyOverflow = () => {
			if (openNav) {
				document.body.style.overflow = "hidden";
			} else {
				document.body.style.overflow = "auto";
			}
		};
		updateBodyOverflow();
	}, [openNav]);

	useEffect(() => {
		// Add event listener for clicks
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Clean up the event listener on component unmount
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	function toggleNav() {
		setOpenNav((prev) => !prev);
	}

	return (
		<>
			{" "}
			<header className="sticky w-full top-0 z-30 flex items-center gap-4 py-3 border-b bg-[var(--background)] sm:h-auto backdrop-blur3xl px-4 ">
				<button className="md:hidden" onClick={toggleNav}>
					<Menu className="w-6 h-6" />
					<span className="sr-only">Toggle Menu</span>
				</button>

				<div className="relative flex-1 ml-auto md:grow-0 rounded border">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground " />
					<Input
						readOnly
						onFocus={(e) => {
							e.target.blur(), setOpen(true);
						}}
						type="search"
						placeholder="Search..."
						className="bg-none focus:outline-none outline-none focus:ring-0 border-none shadow-none ring-0 focus:ring-offset-0 focus-visible:ring-0 placeholder:font-regular placeholder:text-sm placeholder:font-medium rounded-none md:w-[250px] lg:w-[336px] pl-8 "
					/>
					<div className="flex items-center absolute -right-2 top-1/2 -translate-x-1/2 -translate-y-1/2">
						<AiFillMacCommand /> <span className="ml-1">K</span>
					</div>
				</div>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button className="overflow-hidden rounded-full">
							<FaBell className="h-6 w-6" />
							{/* <TfiBell className="h-6 w-6" /> */}
						</button>
					</DropdownMenuTrigger>
				</DropdownMenu>

				{/* <ModeToggle /> */}
				{/* User Profile */}

				{id && name && email && profile_picture && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className="overflow-hidden rounded-full">
								<Avatar className="border-2 border-blue-400">
									<AvatarImage src={profile_picture} alt={name} />
									<AvatarFallback>
										{email.substring(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>
								<Link href={`/profile`}>My Account</Link>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem></DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}

				{/* mobile nav */}
				<MobileNavigation
					openNav={openNav}
					toggleNav={toggleNav}
					setOpenNav={setOpenNav}
					navRef={navRef}
					open={open}
					id={id}
					setOpen={setOpen}
				/>
			</header>
			<CommandMenu open={open} setOpen={setOpen} />
		</>
	);
}

// className="bg-none focus:outline-none outline-none focus:ring-0 shadow-none ring-0 focus:ring-offset-0 focus-visible:ring-0 placeholder:font- placeholder:text-sm placeholder:font-regular md:w-[150px] lg:w-[336px] disable rounded-none"
