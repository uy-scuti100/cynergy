import dynamic from "next/dynamic";
const SignIn = dynamic(() => import("./_components/login"), {
	ssr: false,
});
export default function Page() {
	return (
		<div>
			<SignIn />
		</div>
	);
}
