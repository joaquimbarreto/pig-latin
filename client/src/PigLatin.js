import React, { useState, useEffect } from "react";
import translationsAPI from "./translationsAPI";
import "./App.css";

const PigLatin = ({ translations }) => {
	const [newTranslation, setNewTranslation] = useState([]);
	const [deleting, setDeleting] = useState(false);
	const [input, setInput] = useState("");
	const [pigLatin, setPigLatin] = useState("");

	const handleDelete = id => {
		translationsAPI.deleteTranslation(id);
	};

	const handleInput = event => {
		setInput(event.target.value);
	};

	const translator = () => {
		const translating = input.replace(/\b(\w)(\w+)\b/g, function(
			match,
			p1,
			p2
		) {
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
		return setPigLatin(translating);
	};

	useEffect(() => {
		translator();
	});

	const handleSave = () => {
		const newTransObj = {
			input,
			pig_latin: pigLatin
		};
		translationsAPI.createTranslation(newTransObj);
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
					<textarea value={pigLatin} readOnly />
				</div>
			</div>
			<div>
				<button onClick={handleSave}>Save Translation</button>
			</div>

			<h2>List of Saved Translations</h2>
			<ul>
				{translations.map(translation => {
					return (
						<li>
							<div className="list-items">
								<p>{translation.input}</p>
								<p>{translation.pig_latin}</p>
								<button onClick={handleDelete(translation.id)}>Delete</button>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default PigLatin;
