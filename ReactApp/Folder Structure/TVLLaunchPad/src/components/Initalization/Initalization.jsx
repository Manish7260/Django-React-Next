import { useDispatch, useSelector } from "react-redux";
import {
	idoFactoryContractAction,
	idoPresaleContractAction,
	idoState,
	setAccountAction,
	setChainIdAction,
} from "redux/reducers/idoSlice";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";

const Initalization = ({ children }) => {
	const { account, chainId, active } = useWeb3React();
	const {
		ido,
		currentChainId,
		_idoFactoryContract,
		_idoPresaleContract,
		userAccount,
		createIdoData,
		transaction,
	} = useSelector(idoState);

	const dispatch = useDispatch();
	// const navigate = useNavigate();
	//state
	// const [idoCreateListinar, setIdoCreateListionar] = useState(null);
	// const [idoUpdateListinar, setIdoUpdateListionar] = useState(null);

	// const createIdoinDb = (event) => {
	// 	// if (userAccount !== event?.returnValues?.user) return;
	// 	console.log("event fire", event?.returnValues?.idoaddress);
	// 	const payload = {
	// 		...createIdoData,
	// 		idoAddress: event?.returnValues?.idoaddress,
	// 	};
	// 	dispatch(createIdoDbAction(payload));
	// };

	// const updateIdoinDb = useCallback(() => {
	// 	console.log("update fire");
	// 	dispatch(updateIdoDbAction());
	// }, [dispatch]);

	useEffect(() => {
		if (!account) return;
		dispatch(setAccountAction(account));
	}, [account, dispatch]);

	useEffect(() => {
		if (!chainId) return;
		dispatch(setChainIdAction(chainId));
	}, [chainId, dispatch]);

	useEffect(() => {
		dispatch(idoFactoryContractAction());
		// navigate("/");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentChainId, dispatch]);

	useEffect(() => {
		dispatch(idoFactoryContractAction());
	}, [currentChainId, dispatch]);

	useEffect(() => {
		if (!ido?.idoAddress) return;
		console.log("initalize presale");
		dispatch(idoPresaleContractAction());
	}, [ido?.idoAddress, currentChainId, dispatch]);

	// useEffect(() => {
	// 	if (!_idoFactoryContract) return;
	// 	// const createdListionar = _idoFactoryContract.events.IdoCreated();
	// 	console.log("_idoFactoryContract", _idoFactoryContract);
	// 	// setIdoCreateListionar(createdListionar);
	// }, [_idoFactoryContract]);

	//idopresale
	// useEffect(() => {
	// 	if (!_idoPresaleContract) return;
	// 	const createdListionar = _idoPresaleContract.events.IdoUpdated();
	// 	// const tokenDepositedLisner =
	// 	_idoPresaleContract.events.TokenDeposited({}, (error, event) => {
	// 		console.log("errordiff", error);
	// 		console.log("eventdiff", event);
	// 	});

	// 	setIdoUpdateListionar(createdListionar);
	// 	// setTokenDepositedLisner(tokenDepositedLisner);
	// }, [_idoPresaleContract]);

	//buy
	// useEffect(() => {
	// 	if (!tokenDepositedListner) return;
	// 	tokenDepositedListner.on("data", cb);

	// 	return () => {
	// 		tokenDepositedListner?.off("data", cb);
	// 	};
	// }, [tokenDepositedListner]);

	//update
	// useEffect(() => {
	// 	if (!idoUpdateListinar) return;
	// 	idoUpdateListinar.on("data", updateIdoinDb);

	// 	return () => {
	// 		console.log("call cleanup");
	// 		idoUpdateListinar?.off("data", updateIdoinDb);
	// 	};
	// }, [idoUpdateListinar, updateIdoinDb]);

	//shoude be remove
	//ceate

	// useEffect(() => {
	// 	if (!idoCreateListinar) return;
	// 	idoCreateListinar.on("data", createIdoinDb);

	// 	return () => {
	// 		idoCreateListinar?.off("data", createIdoinDb);
	// 	};
	// }, [idoCreateListinar, createIdoinDb]);

	return children;
};

export default Initalization;
