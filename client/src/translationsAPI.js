class translationsAPI {
	static init() {
		process.env.REACT_APP_STAGE === "dev"
			? (this.base_URL = "http://localhost:3001")
			: (this.base_URL = "https://www.piglatin.app");
	}
	static translations() {
		return fetch(this.base_URL + "/translations").then(res => res.json());
	}

	static deleteTranslation(translation) {
		return fetch(this.base_URL + "/delete_translation", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ translation })
		});
	}

	static createTranslation(translation) {
		return fetch(this.base_URL + "/create_translation", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ translation })
		}).then(res => res.json());
	}
}

translationsAPI.init();

export default translationsAPI;
