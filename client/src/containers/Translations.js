import React, { useState, useEffect } from "react";
import translationsAPI from "../translationsAPI";
import "../App.css";

const Translations = () => {
	const [translations, setTranslations] = useState([]);
	// const [deleting, setDeleting] = useState(false);

	const getTranslations = () => {
		translationsAPI.translations().then(data => setTranslations(data));
	};

	useEffect(() => {
		getTranslations();
	}, []);

	// const handleDelete = id => {
	// 	translationsAPI.deleteTranslation(id);
	// };

	return (
		<div>
			<h2>List of Saved Translations</h2>
			<ul>
				{translations.map(translation => {
					return (
						<li>
							<div className="list-items">
								<p>{translation.input}</p>
								<p>{translation.pig_latin}</p>
								<button
								// onClick={handleDelete(translation.id)}
								>
									Delete
								</button>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Translations;
