import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function LeavePageModal(props) {
	return (
		<div className="modal">
			<h2>Are you sure you want to leave?</h2>
			<p>Your changes may not be saved.</p>
			<button onClick={props.onStay}>Stay on this page</button>
			<button onClick={() => props.onLeave("/new-location")}>
				Leave this page
			</button>
		</div>
	);
}

const LeaveRoute = () => {
	const router = useLocation();
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	function handleBeforeUnload(event) {
		event.preventDefault();
		return (event.returnValue = "asdad");

		setShowModal(true);
	}

	function handleStay() {
		console.log("router", router);
		setShowModal(false);
	}

	function handleLeave() {
		setShowModal(false);
		window.removeEventListener("beforeunload", handleBeforeUnload);
		// Do any cleanup or navigation here
	}
	return (
		<div>
			{showModal && (
				<LeavePageModal onStay={handleStay} onLeave={handleLeave} />
			)}
			<div>Test</div>
		</div>
	);
};

export default LeaveRoute;
