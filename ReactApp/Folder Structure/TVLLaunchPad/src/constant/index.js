export const PINATA_API_KEY = "ec07ce313d6d9f81f69b";
export const PINATA_API_SECRAT =
	"22ffdaca7b91cfd95daced4cc71afdc486d69858b166ab15cafa2b4f8898be24";
export const PINATA_JWT =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwNThlYTJlNC0wMWM4LTRlY2UtODg5Yy00YjgwNTg3ZTM5MjMiLCJlbWFpbCI6ImNydWRlbWFpbHRlc3RAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImVjMDdjZTMxM2Q2ZDlmODFmNjliIiwic2NvcGVkS2V5U2VjcmV0IjoiMjJmZmRhY2E3YjkxY2ZkOTVkYWNlZDRjYzcxYWZkYzQ4NmQ2OTg1OGIxNjZhYjE1Y2FmYTJiNGY4ODk4YmUyNCIsImlhdCI6MTY2ODA2NTgxNX0.ng2gGTmNP--3deu2hKmPKqBS3-vf_PP_jHVHuUFuHnM";

export const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs/";
export const IPFS_PINNING_URL =
	"https://api.pinata.cloud/pinning/pinFileToIPFS";

export const IPFS_UNPIN_URL = "https://api.pinata.cloud/pinning/unpin/";

export const SUPPORTED_FORMATS = [
	"image/jpg",
	"image/jpeg",
	"image/gif",
	"image/png",
];

export const monthNames = [
	"JANUARY",
	"FEBRUARY",
	"MARCH",
	"APRIL",
	"MAY",
	"JUNE",
	"JULY",
	"AUGUAST",
	"SEPTMBER",
	"OCTOBER",
	"NOVEMBER",
	"DECEMBER",
];

export const dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const PARTNER = "tvlLaunchpad";
// export const SLIPPAGE = 1; // 1%

export const CHAIN_NAME = {
	ETHEREUM: "ETHEREUM",
	HARDHAT: "HARDHAT",
	BINANCE: "BINANCE",
	POLYGON: "POLYGON",
	MUMBAI: "MUMBAI",
	AVALANCHE: "AVALANCHE",
	FANTOM: "FANTOM",
	GORELI: "GORELI",
};

export const DIFFRENT_CHAIN_CONTRACT_ADDRESS = {
	5: {
		name: "IgoContract",
		chainId: 5,
		address: "0xdd0CCdf2e97397282050dB0b91375566C254D8B7",
		etherScanurl: "https://goerli.etherscan.io/tx/",
	},
};

//importance for now add many information as posible
export const tokenUrls = [
	// {
	// 	name: CHAIN_NAME.ETHEREUM,
	// 	currency: "ETH",
	// 	tokenUrl: "https://apiv5.paraswap.io/tokens/1",
	// 	chainId: 1,
	// 	logo: "/assets/images/icons/Chain2.png",
	// 	scanUrl: "https://etherscan.io/tx/",
	// 	contractAddress: "",
	// },
	// {
	// 	name: CHAIN_NAME.HARDHAT,
	// 	currency: "ETH",
	// 	tokenUrl: "https://apiv5.paraswap.io/tokens/1",
	// 	chainId: 31337,
	// 	logo: "/assets/images/icons/Chain2.png",
	// 	scanUrl: "https://etherscan.io/tx/",
	// 	contractAddress: "",
	// },
	// {
	// 	name: CHAIN_NAME.BINANCE,
	// 	currency: "BSC",
	// 	tokenUrl: "https://apiv5.paraswap.io/tokens/56",
	// 	chainId: 56,
	// 	logo: "/assets/images/icons/Chain1.png",
	// 	scanUrl: "https://bscscan.com/tx/",
	// 	contractAddress: "",
	// },
	// {
	// 	name: CHAIN_NAME.POLYGON,
	// 	currency: "MATIC",
	// 	tokenUrl: "https://apiv5.paraswap.io/tokens/137",
	// 	chainId: 137,
	// 	logo: "/assets/images/icons/Chain4.png",
	// 	scanUrl: "https://polygonscan.com/tx/",
	// 	contractAddress: "",
	// },
	// {
	// 	name: CHAIN_NAME.AVALANCHE,
	// 	currency: "AVAX",
	// 	tokenUrl: "https://apiv5.paraswap.io/tokens/43114",
	// 	chainId: 43114,
	// 	logo: "/assets/images/icons/Chain3.png",
	// 	scanUrl: "https://snowtrace.io/tx/",
	// 	contractAddress: "",
	// },
	// {
	// 	name: CHAIN_NAME.FANTOM,
	// 	currency: "FTM",
	// 	tokenUrl: "https://apiv5.paraswap.io/tokens/250",
	// 	chainId: 250,
	// 	logo: "/assets/images/icons/phantom.png",
	// 	scanUrl: "https://ftmscan.com/tx/",
	// 	contractAddress: "",
	// },

	//testnet
	// {
	// 	name: CHAIN_NAME.GORELI,
	// 	currency: "ETH",
	// 	tokenUrl: "https://apiv5.paraswap.io/tokens/1",
	// 	chainId: 5,
	// 	logo: "/assets/images/icons/Chain2.png",
	// 	scanUrl: "https://goerli.etherscan.io/tx/",
	// 	contractAddress: "0xdd0CCdf2e97397282050dB0b91375566C254D8B7",
	// },
	// {
	// 	name: "Optimism",
	// 	tokenUrl: "https://apiv5.paraswap.io/tokens/10",
	// 	chainId: 10,
	// },
	// {
	// 	name: "Arbitrum",
	// 	tokenUrl: "https://apiv5.paraswap.io/tokens/42161",
	// 	chainId: 42161,
	// },
	{
		name: CHAIN_NAME.MUMBAI,
		currency: "MATIC",
		tokenUrl: "https://apiv5.paraswap.io/tokens/137",
		chainId: 80001,
		logo: "/assets/images/icons/Chain4.png",
		scanUrl: "https://polygonscan.com/tx/",
		contractAddress: "",
	},
];

export const BLOCK_EXPLORER = {
	1: "https://etherscan.io/tx/",
	56: "https://bscscan.com/tx/",
	137: "https://polygonscan.com/tx/",
	5: "https://goerli.etherscan.io/tx/",
	80001: "https://mumbai.polygonscan.com/tx/",
};

// 0x06A8Dc479DC798c29Cc858421655413Fa674dFd5
export const IDO_PRE_SALE_FACTORY_ADDRESS = {
	31337: "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0",
	80001: "0x26bcff12C7B25392A3BCB7D1c793889bD9F69034",
};

export const SWAP_ADDRESS = {
	31337: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
	80001: "0xb48863442aBe58297f13eD747aDF7ab035040311",
};

export const TVL_ADDRESS = {
	31337: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
	80001: "0xecFA2b252a1aE69594623489cb3b44Fc49DCb591",
};

export const TVL_BUSD_PAIR = {
	31337: [
		{
			address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
			name: "TVL",
			symbol: "TVL",
			logo: "/assets/images/icons/phantom.png",
		},
		{
			address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
			name: "BUSD TOKEN",
			symbol: "BUSD",
			logo: "/assets/images/icons/Chain2.png",
		},
	],
	80001: [
		{
			address: "0xecFA2b252a1aE69594623489cb3b44Fc49DCb591",
			name: "TVL",
			symbol: "TVL",
			logo: "/assets/images/icons/phantom.png",
		},
		{
			address: "0x37bC2B2913732657f8308D941037C2620aa2d57f",
			name: "BUSD TOKEN",
			symbol: "BUSD",
			logo: "/assets/images/icons/Chain2.png",
		},
	],
};

export const NATIVE_TOKENS = {
	80001: [
		{
			address: "0x0000000000000000000000000000000000000000",
			name: "MATIC",
			type: "native",
			symbol: "MATIC",
			logo: "/assets/images/icons/Chain4.png",
		},
		{
			address: "0xecFA2b252a1aE69594623489cb3b44Fc49DCb591",
			name: "TVL",
			type: "stable",
			symbol: "TVL",
			logo: "/assets/images/icons/phantom.png",
		},
	],
};

export const PAIIR_DROPDOWN = {
	80001: ["MATIC", "TVL"],
};

export const RPC_URLS = {
	1: "https://mainnet.infura.io/v3/93b3db09c41f4dedab011bd43f8817d7",
	5: "https://goerli.infura.io/v3/93b3db09c41f4dedab011bd43f8817d7",
	80001: "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78",
	97: "https://data-seed-prebsc-1-s1.binance.org:8545",
	31337: "http://127.0.0.1:8545",
};

export const allowanceAmount = "9999999999999999999999999";

export const SUPPOTED_CHAINID = [80001];

//staking
export const STAKING_CONTRACT_ADDRESS = {
	80001: "",
};

export const ANUAL_BLOCK_MINT = {
	1: 2400000,
	137: 43200 * 365,
	80001: 43200 * 365,
};
