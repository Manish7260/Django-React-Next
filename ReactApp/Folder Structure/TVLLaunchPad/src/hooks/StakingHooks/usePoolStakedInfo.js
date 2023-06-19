import { useCallback, useEffect, useMemo, useState } from "react";
import { useStakingContract } from "./useStakingContract";
import { getApy } from "utils";
import { useWeb3React } from "@web3-react/core";

export const usePoolStakedInfo = (poolId, poolToken, selectedChain) => {
	const _stakeContract = useStakingContract();
	const { chainId } = useWeb3React();
	const [poolInfo, setPoolInfo] = useState();

	const fetchPoolInfo = useCallback(async () => {
		try {
			const result = await _stakeContract.methods
				.getPoolInfo(poolId)
				.call();
			setPoolInfo(result);
		} catch (err) {
			setPoolInfo(null);
			console.log("err", err);
		}
	}, [poolId, _stakeContract]);

	useEffect(() => {
		if (!_stakeContract) return;
		fetchPoolInfo();
	}, [_stakeContract]);

	const poolObj = {
		accTokenPerShare: poolInfo?.[0]?.toString(),
		lastRewardBlock: poolInfo?.[1].toString(),
		rewardPerBlock: poolInfo?.[2]?.toString(),
		totalTokenStaked: poolInfo?.[3]?.toString(),
		totalTokenClaimed: poolInfo?.[4]?.toString(),
	};

	return {
		staked: poolObj.totalTokenStaked,
		claimed: poolObj.totalTokenClaimed,
		apy: getApy({
			poolObj: poolObj,
			chainId: chainId,
		}),
	};
};
