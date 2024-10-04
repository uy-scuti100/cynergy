import ReactDOM from "react-dom";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

type Props = {
	isOpen: boolean;
	onClose: Dispatch<SetStateAction<boolean>>;
	children: React.ReactNode;
	handleClickOut?: boolean;
};

export default function ReusableModal({
	isOpen,
	onClose,
	children,
	handleClickOut,
}: Props) {
	if (!isOpen) return null;

	const modalRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (handleClickOut) {
			const handleClickOutside = (event: MouseEvent) => {
				if (
					modalRef.current &&
					!modalRef.current.contains(event.target as Node)
				) {
					onClose(false);
				}
			};

			// Add event listener for clicks
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				// Clean up the event listener on component unmount
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}
	}, [handleClickOut, onClose]);

	return ReactDOM.createPortal(
		<div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto dark:bg-black/90 bg-black/50 p-4">
			<div
				ref={modalRef}
				className="w-full max-w-xl rounded-lg bg-[var(--background)] p-4 shadow-lg "
			>
				{children}
			</div>
		</div>,
		document.body
	);
}
// bg-[var(--light-background)] hover:bg-gray-50 dark:bg-gray-800
