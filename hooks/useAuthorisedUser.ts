"use client";
import { client } from "@/lib/types/prisma";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function useUser() {
	const supabase = createSupabaseBrowser();

	return useQuery({
		queryKey: ["authenticatedUser"],
		queryFn: async () => {
			const { data: currentUser, error } = await supabase.auth.getUser();

			if (error || !currentUser?.user?.id) {
				console.error("Authentication error or no user found:", error);
				return null;
			}
			const id = currentUser.user.id;

			const user = await client.users.findFirst({
				where: {
					id,
				},
			});

			return user;
		},
		enabled: !!supabase.auth.getUser(),
	});
}
