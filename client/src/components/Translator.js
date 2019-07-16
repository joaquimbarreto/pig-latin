import React, { useState, useEffect } from "react";

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
			return p2 + p1 + "ay";
		});
		return setTranslation(pigLatin);
	};

	useEffect(() => {
		translator();
	});

	return (
		<div>
			<input
				input="text"
				placeholder="input text here"
				onChange={handleInput}
			/>
			<p>{translation}</p>
		</div>
	);
};

export default Translator;
