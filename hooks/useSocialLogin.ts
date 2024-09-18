"use client";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { Provider } from "@supabase/supabase-js";
import { toast } from "sonner";

const redirect = (path: string) => {
	window.location.href = path;
};

export const handleSocialLogin = async (provider: Provider) => {
	const supabase = createSupabaseBrowser();
	try {
		await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${window.location.origin}/auth/callback?next=/workspace`,
			},
		});
	} catch (error) {
		console.error("Social login error:", error);
	}
};

// toast.success("Logged in successfully", {
//     description: "You have been logged in successfully.",
// });
