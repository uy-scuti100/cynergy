import { Database } from "@/suapabase.types";
import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowser() {
	return createBrowserClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);
}
