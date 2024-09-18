//@ts-ignore
import NextTopLoader from "nextjs-toploader";

export default function TopLoader() {
	return (
		<>
			<NextTopLoader
				color="##9E70D6"
				initialPosition={0.15}
				crawlSpeed={200}
				height={5}
				crawl={true}
				showSpinner={false}
				easing="ease"
				speed={200}
				shadow="0 0 10px ##9E70D6,0 0 5px ##7066C2"
			/>
		</>
	);
}
