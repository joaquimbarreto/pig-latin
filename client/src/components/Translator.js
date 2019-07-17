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
		<div>
			<input
				input="text"
				placeholder="input text here"
				onChange={handleInput}
			/>
			<p>{translation}</p>
			<button onClick={handleSave}>Save Translation</button>
		</div>
	);
};

export default Translator;
