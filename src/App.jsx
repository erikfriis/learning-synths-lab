import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./Pages/StartPage";
import LearningSynthsLab from "./Pages/LearningSynthsLab";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<StartPage />} />
				<Route path="/learning-synth-lab" element={<LearningSynthsLab />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
