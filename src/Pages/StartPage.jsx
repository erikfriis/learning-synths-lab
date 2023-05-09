import { NavLink } from "react-router-dom";
import { MainWrapper } from "../components/Wrappers";
import HomePageBox from "../components/HomePageBox";

const StartPage = () => {
	return (
		<MainWrapper>
			<NavLink to={"learning-synth-lab"}>
				<HomePageBox />
			</NavLink>
		</MainWrapper>
	);
};

export default StartPage;
