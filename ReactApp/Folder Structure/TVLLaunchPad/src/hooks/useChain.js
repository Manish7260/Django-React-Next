import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { idoState } from "redux/reducers/idoSlice";

export const useChain = (cb) => {
	const { library } = useWeb3React();
	const navigate = useNavigate();
	const { isNavigate } = useSelector(idoState);

	const chainChange = useCallback(
		async (chainId) => {
			if (library) {
				try {
					await library?.provider.request({
						method: "wallet_switchEthereumChain",
						params: [
							{
								chainId: `0x${Number(+chainId).toString(16)}`,
							},
						],
					});
					isNavigate && navigate("/idos-list");
				} catch (err) {
					if (err.message?.includes("Unrecognized chain ID")) {
						toast.error(
							"Please add this network in your wallate first"
						);
					}
				} finally {
					if (typeof cb === "function") {
						cb();
					}
				}
			}
		},
		[cb, library]
	);

	return { chainChange };
};
