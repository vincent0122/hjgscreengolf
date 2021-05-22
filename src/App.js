import {HashRouter, Route} from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./routes/Home";
import Game from "./routes/Game";
import View from "./routes/View";
import "./App.css";

function App() {
	return (
		<HashRouter>
			<Navigation />
			<Route path="/" exact={true} component={Home} />
			<Route path="/Game" component={Game} />
			<Route path="/View" component={View} />
		</HashRouter>
	);
}

export default App;
