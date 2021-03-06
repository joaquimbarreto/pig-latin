class translationsAPI {
	static init() {
		process.env.REACT_APP_STAGE === "dev"
			? (this.base_URL = "http://localhost:3001")
			: (this.base_URL = "https://www.piglatin.app");
	}
	static async translations() {
		const res = await fetch(this.base_URL + "/translations");
		return await res.json();
	}

	static deleteTranslation(id) {
		return fetch(this.base_URL + "/delete_translation", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ id })
		});
	}

	static async createTranslation(translation) {
		const res = await fetch(this.base_URL + "/create_translation", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(translation)
		});
		return await res.json();
	}
}

translationsAPI.init();

export default translationsAPI;
