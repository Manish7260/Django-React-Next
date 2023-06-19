const OtpInput = (props) => {
	const {
		size = 6,
		validationPattern = /[0-9]{1}/,
		value,
		onChange,
		className,
		...restProps
	} = props;
	const arr = new Array(size).fill("-");

	const handleInputChange = (e, index) => {
		const elem = e.target;
		const val = e.target.value;

		if (!validationPattern.test(val) && val !== "") return;

		const valueArr = value.split("");
		valueArr[index] = val;
		const newVal = valueArr.join("").slice(0, size);
		onChange(newVal);
		if (val) {
			const next = elem.nextElementSibling;
			next?.focus();
		}
	};

	const handleKeyUp = (e) => {
		const current = e.currentTarget;
		if (e.key === "ArrowLeft" || e.key === "Backspace") {
			const prev = current.previousElementSibling;
			prev?.focus();
			prev?.setSelectionRange(0, 1);
			return;
		}
		if (e.key === "ArrowRight") {
			const prev = current.nextSibling;
			prev?.focus();
			prev?.setSelectionRange(0, 1);
			return;
		}
	};

	const handlePaste = (e) => {
		e.preventDefault();
		const val = e.clipboardData.getData("text").substring(0, size);
		if (val && val?.match(/[0-9]/)) onChange(val);
	};

	return (
		<>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				{arr.map((_, index) => {
					return (
						<input
							style={{ width: "10%" }}
							key={index}
							{...restProps}
							className={
								className ||
								`input input-bordered px-0 text-center`
							}
							type="text"
							onChange={(e) => handleInputChange(e, index)}
							onKeyUp={handleKeyUp}
							onPaste={handlePaste}
							inputMode="numeric"
							autoComplete="one-time-code"
							pattern={validationPattern.source}
							maxLength={6}
							value={value.at(index) ?? ""}
						/>
					);
				})}
			</div>
		</>
	);
};

export default OtpInput;
