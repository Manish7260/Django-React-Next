import Footer from "./Footer";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";

const Wrapper = ({ children }) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default Wrapper;
