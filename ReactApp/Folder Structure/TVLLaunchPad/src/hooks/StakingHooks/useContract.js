import { useWeb3React } from "@web3-react/core";
import { getWeb3Contract } from "contract";
import { useMemo } from "react";

export const useContract = ({ address, abi, addressObj }) => {
	const { library, account, chainId } = useWeb3React();

	return useMemo(() => {
		if (!library || !abi || !account || !chainId) return null;
		if (address) {
			return getWeb3Contract(chainId, abi, address);
		}
		if (addressObj) {
			return getWeb3Contract(chainId, abi, addressObj[chainId]);
		}
		return null;
	}, [address, abi, addressObj, library, account, chainId]);
};
