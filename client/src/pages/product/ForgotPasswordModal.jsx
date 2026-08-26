import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import "./ForgotPasswordModal.css";

const ForgotPasswordModal = ({ show, onHide, onSelect }) => {
	const [selectedOption, setSelectedOption] = useState("");
	const [inputValue, setInputValue] = useState(""); // string for privateKey, array for seed
	const [showPassword, setShowPassword] = useState(false);
	const inputRefs = useRef([]); // refs to each seed input box

	// Reset inputs when modal opens/closes
	useEffect(() => {
		setSelectedOption("");
		setInputValue("");
		setShowPassword(false);
	}, [show]);

	const handleSelect = () => {
		if (!selectedOption) {
			alert("Please select a recovery method");
			return;
		}

		if (
			(selectedOption === "privateKey" && !inputValue) ||
			(selectedOption === "seed" && !inputValue.trim())
		) {
			alert(
				`Please enter your ${selectedOption === "privateKey" ? "Private Key" : "Seed"
				}`
			);
			return;
		}

		onSelect({
			method: selectedOption,
			value:
				selectedOption === "seed"
					? inputValue.trim()
					: inputValue,
		});
		onHide();
	};

	// Handle radio change
	const handleOptionChange = (value) => {
		setSelectedOption(value);
		if (value === "seed") setInputValue("");
		else setInputValue("");
		setShowPassword(false);
	};

	return (
		<Modal
			show={show}
			onHide={onHide}
			centered
			dialogClassName="forgotPasswordDialog"
		>
			<Modal.Body className="forgotPasswordBody">
				<h4>Recover Wallet</h4>
				<p>Select a recovery method:</p>

				<div className="radioOptions">
					<label>
						<input
							type="radio"
							name="recoveryOption"
							value="privateKey"
							checked={selectedOption === "privateKey"}
							onChange={() => handleOptionChange("privateKey")}
						/>
						PrivateKey
					</label>

					<label>
						<input
							type="radio"
							name="recoveryOption"
							value="seed"
							checked={selectedOption === "seed"}
							onChange={() => handleOptionChange("seed")}
						/>
						Seed
					</label>
				</div>

				{/* Conditional Inputs */}
				{selectedOption === "privateKey" && (
					<div className="unlockInput mb-3">
						<i className="bi bi-lock"></i>
						<input
							type={showPassword ? "text" : "password"}
							placeholder="Enter Private Key"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>
						<span
							className="passwordEye"
							onClick={() => setShowPassword(!showPassword)}
						>
							<i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"}></i>
						</span>
					</div>
				)}



				{selectedOption === "seed" && (
					<div className="seedInputContainer mb-3">
						<textarea
							className="seedTextarea"
							placeholder="Enter Seed Phrase"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							rows={4}
						/>
					</div>
				)}

				<button className="unlockBtn mt-2" onClick={handleSelect}>
					Recover password
				</button>
			</Modal.Body>
		</Modal>
	);
};

export default ForgotPasswordModal;