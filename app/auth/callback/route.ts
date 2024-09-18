import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type CookieOptions, createServerClient } from "@supabase/ssr";

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	const next = searchParams.get("next") ?? "";

	if (code) {
		const cookieStore = cookies();
		const supabase = createServerClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			{
				cookies: {
					get(name: string) {
						return cookieStore.get(name)?.value;
					},
					set(name: string, value: string, options: CookieOptions) {
						cookieStore.set({ name, value, ...options });
					},
					remove(name: string, options: CookieOptions) {
						cookieStore.delete({ name, ...options });
					},
				},
			}
		);
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			return NextResponse.redirect(`${origin}${next}`);
		}
	}

	// return the user to an error page with instructions
	return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}

// const { data: currentUser, error: currentUserError } =
// await supabase.auth.getUser();
// const userId = currentUser?.user?.id;

// if (currentUserError || !userId) {
// console.error("User retrieval error:", currentUserError);
// toast.error("Authentication Error", {
//     description:
//         "We couldn't retrieve user details. Please try logging in again.",
// });
// return;
// }

// // Fetch user data from your 'users' table
// const { data: userData, error: userError } = await supabase
// .from("users")
// .select("*")
// .eq("id", userId)
// .single();

// if (userError) {
// toast.error("User Data Error", {
//     description:
//         "Could not retrieve your data from our servers. Please try again later.",
// });
// return;
// }

// // Update the Redux store with the user data
// dispatch(
// setUser({
//     id: userData.id,
//     email: userData.email,
//     name: userData.name,
//     profile_picture: userData.profile_picture || undefined,
// })
// );

// toast.success("Login Successful", {
// description: `Welcome back, ${userData.name}!`,
// });

// // Redirect to the desired path after successful login
// redirect("/");
