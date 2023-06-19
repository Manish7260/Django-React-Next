import ERC20 from "abi/ERC20.json";
import { useContract } from "./useContract";

export const useTokenContract = (address) => {
	return useContract({ address: address, abi: ERC20 });
};
