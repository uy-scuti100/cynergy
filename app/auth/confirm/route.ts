// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import { createServerClient } from "@supabase/ssr";

// export async function GET(request: Request) {
// 	const { searchParams, origin } = new URL(request.url);
// 	const code = searchParams.get("code");
// 	// if "next" is in param, use it as the redirect URL
// 	const next = searchParams.get("next") ?? "/store";

// 	if (code) {
// 		const cookieStore = cookies();
// 		const supabase = createServerClient(
// 			process.env.NEXT_PUBLIC_SUPABASE_URL!,
// 			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
// 			{
// 				cookies: {
// 					get(name) {
// 						return cookieStore.get(name)?.value;
// 					},
// 					set(name, value, options) {
// 						cookieStore.set({ name, value, ...options });
// 					},
// 					remove(name, options) {
// 						cookieStore.delete({ name, ...options });
// 					},
// 				},
// 			}
// 		);
// 		const { error } = await supabase.auth.exchangeCodeForSession(code);
// 		console.log("Error", error);
// 		if (!error) {
// 			return NextResponse.redirect(`${origin}${next}`);
// 		}
// 	}

// 	// return the user to an error page with instructions
// 	return NextResponse.redirect(`${origin}/auth/auth-code-error`);
// }

import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const token_hash = searchParams.get("token_hash");
	const type = searchParams.get("type") as EmailOtpType | null;
	const next = searchParams.get("next") ?? "/";

	if (token_hash && type) {
		const supabase = createClient();

		const { error } = await supabase.auth.verifyOtp({
			type,
			token_hash,
		});
		if (!error) {
			// redirect user to specified redirect URL or root of app
			redirect(next);
		}
	}

	// redirect the user to an error page with some instructions
	redirect("/error");
}
