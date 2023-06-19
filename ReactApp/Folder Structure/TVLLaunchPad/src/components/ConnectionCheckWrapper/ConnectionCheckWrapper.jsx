import { useWeb3React } from "@web3-react/core";
import Footer from "components/Footer";
import Header from "components/Header";
import { SUPPOTED_CHAINID } from "constant";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { idoState } from "redux/reducers/idoSlice";

const ConnectionCheckWrapper = ({ children }) => {
	const { active } = useWeb3React();
	const navigate = useNavigate();

	const { currentChainId } = useSelector(idoState);

	if (!active) {
		return (
			<>
				<Header />
				<Footer />
			</>
		);
	}
	if (!SUPPOTED_CHAINID.includes(currentChainId)) {
		return (
			<>
				<Header />
				<Footer />
			</>
		);
	}
	return children;
};

export default ConnectionCheckWrapper;
