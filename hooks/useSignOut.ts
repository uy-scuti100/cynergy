import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { useDispatch } from "react-redux";
import { clearUser } from "@/lib/store/slices/user";

export const useSignOut = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const dispatch = useDispatch();

	const signOut = async () => {
		const supabase = createSupabaseBrowser();
		try {
			await supabase.auth.signOut();

			queryClient.clear();

			dispatch(clearUser());

			router.replace("/");
		} catch (error) {
			console.error("Signout error:", error);
		}
	};

	return signOut;
};
