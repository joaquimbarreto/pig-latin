import React, { useState, useEffect } from "react";
import translationsAPI from "../translationsAPI";

const Translations = () => {
	const [translations, setTranslations] = useState([]);

	useEffect(() => {
		translationsAPI.translations().then(data => setTranslations(data));
	}, []);

	const handleDelete = id => {
		translationsAPI.deleteTranslation(id);
	};

	return (
		<div>
			<h2>List of Saved Translations</h2>
			<ul>
				{translations.map(translation => {
					return (
						<li>
							{translation}
							<button onClick={handleDelete}>Delete</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Translations;
