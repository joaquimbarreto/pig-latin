import React, { useState, useEffect } from "react";
import translationsAPI from "./translationsAPI";
import "./App.css";

const App = () => {
	const [translations, setTranslations] = useState([]);
	const [input, setInput] = useState("");
	const [pigLatin, setPigLatin] = useState("");

	const getTranslations = () => {
		translationsAPI.translations().then(data => setTranslations(data));
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
		getTranslations();
	});

	const handleSave = () => {
		const newTransObj = {
			input,
			pig_latin: pigLatin
		};
		translationsAPI.createTranslation(newTransObj);
	};

	const handleReset = () => {
		setInput("");
		setPigLatin("");
		document.getElementById("input").value = "";
		document.getElementById("pl-translation").value = "";
	};

	const handleDelete = id => {
		const filterTranslations = translations.filter(
			translation => translation.id !== id
		);
		setTranslations(filterTranslations);
		translationsAPI.deleteTranslation(id);
	};

	return (
		<div className="App">
			<header className="App-header">
				<h1>Pig Latin Translator</h1>
			</header>
			<div className="translator">
				<div className="input-translation">
					<div className="user-input">
						<label>Input</label>
						<textarea
							id="input"
							input="text"
							placeholder="input text here"
							onChange={handleInput}
						/>
					</div>
					<div className="pig-latin-translation">
						<label>Translation</label>
						<textarea id="pl-translation" value={pigLatin} readOnly />
					</div>
				</div>
				<div className="buttons">
					<button onClick={handleSave}>Save Translation</button>
					<button onClick={handleReset}>Reset</button>
				</div>
				<div className="saved">
					<h2>List of Saved Translations</h2>
				</div>
				<table style={{ width: "50%" }}>
					<tbody>
						<tr>
							<th>Input</th>
							<th>Translation</th>
							<th />
						</tr>
						{translations.map(translation => {
							return (
								<tr key={translation.id}>
									<td>{translation.input}</td>
									<td>{translation.pig_latin}</td>
									<td>
										<button onClick={() => handleDelete(translation.id)}>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default App;
