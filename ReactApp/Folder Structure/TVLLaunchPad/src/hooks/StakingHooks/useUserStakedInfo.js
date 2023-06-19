import { useEffect, useState } from "react";
import { useStakingContract } from "./useStakingContract";

export const useUserStakedInfo = (poolId, account) => {
	const _stakeContract = useStakingContract();
	const [userInfo, setUserInfo] = useState();

	const fetchUserInfo = async () => {
		try {
			const [user, pendingReward] = await Promise.all([
				_stakeContract.methods.userInfo(poolId, account).call(),
				_stakeContract.methods.pendingReward(poolId, account).call(),
			]);
			setUserInfo({
				staked: user?.amount?.toString(),
				claimed: user?.rewardClaimed?.toString(),
				pending: pendingReward?.toString(),
			});
		} catch (err) {
			setUserInfo(null);
			console.log("err", err);
		}
	};

	useEffect(() => {
		if (!_stakeContract || !poolId || !account) return;
		fetchUserInfo();
	}, [_stakeContract]);

	return userInfo;
};
