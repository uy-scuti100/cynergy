import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/lib/providers/theme/theme-provider";
import { ReduxProvider } from "@/lib/providers/redux/provider";
import { ReactQueryProvider } from "@/lib/providers/react-query";

const sans = Source_Sans_3({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Cynergy - Project Managnement Software",
	description:
		"Your most effecttive solution to efficient project and task management at s ncale",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${sans.variable} antialiased`}
			suppressHydrationWarning
		>
			<body>
				<NextTopLoader
					color="#564dde"
					initialPosition={0.08}
					crawlSpeed={200}
					height={3}
					crawl={true}
					showSpinner={false}
					easing="ease"
					speed={200}
					shadow="0 0 10px #564dde,0 0 5px #564dde"
					zIndex={1600}
					showAtBottom={false}
				/>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<ReduxProvider>
						<ReactQueryProvider>
							<div className="mx-auto">{children}</div>
						</ReactQueryProvider>
					</ReduxProvider>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
