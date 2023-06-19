import { useWeb3React } from "@web3-react/core";
import STAKING from "abi/TvlStaking.json";
import { useContract } from "./useContract";
import { STAKING_CONTRACT_ADDRESS } from "constant";

export const useStakingContract = () => {
	const { chainId } = useWeb3React();
	return useContract({
		abi: STAKING,
		address: STAKING_CONTRACT_ADDRESS[chainId],
	});
};
