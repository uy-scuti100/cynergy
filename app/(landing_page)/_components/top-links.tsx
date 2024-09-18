"use client";

import { Button } from "@/components/ui/button";

import { useSignOut } from "@/hooks/useSignOut";
import { createSupabaseBrowser } from "@/lib/supabase/client";

import { useEffect, useState } from "react";

export default function TopLinks() {
	const signOut = useSignOut();
	const [user, setUser] = useState("");
	const supabase = createSupabaseBrowser();

	useEffect(() => {
		const fetchUser = async () => {
			const { data: currentUser, error } = await supabase.auth.getUser();
			if (error || !currentUser?.user?.id) {
				console.error("Authentication error or no user found:", error);
				return;
			}

			setUser(currentUser.user.id);
		};
		fetchUser();
	}, [user]);

	return (
		<div className="mt-3">
			<div className="flex gap-5 items-center justify-center overflow-x-scroll scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-transparent pb-3">
				{/* "flex gap-5 items-center overflow-x-scroll scrollbar-thin ]scrollbar-track-gray-300 pb-3" */}
				{/* {topLinks.map((link) => (
					<Link href={link.link} key={link.link}>
						<LinkPill link={link.label} />
					</Link>
				))} */}
			</div>
			{user && (
				<Button variant={"destructive"} onClick={signOut}>
					Logout
				</Button>
			)}
		</div>
	);
}
// const topLinks = [
// 	{
// 		label: "Newsletter",
// 		link: "/newsletter",
// 	},
// 	{
// 		label: "Stories",
// 		link: "/stories",
// 	},
// 	{
// 		label: "Discussions",
// 		link: "/discussions",
// 	},
// 	{
// 		label: "Events",
// 		link: "/events",
// 	},
// 	{
// 		label: "Topics",
// 		link: "/topics",
// 	},
// 	{
// 		label: "Categories",
// 		link: "/categories",
// 	},
// ];

// const LinkPill = ({ link }: { link: string }) => {
// 	return (
// 		<Button className="hover:scale-105 duration-300 transition-transform">
// 			{link}
// 		</Button>
// 	);
// };
