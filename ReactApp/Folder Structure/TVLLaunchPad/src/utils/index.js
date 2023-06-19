import axios from "axios";
import BigNumber from "bignumber.js";
import {
	ANUAL_BLOCK_MINT,
	CHAIN_NAME,
	dayName,
	RPC_URLS,
	tokenUrls,
} from "constant";
import { web3Erc20Contract } from "contract";
import { toast } from "react-toastify";
import Web3 from "web3";

export const selectChainImage = (cur) => {
	// previous-image.png
	switch (cur) {
		case CHAIN_NAME.POLYGON:
			return "assets/images/project/previous-image3.png";
		case CHAIN_NAME.MUMBAI:
			return "assets/images/project/previous-image3.png";
		case CHAIN_NAME.BINANCE:
			return "assets/images/project/previous-image.png";
		case CHAIN_NAME.ETHEREUM:
			return "assets/images/project/previous-image2.png";
		case CHAIN_NAME.AVALANCHE:
			return "assets/images/project/previous-image5.png";
		case CHAIN_NAME.GORELI:
			return "assets/images/project/previous-image2.png";
		case CHAIN_NAME.FANTOM:
			return "assets/images/icons/phantom.png";
		case CHAIN_NAME.HARDHAT:
			return "assets/images/project/previous-image2.png";
		default:
			return "assets/images/project/ninga-image.png";
	}
};

export const setCurrency = (cur) => {
	switch (cur) {
		case CHAIN_NAME.POLYGON:
			return "MATIC";
		case CHAIN_NAME.BINANCE:
			return "BSC";
		case CHAIN_NAME.ETHEREUM:
			return "ETH";
		case CHAIN_NAME.AVALANCHE:
			return "AVAX";
		case CHAIN_NAME.FANTOM:
			return "FTM";
		default:
			return "BUSD";
	}
};

const getStatus = (status, value) => {
	switch (status) {
		case "OPEN_IDO":
			return `${value > 1 ? "days" : "day"}  remaining`;
		case "UPCOMING":
			return `${value > 1 ? "days" : "day"}  to go`;
		case "PAST_IDO":
			return `${value > 1 ? "days" : "day"}  ago`;
		default:
			return "";
	}
};

// export const calculateDays = (date1, date2, status) => {
// 	const diffTime = Math.abs(
// 		new Date(date2).getTime() - new Date(date1).getTime()
// 	);
// 	console.log("date2", date2);
// 	return `${Math.ceil(diffTime / (1000 * 60 * 60 * 24))} ${
// 		status && getStatus(status, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
// 	}`;
// };

export const calculateDays = (date1, date2) => {
	const diffTime = Math.abs(date2 - date1);
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const uploadToIpfs = async (image) => {
	const formData = new FormData();
	formData.append("file", image);
	const response = await axios.post(
		process.env.REACT_APP_IPFS_PINNING_URL,
		formData,
		{
			maxContentLength: "Infinity",
			headers: {
				"Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
				pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
				pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRAT,
			},
		}
	);
	return response;
};

export const deleteImageToIpfs = async (cid) => {
	const response = await axios.delete(
		`${process.env.REACT_APP_IPFS_UNPIN_URL}${cid}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
			},
		}
	);
	return response;
};

export const getTokenByChainId = async (chainId) => {
	try {
		const networkDetails = tokenUrls?.find(
			(net) => net.chainId === chainId
		);
		if (networkDetails) {
			const response = await axios.get(networkDetails.tokenUrl);
			return response?.data?.tokens;
		}
		return [];
	} catch (err) {
		console.log("err :>> ", err);
	}
};

export const isMetaMaskInstalled = () => {
	return typeof window.web3 !== "undefined";
};

export const toWei = (amount, decimals = 18) => {
	try {
		if (!amount) {
			return new BigNumber(0).toString();
		}
		return new BigNumber(amount)
			.multipliedBy(new BigNumber(10).exponentiatedBy(decimals))
			.toFixed(0)
			.toString();
	} catch (error) {
		console.log("exeption in toWei , ", error);
		return null;
	}
};

export const fromWei = (amount, decimals = 18) => {
	console.log("amount", amount);
	try {
		if (!amount) {
			return new BigNumber(0).toString();
		}

		return new BigNumber(amount)
			.div(new BigNumber(10).exponentiatedBy(decimals))
			.toString();
	} catch (error) {
		console.log("exeption in fromWei ", error);
		return null;
	}
};

export const calCulateOutputTokenAmount = (
	amount,
	tokenrate,
	decimals = 18
) => {
	try {
		if (!amount || !tokenrate) {
			return new BigNumber(0).toString();
		}
		return new BigNumber(amount)
			.multipliedBy(new BigNumber(10).exponentiatedBy(decimals))
			.multipliedBy(tokenrate)
			.toString();
	} catch (error) {
		console.log("exeption in toWei , ", error);
		return null;
	}
};

export const revertedError = (error, index = 1) => {
	const parsedError = JSON.stringify(error.message);
	const msg = parsedError?.split(`'`);
	let message = [];
	msg?.map((err) => {
		if (!err.includes("\\") && !err.includes('"\\') && !err.includes("[")) {
			!err?.startsWith("\\") && message.push(err);
		}
	});
	console.log("msg", message);
	return message[0];
};

export const tokenInfo = async ({ address, chainId }) => {
	try {
		const _erc20Contract = web3Erc20Contract({
			address: address,
			chainId: chainId,
		});

		const result = await Promise.all([
			_erc20Contract.methods.name().call(),
			_erc20Contract.methods.symbol().call(),
			_erc20Contract.methods.decimals().call(),
			_erc20Contract.methods.totalSupply().call(),
		]);
		console.log("result", result);
		return result;
	} catch (err) {
		console.log("err", err);
		const parsedError = JSON.stringify(err.message);
		if (parsedError.includes("reverted with reason ")) {
			return toast.error(revertedError(err));
		}
		return toast.error(err?.message);
	}
};

export const prograssBar = (hardcap, totalRaised) => {
	if (!isFinite(hardcap) || !isFinite(totalRaised)) return;
	const mul = +totalRaised * 100;
	if (mul > 0) {
		return mul / +hardcap;
	}
	return 0;
};

export const checkEnoughTokens = (
	tokens,
	hardCap,
	tokenrate,
	decimals = 18
) => {
	try {
		if (!tokens || !hardCap || !tokenrate) {
			return false;
		}

		const allocation = new BigNumber(tokens).multipliedBy(
			new BigNumber(10).exponentiatedBy(decimals)
		);
		const hardcap = new BigNumber(hardCap);
		const rate = new BigNumber(tokenrate);

		return hardcap
			.multipliedBy(rate)
			.multipliedBy(new BigNumber(10).exponentiatedBy(decimals))
			.lte(allocation);
	} catch (error) {
		console.log("exeption in fromWei ", error);
		return null;
	}
};

export const tokenAmount = (hardCap, tokenrate, decimals = 18) => {
	try {
		if (!hardCap || !tokenrate) {
			return false;
		}

		const hardcap = new BigNumber(hardCap);
		const rate = new BigNumber(tokenrate);
		return hardcap
			.multipliedBy(rate)
			.multipliedBy(new BigNumber(10).exponentiatedBy(decimals));
	} catch (error) {
		console.log("exeption in fromWei ", error);
		return null;
	}
};

export const imageWithAndHeight = (providedFile) => {
	const imageDimentions = { width: null, height: null };
	return new Promise((resolve) => {
		const reader = new FileReader();

		reader.readAsDataURL(providedFile);
		reader.onload = function () {
			const img = new Image();
			img.src = reader.result;
			img.onload = function () {
				imageDimentions.width = img.width;
				imageDimentions.height = img.height;

				resolve(imageDimentions);
			};
		};
	});
};

export const getNativeBalance = async ({ chainId, address }) => {
	let web3;

	if (isMetaMaskInstalled()) {
		web3 = new Web3(window.ethereum);
	} else {
		web3 = new Web3(new Web3.providers.HttpProvider(RPC_URLS?.[chainId]));
	}
	return web3.eth.getBalance(address);
};

export function getDaysInMonth(year, month) {
	return new Date(year, month + 1, 0).getDate();
}

export function getWeekDays(year, month) {
	let day = new Date(year, month, 1).getDay();
	let result = [];
	for (let i = 0; i <= 6; i++) {
		if (day > 6) {
			day = 0;
		}
		result.push(dayName[day]);
		day++;
	}

	return result;
}

export const scrollToTopFun = () => {
	if (typeof window !== "undefined") {
		window.scroll(0, 0);
	}
};

//staking
// ANUAL_BLOCK_MINT
const getCalculatedApy = (
	blocksPerYear,
	rewardPerBlock,
	accTokenPerShare,
	totalTokenStaked
) => {
	const apy = new BigNumber(blocksPerYear)
		.times(new BigNumber(accTokenPerShare))
		.times(new BigNumber(rewardPerBlock))
		.div(totalTokenStaked)
		.times(100)
		.toFixed(1)
		.toString();
	return apy;
};

export const getApy = ({ poolObj, chainId }) => {
	try {
		const totalTokenLocked = new BigNumber(
			fromWei(poolObj?.totalTokenStaked)
		);
		const blocksPerYear = ANUAL_BLOCK_MINT[chainId];
		if (!blocksPerYear) {
			return "0";
		}

		const one = new BigNumber(1);
		const totalTokenStacked = one.div(totalTokenLocked);
		const apy = getCalculatedApy(
			blocksPerYear,
			poolObj?.rewardPerBlock,
			totalTokenStacked,
			totalTokenLocked
		);

		return apy;
	} catch (error) {
		console.log("getApy ", { error });
		return 0;
	}
};

function convertToInternationalCurrencySystem(labelValue, formatter) {
	// Nine Zeroes for Billions
	return Math.abs(Number(labelValue)) >= 1.0e9
		? formatter
				.format((Math.abs(Number(labelValue)) / 1.0e9).toFixed(2))
				.slice(1) + "B"
		: // Six Zeroes for Millions
		Math.abs(Number(labelValue)) >= 1.0e6
		? formatter
				.format((Math.abs(Number(labelValue)) / 1.0e6).toFixed(2))
				.slice(1) + "M"
		: // Three Zeroes for Thousands
		Math.abs(Number(labelValue)) >= 1.0e3
		? formatter
				.format((Math.abs(Number(labelValue)) / 1.0e3).toFixed(2))
				.slice(1) + "K"
		: formatter.format(Math.abs(Number(labelValue))).slice(1);
}

export const formatLargeNumber = (value, precision = 2) => {
	const _value = !value ? "0" : value;
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: precision,
	});

	const formattedValue = convertToInternationalCurrencySystem(
		_value,
		formatter
	);

	return formattedValue;
};

export const resetCurrencyFormatting = (value) => {
	return value.split(",").join("");
};

export const isNumber = (value) => {
	return !isNaN(parseInt(value));
};

export const formatCurrency = (
	value,
	usd = false,
	fractionDigits = 1,
	currencyFormat = false
) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: fractionDigits,
	});

	//for currency format with $symbol
	if (usd) {
		return formatter.format(value ? value : 0);
	}

	if (typeof window.web3 === "undefined") {
		return formatter.format(value ? value : 0).slice(1);
	}
	const netId = window.ethereum.networkVersion;
	if (["97", "56"].includes(netId) && !currencyFormat) {
		// for bsc network only
		return convertToInternationalCurrencySystem(
			value ? value : 0,
			formatter
		);
	}
	return formatter.format(value ? value : 0).slice(1);
};
