import { useEffect } from "react";

const ScrollToTop = () => {
	useEffect(() => {
		if (typeof window !== "undefined") {
			window.scroll(0, 0);
		}
	}, []);
	return null;
};

export default ScrollToTop;
