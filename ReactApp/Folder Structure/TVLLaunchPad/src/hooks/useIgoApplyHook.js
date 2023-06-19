/* eslint-disable no-useless-escape */
import {
	IDO_PRE_SALE_FACTORY_ADDRESS,
	PAIIR_DROPDOWN,
	SUPPORTED_FORMATS,
	tokenUrls,
} from "constant";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { igoApplyState, userState } from "redux/reducers";
import {
	igoApplyAction,
	igoApproveToFactory,
	payPreFeeIdoAction,
} from "redux/actions/igoApplyAction";
import { useChain } from "./useChain";
import { useWeb3React } from "@web3-react/core";
import { web3Erc20Contract } from "contract";
import { checkEnoughTokens, imageWithAndHeight, revertedError } from "utils";
import { idoState } from "redux/reducers/idoSlice";

export const useIgoApply = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { chainChange } = useChain();
	const { active } = useWeb3React();
	const { details, authenticated } = useSelector(userState);
	const { userAccount, currentChainId } = useSelector(idoState);
	const { tokenApproved, isFeeCollected } = useSelector(igoApplyState);

	const [image, setImage] = useState();
	const [coverImage, setCoverImage] = useState();

	const [buttonStatus, setButtonStatus] = useState({
		currentBtnText: "Apply",
		disabled: false,
	});
	const [modelOpen, setModelOpen] = useState(false);

	const resetState = (helpers) => {
		image && URL.revokeObjectURL(image);
		helpers.resetForm();
		navigate("/");
	};

	const imageCheck = Yup.addMethod(
		Yup.mixed,
		"imageCheck",
		function (message, requiredWidth, requiredHeight) {
			return this.test(
				"image-width-height-check",
				message,
				async function (value) {
					const { path, createError } = this;

					if (!value) {
						return;
					}

					const imgDimensions = await imageWithAndHeight(value);

					if (imgDimensions.width !== requiredWidth) {
						return createError({
							path,
							message: `The file width needs to be the ${requiredWidth}px!`,
						});
					}

					if (imgDimensions.height !== requiredHeight) {
						return createError({
							path,
							message: `The file height needs to be the ${requiredHeight}px!`,
						});
					}

					return true;
				}
			);
		}
	);

	const formik = useFormik({
		initialValues: {
			tokenAddress: "",
			ownerAddress: "",
			projectCover: "",
			coverImage: "",
			projectName: "",
			symbol: "",
			description: "",
			websiteUrl: "",
			whitePaperUrlPdf: "",
			blockchainPlateform: tokenUrls.find(
				(cin) => cin.chainId === currentChainId
			)?.name,
			tokenRate: "",
			softCap: "",
			hardCap: "",
			tokenAllocation: "",
			maxBuy: "",
			minBuy: "",
			idoStartDate: "",
			idoEndDate: "",
			whiteList: false,
			isWhiteListVisible: false,
			telegramUrl: "",
			twitterUrl: "",
			discordUrl: "",
			other: "",
			pairCoin: "",
		},
		validationSchema: Yup.object({
			tokenAddress: Yup.string()
				.trim()
				.matches(
					/^0x[a-fA-F0-9]{40}$/g,
					"Token address is not correct format"
				)
				.required("Token address is required"),
			ownerAddress: Yup.string()
				.trim()
				.matches(
					/^0x[a-fA-F0-9]{40}$/g,
					"owner address is not correct format"
				)
				.required("Owner address is required"),
			// projectCover: Yup.mixed()
			// 	.required("Please select a image")
			// 	.test(
			// 		"fileSize",
			// 		"File is too large",
			// 		(value) => value?.size <= 2000000
			// 	)
			// 	.test("fileType", "Only image are allowed", (value) =>
			// 		SUPPORTED_FORMATS.includes(value?.type)
			// 	),
			projectCover: Yup.mixed()
				.required("Please select a image")
				.test(
					"fileSize",
					"File is too large",
					(value) => value?.size <= 2000000
				)
				.test("fileType", "Only image are allowed", (value) =>
					SUPPORTED_FORMATS.includes(value?.type)
				),
			coverImage: Yup.mixed()
				.required("Please select a image")
				.test(
					"fileSize",
					"File is too large",
					(value) => value?.size <= 2000000
				)
				.test("fileType", "Only image are allowed", (value) =>
					SUPPORTED_FORMATS.includes(value?.type)
				)
				.imageCheck("test", 1920, 1080),
			projectName: Yup.string()
				.trim()
				.required("Project name is require"),
			symbol: Yup.string().trim().required("symbol is require"),
			websiteUrl: Yup.string()
				.trim()
				.matches(
					/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
					"please enter valid website url"
				)
				.required("Please enter valid url"),
			whitePaperUrlPdf: Yup.string()
				.trim()
				.matches(
					/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
					"please enter valid white paper pdf url"
				)
				.required("Please enter valid url"),
			blockchainPlateform: Yup.string().required("Plateform is required"),
			tokenRate: Yup.number()
				.typeError("you must specify a number")
				.required("Please enter valid Token rate"),
			softCap: Yup.number()
				.typeError("you must specify a number")
				.required("Please enter valid Softcap"),
			hardCap: Yup.number()
				.typeError("you must specify a number")
				.required("Please enter valid Hardcap"),
			minBuy: Yup.number()
				.typeError("you must specify a number")
				.required("Please enter valid Minbuy"),
			maxBuy: Yup.number()
				.typeError("you must specify a number")
				.required("Please enter valid Maxbuy"),
			tokenAllocation: Yup.number()
				.typeError("you must specify a number")
				.required("Please enter valid tokenallocation"),
			idoStartDate: Yup.date()
				.required("please enter valid start date")
				.min(
					new Date(new Date(Date.now()).getTime() - 300000),
					"please enter date grater than or today date"
				),
			idoEndDate: Yup.date()
				.required("please enter valid end date")
				.min(
					Yup.ref("idoStartDate"),
					({ min }) => `Date needs to be after ${min}!!`
				),
			pairCoin: Yup.string().required("Pair coin is required"),
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
			other: Yup.string()
				.trim()
				.matches(
					/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
					"please enter valid url"
				),
		}),
		onSubmit: async (values, helpers) => {
			if (!authenticated || !details?.email) {
				return toast.error("Please login frist");
			}

			if (buttonStatus.currentBtnText === "Connect Wallet") {
				return setModelOpen(!modelOpen);
			}

			try {
				const factoryAddress =
					IDO_PRE_SALE_FACTORY_ADDRESS[currentChainId];

				if (!factoryAddress) {
					return toast.error(
						"No ido presale contract found on this chain"
					);
				}
				const _erc20Contract = web3Erc20Contract({
					address: values.tokenAddress,
					chainId: currentChainId,
				});

				const decimal = await _erc20Contract.methods.decimals().call();

				if (
					!checkEnoughTokens(
						values.tokenAllocation,
						values.hardCap,
						values.tokenRate,
						decimal
					)
				) {
					return toast.error("Not enough token to reach hardcap");
				}

				if (!tokenApproved) {
					await dispatch(
						igoApproveToFactory({
							chainId: currentChainId,
							account: userAccount,
							payload: values,
						})
					);
					// await createIgoApply(values, helpers);
					return;
				}

				if (!isFeeCollected) {
					await dispatch(
						payPreFeeIdoAction({
							chainId: currentChainId,
							account: userAccount,
							idoAddress: values.tokenAddress,
						})
					);
					return;
				}

				//add decimal field in db
				values.decimal = decimal;
				await createIgoApply(values, helpers);
			} catch (err) {
				console.log("err", err);
				const parsedError = JSON.stringify(err.message);
				if (parsedError.includes("reverted with reason ")) {
					return revertedError(err);
				}
				return toast.error(err?.message);
			}
		},
	});

	useEffect(() => {
		if (!currentChainId) return;
		const chain = PAIIR_DROPDOWN[currentChainId];
		chain && formik.setFieldValue("pairCoin", chain[0]);
	}, [currentChainId]);

	const createIgoApply = async (payload, helpers) => {
		payload.idoStartDate = new Date(payload.idoStartDate).toISOString();
		payload.idoEndDate = new Date(payload.idoEndDate).toISOString();
		await dispatch(
			igoApplyAction({
				payload,
				callback: () => resetState(helpers),
			})
		);
	};

	const handleBlockchainChange = async (e) => {
		const chain = tokenUrls.find((chi) => chi.chainId === e);
		if (chain) {
			await chainChange(chain);
			formik.setFieldValue("blockchainPlateform", chain.name);
		}
	};

	const handleChangeWhitelist = (e) => {
		formik.setFieldValue("whiteList", e);
	};

	const handleChangeIsWhitelist = (e) => {
		formik.setFieldValue("isWhiteListVisible", e);
	};

	const onImageChange = (e) => {
		image && URL.revokeObjectURL(image);
		setImage(URL.createObjectURL(e.target.files[0]));
		formik.values.projectCover = e.target.files[0];
	};

	const onCoverImageChange = (e) => {
		coverImage && URL.revokeObjectURL(coverImage);
		setCoverImage(URL.createObjectURL(e.target.files[0]));
		formik.values.coverImage = e.target.files[0];
	};

	return {
		formik,
		image,
		handleBlockchainChange,
		handleChangeWhitelist,
		handleChangeIsWhitelist,
		onImageChange,
		onCoverImageChange,
		coverImage,
		setButtonStatus,
		buttonStatus,
		modelOpen,
		setModelOpen,
	};
};
