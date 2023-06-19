import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
// import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

export const injected = new InjectedConnector({
	supportedChainIds: [
		1, 3, 4, 5, 42, 56, 97, 137, 80001, 10, 250, 42220, 43114, 42161, 31337,
	],
});
// export const walletconnect = new WalletConnectConnector({
// 	rpc: {
// 		56: "https://bsc-dataseed.binance.org/",
// 		97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
// 		31337: "http://127.0.0.1:8545/",
// 	},
// 	supportedChainIds: [56, 97, 1, 31337],
// 	bridge: "https://bridge.walletconnect.org",
// 	qrcode: true,
// 	pollingInterval: 12000,
// });

export const coinBaseWallate = new WalletLinkConnector({
	rpc: {
		56: "https://bsc-dataseed.binance.org/",
		97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
		31337: "http://127.0.0.1:8545/",
	},
	appName: "tvlLaunchpad",
});

export const getLibrary = (provider) => {
	const library = new Web3Provider(provider);
	library.pollingInterval = 8000;
	return library;
};
