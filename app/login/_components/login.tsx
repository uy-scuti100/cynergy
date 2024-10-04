"use client";

import React, { useState } from "react";
import { Provider } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FiGithub, FiLoader, FiSlack } from "react-icons/fi";
import { RiGoogleLine } from "react-icons/ri";
import { handleSocialLogin } from "@/hooks/useSocialLogin";

import LoginLogo from "./login-logo";
import Image from "next/image";
export default function LoginComponent() {
	const [google, setGoogle] = useState(false);
	const [github, setGithub] = useState(false);
	const [slack, setSlack] = useState(false);

	const handleSocialLoginClick = async (provider: Provider) => {
		// Set loading state based on provider

		try {
			if (provider === "google") {
				setGoogle(true);
			} else if (provider === "github") {
				setGithub(true);
			} else if (provider === "slack") {
				setSlack(true);
			}
			await handleSocialLogin(provider);
		} catch (error) {
			console.error("Social login error:", error);
		} finally {
			// // Reset loading state after handling
			// if (provider === "google") {
			// 	setGoogle(false);
			// } else if (provider === "github") {
			// 	setGithub(false);
			// } else if (provider === "slack") {
			// 	setSlack(false);
			// }
		}
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center">
			<div className="grid justify-center w-full sm:w-[26rem] sm:p-5">
				<div className="text-center space-y-8">
					<div className="flex justify-center items-center gap-2">
						{/* <LoginLogo /> */}
						<Image src="/new-logo.png" alt="logo" width={250} height={100} />
					</div>

					<p className="pb-5 font-medium">
						{/* Welcome! <br />
						Please sign in to continue */}
					</p>
				</div>

				<Card className="border-none shadow-none">
					<CardHeader className="space-y-2">
						<CardContent className="grid gap-4 min-w-[400px]">
							<div className="grid grid-cols-1">
								<Button
									variant="outline"
									onClick={() => handleSocialLoginClick("google")}
									disabled={google}
									className="flex items-center justify-center disabled:cursor-not-allowed"
								>
									{google && <FiLoader className="mr-2 animate-spin" />}
									<RiGoogleLine className="w-4 h-4 mr-2" />
									Google
								</Button>
							</div>
							<div className="grid grid-cols-1">
								<Button
									variant="outline"
									onClick={() => handleSocialLoginClick("github")}
									disabled={github}
									className="flex items-center justify-center disabled:cursor-not-allowed"
								>
									{github && <FiLoader className="mr-2 animate-spin" />}
									<FiGithub className="w-4 h-4 mr-2" />
									Github
								</Button>
							</div>
							<div className="grid grid-cols-1">
								<Button
									variant="outline"
									onClick={() => handleSocialLoginClick("slack")}
									disabled={slack}
									className="flex items-center justify-center disabled:cursor-not-allowed"
								>
									{slack && <FiLoader className="mr-2 animate-spin" />}
									<FiSlack className="w-4 h-4 mr-2" />
									Slack
								</Button>
							</div>
						</CardContent>
					</CardHeader>
				</Card>
			</div>
		</div>
	);
}

// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";
// import Link from "next/link";
// import { Label } from "@/components/ui/label";
// const [passwordReveal, setPasswordReveal] = useState(false);
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");
// const [loggingIn, setLoggingIn] = useState(false);
// const searchParams = useSearchParams();
// import { useSearchParams } from "next/navigation";
//const handleSignIn = async () => {
// 	setLoggingIn(true);
// 	try {
// 		await login(email, password);
// 	} catch (error) {
// 		console.error("Signin error:", error);
// 	} finally {
// 		setEmail("");
// 		setPassword("");
// 	}
// };
