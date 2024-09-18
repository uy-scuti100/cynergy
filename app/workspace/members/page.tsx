import ReusableHeaderComponent from "@/app/_components/reusable-header/reusableHeader";
import { Button } from "@/components/ui/button";

export default function page() {
	return (
		<div className="common__styles">
			<ReusableHeaderComponent
				name="Members Page"
				isSmallText={true}
				buttonComponent={<Button className="bg-blue-500">Hey</Button>}
			/>
		</div>
	);
}
