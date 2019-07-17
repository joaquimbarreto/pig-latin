import React, { useState, useEffect } from "react";
import translationsAPI from "../translationsAPI";

const Translator = () => {
	const [input, setInput] = useState("");
	const [translation, setTranslation] = useState("");

	const handleInput = event => {
		setInput(event.target.value);
	};

	const translator = () => {
		const pigLatin = input.replace(/\b(\w)(\w+)\b/g, function(match, p1, p2) {
			if (/[aeiou]/i.test(p1)) {
				return (p2 = match + "way");
			}
			if (/[A-Z]/.test(p1)) {
				p2 = p2.replace(/^\w/, function(x) {
					return x.toUpperCase();
				});
				return p2 + p1.toLowerCase() + "ay";
			} else {
				return p2 + p1 + "ay";
			}
		});
		return setTranslation(pigLatin);
	};

	useEffect(() => {
		translator();
	});

	const handleSave = () => {
		translationsAPI.createTranslation({
			input,
			pig_latin: translation
		});
	};

	return (
		<div className="translator">
			<div className="input-translation">
				<div className="user-input">
					<label>Input</label>
					<textarea
						input="text"
						placeholder="input text here"
						onChange={handleInput}
					/>
				</div>
				<div className="pig-latin-translation">
					<label>Translation</label>
					<textarea value={translation} readOnly />
				</div>
			</div>
			<div>
				<button onClick={handleSave}>Save Translation</button>
			</div>
		</div>
	);
};

export default Translator;
