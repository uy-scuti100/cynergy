"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch } from "react";

export const SidebarLink = ({
	icon: Icon,
	label,
	href,
	setOpenNav,
}: {
	icon: React.ElementType;
	label: string;
	href: string;
	setOpenNav: Dispatch<React.SetStateAction<boolean>>;
}) => {
	const pathname = usePathname();
	return (
		<Link
			onClick={() => setOpenNav(false)}
			href={href}
			className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
				pathname === href ? "bg-accent text-accent-foreground" : ""
			}`}
		>
			<Icon className="h-5 w-5" />
			<span>{label}</span>
		</Link>
	);
};
