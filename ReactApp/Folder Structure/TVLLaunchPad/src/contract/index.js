import {
	RPC_URLS,
	SWAP_ADDRESS,
	IDO_PRE_SALE_FACTORY_ADDRESS,
	STAKING_CONTRACT_ADDRESS,
} from "constant";
import { isMetaMaskInstalled } from "utils";
import BEP20 from "abi/BEP20.json";
import SWAP from "abi/customTvLBusdSwap.json";
import IDOFACTORY from "abi/IdoPreSaleFactory.json";
import IDOPRESALE from "abi/IdoPresale.json";
import ERC20 from "abi/ERC20.json";
import STAKING from "abi/TvlStaking.json";
import { Contract } from "@ethersproject/contracts";
import Web3 from "web3";

const getContract = (abi, contractAddress, library) => {
	if (isMetaMaskInstalled()) {
		return new Contract(contractAddress, abi, library?.getSigner());
	}
	return;
};

export const bep20Contract = ({ address, library }) => {
	return getContract(BEP20, address, library);
};

export const erc20Contract = ({ address, library }) => {
	if (!address) {
		return null;
	}
	return getContract(ERC20, address, library);
};

export const swapContract = ({ chainId, library }) => {
	const swapcontractAddress = SWAP_ADDRESS[chainId];

	if (swapcontractAddress) {
		return getContract(SWAP, swapcontractAddress, library);
	}

	return null;
};

export const getWeb3Contract = (chainId, abi, contractAddress) => {
	let web3;

	if (isMetaMaskInstalled()) {
		web3 = new Web3(window.ethereum);
	} else {
		web3 = new Web3(new Web3.providers.HttpProvider(RPC_URLS?.[chainId]));
	}

	return new web3.eth.Contract(abi, contractAddress);
};

export const web3Bep20Contract = ({ chainId, address }) => {
	return getWeb3Contract(chainId, BEP20, address);
};

export const web3Erc20Contract = ({ chainId, address }) => {
	return getWeb3Contract(chainId, ERC20, address);
};

export const web3SwapContract = ({ chainId }) => {
	const swapcontractAddress = SWAP_ADDRESS[chainId];

	if (swapcontractAddress) {
		return getWeb3Contract(chainId, SWAP, swapcontractAddress);
	}

	return null;
};

export const web3IdoFactoryContract = ({ chainId }) => {
	const address = IDO_PRE_SALE_FACTORY_ADDRESS[chainId];
	if (!address) {
		return null;
	}

	return getWeb3Contract(chainId, IDOFACTORY, address);
};

export const web3IdoPresaleContract = ({ address, chainId }) => {
	if (!address) {
		return null;
	}

	return getWeb3Contract(chainId, IDOPRESALE, address);
};

export const web3StakingContract = ({ chainId }) => {
	const address = STAKING_CONTRACT_ADDRESS[chainId];
	if (!address) {
		return null;
	}
	return getWeb3Contract(chainId, STAKING, address);
};
