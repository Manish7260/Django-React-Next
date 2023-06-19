/* eslint-disable no-useless-escape */
import { allowanceAmount, IDO_PRE_SALE_FACTORY_ADDRESS, tokenUrls } from "constant";
import { erc20Contract, web3IdoFactoryContract, web3IdoPresaleContract } from "contract";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { toWei } from "utils";
import * as Yup from "yup";

import { bep20Contract } from "contract"
import { useWeb3React } from "@web3-react/core";

export const useIdoForm = () => {
	const [idoApply, setIdoApply] = useState({});
	const { chainId, account, library } = useWeb3React();

	const formik = useFormik({
		initialValues: {
			tokenAddress: "",
			tokenName: "",
			tokenSymbol: "",
			decimal: "",
			// idoAddress: "",
			tokenDecimal: 18,
			tokenAllocation: "",
			logoUrl: "",
			tokenRate: "",
			softCap: "",
			hardCap: "",
			minBuyPerUser: "",
			maxBuyPerUser: "",
			startTime: "",
			endTime: "",
			useWhiteList: false,
			chain: tokenUrls.find((cin) => cin.chainId === 1)?.name,
			// chain: idoApply?.blockchainPlateform,       //this is uncomment
			telegramUrl: "",
			twitterUrl: "",
			discordUrl: "",
			otherUrl: "",
		},
		validationSchema: Yup.object({
			tokenAddress: Yup.string()
				.trim()
				.matches(
					/^0x[a-fA-F0-9]{40}$/g,
					"Token address is not correct format"
				)
				.required("Token address is required"),
			tokenName: Yup.string().trim().required("token Name is require"),
			tokenSymbol: Yup.string()
				.trim()
				.required("token Symbol is require"),
			tokenDecimal: Yup.number("Please enter number").required(
				"Token Decimal value is require"
			),
			tokenAllocation: Yup.number()
				.required("token Allocation is required")
				.min(1, "cannot allow 0"),
			tokenRate: Yup.number("Please enter number")
				.required("Token rate is required")
				.min(1, "cannot allow 0"),
			softCap: Yup.number("Please enter number")
				.required("Soft cap is require")
				.min(1, "cannot allow 0"),
			hardCap: Yup.number("Please enter number")
				.required("Hard cap is require")
				.min(1, "cannot allow 0"),
			minBuyPerUser: Yup.number("Please enter number").required(
				"Min user per is require"
			),
			maxBuyPerUser: Yup.number("Please enter number").required(
				"Max user per is require"
			),
			startTime: Yup.date()
				.required("please enter valid start date")
				.min(
					new Date(new Date(Date.now()).getTime() - 300000),
					"please enter date grater than or today date"
				),
			endTime: Yup.date()
				.required("please enter valid end date")
				.min(
					Yup.ref("startTime"),
					({ min }) => `Date needs to be after ${min}!!`
				),
			chain: Yup.string().required("chain is required"),
			telegramUrl: Yup.string()
				.trim()
				.matches(
					/(https?:\/\/)?(www[.])?(telegram|t)\.me\/([a-zA-Z0-9_-]*)\/?$/,
					"please enter valid telegram url"
				),
			twitterUrl: Yup.string()
				.trim()
				.matches(
					/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/,
					"please enter valid twitter url"
				),
			discordUrl: Yup.string()
				.trim()
				.matches(
					/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g,
					"please enter valid discord url"
				),
			otherUrl: Yup.string()
				.trim()
				.matches(
					/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
					"please enter valid url"
				),
		}),
		onSubmit: async (values, helpers) => {
			console.log("values", values);

			if (values.softCap < values.tokenAllocation / values.tokenRate) {
				toast.error(
					"softCap is must be grater than (allowcation / rate)"
				);
				return;
			}
			if (values.hardCap < values.tokenAllocation / values.tokenRate) {
				toast.error(
					"hardCap is must be grater than (allowcation / rate)"
				);
				return;
			}

			//create ido on block chain

			const payload = {
				...values,
				idoAddress: "", // fetch from block chain
				logoUrl: idoApply?.projectCover,
			};
		},
	});

	const handleBlockchainChange = async (e) => {
		const chain = tokenUrls.find((chi) => chi.chainId === e);
		if (chain) {
			formik.setFieldValue("chain", chain.name);
		}
	};

	const handleChangeWhitelist = (e) => {
		console.log(e);
		formik.setFieldValue("useWhiteList", e);
	};

	const createIdo = async (ido) => {
		const _idoFactoryContract = web3IdoFactoryContract({ chainId });
		if (!_idoFactoryContract || !account) {
			return;
		}

		// {
		// 	TokenAddress: ido?.tokenAddress,
		// 	TokenAllocation: ido?.tokenAllocation,
		// 	TokenRate: ido?.tokenRate,
		// 	SoftCap: ido?.softCap,
		// 	HardCap: ido?.hardCap,
		// 	MinBuyPerUser: ido?.minBuy,
		// 	MaxBuyPerUser: ido?.maxBuy,
		// 	StartTime: new Date(ido?.idoStartDate).getTime(),
		// 	EndTime: new Date(ido?.idoEndDate).getTime(),
		// 	UseWhiteList: ido?.whiteList,
		// }
		try {
			//token address
			// const _erc20Contract = bep20Contract({address: "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82", library});

			//get approve when apply ido form
			// await _erc20Contract.approve(IDO_PRE_SALE_FACTORY_ADDRESS[chainId], allowanceAmount);

			/**ask to ridhish what to do about ownership because this sinariyo user send to 
			 * admin token and admin create pool in this case admin is ownwer of pool this is not ok 
			 * do somthig about it
			 * **/


			// await _erc20Contract.transfer(account, toWei("2000"));


			const transaction = await _idoFactoryContract.methods
				.createIDO(
					{
						TokenAddress: "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82",
						TokenAllocation: toWei("2000"),
						TokenRate: 2,
						SoftCap: toWei("500"),
						HardCap: toWei("900"),
						MinBuyPerUser: toWei("100"),
						MaxBuyPerUser: toWei("200"),
						StartTime: Math.floor(new Date(new Date().getTime() + (2 * 60000)).getTime() / 1000),
						EndTime: Math.floor(new Date(new Date().getTime() + (60 * 60000)).getTime() / 1000),
						UseWhiteList: false,
					},
					//this is ido token owner address
					"0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65"
				)
				.send({ from: account }, function (error, transactionHash) {
					if (error) {
						console.log("error", error);
					} else {
						//insert data in database
					}
				})
				.on("receipt", async function (receipt) {
					console.log('receipt', receipt)
				})
				.on("error", async function (error) {
					console.log('error', error)
				});

			const data = transaction.events['IdoCreated'].returnValues;

			//    data?.idoaddress
			//    data?.token

			// save this data in db

			console.log('data', data)

			// const allPools = await _idoFactoryContract.methods.getDeployedIdos().call()
			// console.log('allPools', allPools)

			// const pool = await _idoFactoryContract.methods.getIdoByToken("0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82").call()
			// console.log('pool', pool)



			//buy token
			// const _idoPresale = web3IdoPresaleContract({ address: pool, chainId })

			//approve tvl to idoPresale contract before buy to msg.sender
			// const _erc20C = bep20Contract({address: "0x5FbDB2315678afecb367f032d93F642f64180aa3", library});
			// await _erc20C.approve(pool, allowanceAmount)

			//hear use to wei and during create igo
			// const buyTransaction = await _idoPresale.methods.buyTokens(toWei("150")).send({ from: account })
			// 	.on("receipt", async function (receipt) {
			// 		console.log('receipt', receipt)
			// 	})
			// 	.on("error", async function (error) {
			// 		console.log('error', error)
			// 	});

			// console.log('buyTransaction', buyTransaction)
		} catch (err) {
			console.log('err', err)
		}
	};

	const approveIdoTokenAndTransfer = async () => {
		try {
			//token address
			const _erc20Contract = bep20Contract({ address: "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82", library });

			//get approve when apply ido form
			await _erc20Contract.approve(IDO_PRE_SALE_FACTORY_ADDRESS[chainId], allowanceAmount);

			/**ask to ridhish what to do about ownership because this sinariyo user send to 
			 * admin token and admin create pool in this case admin is ownwer of pool this is not ok 
			 * do somthig about it
			 * **/

			// await _erc20Contract.transfer(account, toWei("2000"));

		} catch (err) {
			console.log('err', err)
		}
	}

	const buyTokens = async () => {
		try {
			const _idoFactoryContract = web3IdoFactoryContract({ chainId });
			if (!_idoFactoryContract || !account) {
				return;
			}

			const allPools = await _idoFactoryContract.methods.getDeployedIdos().call()
			console.log('allPools', allPools)

			const pool = await _idoFactoryContract.methods.getIdoByToken("0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82").call()
			console.log('pool', pool)


			//buy token
			const _idoPresale = web3IdoPresaleContract({ address: pool, chainId })

			//approve tvl to idoPresale contract before buy to msg.sender
			const _erc20C = bep20Contract({ address: "0x5FbDB2315678afecb367f032d93F642f64180aa3", library });
			await _erc20C.approve(pool, allowanceAmount)

			//hear use to wei and during create igo
			const buyTransaction = await _idoPresale.methods.buyTokens(toWei("150")).send({ from: account })
				.on("receipt", async function (receipt) {
					console.log('receipt', receipt)
				})
				.on("error", async function (error) {
					console.log('error', error)
				});

			console.log('buyTransaction', buyTransaction)

		} catch (err) {
			console.log('err', err)
		}
	}

	const checkIdopresalTokenBalance = async () => {
		try {
			const _idoFactoryContract = web3IdoFactoryContract({ chainId });
			const _erc20Contrcat = erc20Contract({address:"0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82", library });

			const desimal = await _erc20Contrcat.decimals();
			console.log('desimal', desimal)

			if (!_idoFactoryContract || !account) {
				return;
			}
			const pool = await _idoFactoryContract.methods.getIdoByToken("0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82").call()
			console.log('pool', pool)

			const _erc20Contract = bep20Contract({ address: "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82", library });
			const balance = await _erc20Contract.balanceOf(pool)

			console.log('balance?.toString()', balance?.toString())

		} catch (err) {
			console.log('err', err)
		}
	}

	const climeToken = async () => {
		const _idoFactoryContract = web3IdoFactoryContract({ chainId });
		if (!_idoFactoryContract || !account) {
			return;
		}
		try {

			const pool = await _idoFactoryContract.methods.getIdoByToken("0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82").call()
			console.log('pool', pool)

			const _idoPresale = web3IdoPresaleContract({ address: pool, chainId })

			//userinvestment status
			const status = await _idoPresale.methods.userRecord(account).call()

			console.log('status', status)

			const transaction = await _idoPresale.methods.claimTokens().send({ from: account })
			.on("receipt", async function (receipt) {
				console.log('receipt', receipt)
			})
			.on("error", async function (error) {
				console.log('error', error)
				const parsedError = JSON.stringify(error.message);
				const msg = parsedError?.split(`'`)
				console.log('msg', msg[2])
				toast.error(msg[2])
				
			});
			console.log('transaction', transaction)
		} catch (err) {
			console.log('err', err)
			const parsedError = JSON.stringify(err.message);
			if (parsedError.includes('reverted with reason ')) {
				const msg = parsedError?.split(`'`)
				console.log('msg', msg[1])
				toast.error(msg[1])
			}

		}
	}

	//0nly token owner
	const withdrawRaisedFund = async () => {
		const _idoFactoryContract = web3IdoFactoryContract({ chainId });
		if (!_idoFactoryContract || !account) {
			return;
		}
		try {

			const pool = await _idoFactoryContract.methods.getIdoByToken("0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82").call()
			console.log('pool', pool)

			const _idoPresale = web3IdoPresaleContract({ address: pool, chainId })


			//check ido successfull or not
			const res = await _idoPresale.methods.isIdoSuccesful().call()

			console.log('res', res)


			const transaction = await _idoPresale.methods.withdrawRaisedFund().send({ from: account })
				.on("receipt", async function (receipt) {
					console.log('receipt', receipt)
				})
				.on("error", async function (error) {
					console.log('error', error)
					const parsedError = JSON.stringify(error.message);
					const msg = parsedError?.split(`'`)
					console.log('msg', msg[2])
					toast.error(msg[2])
					
				});
			console.log('transaction', transaction)
		} catch (err) {



		}

	}

	//create ido
	// 1. give approve to ido token fron owner to idopresaleFactory contract when apply igoapply form
	// 2. when user buy token then frist approve tvl token from user to idoPresale(pool) contract 

	return {
		handleBlockchainChange,
		handleChangeWhitelist,
		setIdoApply,
		formik,
		approveIdoTokenAndTransfer,
		createIdo,
		checkIdopresalTokenBalance,
		buyTokens,
		climeToken,
		withdrawRaisedFund
	};
};
