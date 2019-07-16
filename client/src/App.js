import React from "react";
import Translator from "./components/Translator";
import Translations from "./containers/Translations";
import "./App.css";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>Pig Latin Translator</h1>
			</header>
			<Translator />
			<Translations />
		</div>
	);
}

export default App;
