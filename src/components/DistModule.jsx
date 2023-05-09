import { Wrapper } from "./Wrappers";
import Slider from "./Slider";
import { H2 } from "./TextStyles";

const DistModule = ({ handleDistWet, handleDistAmount }) => {
	return (
		<Wrapper>
			<H2 textColor="#f3ca7e">Distortion</H2>
			<Slider
				label={"Dist Dry/Wet"}
				min={0}
				max={1}
				defaultValue={0.001}
				steps={0.01}
				handleDistWet={handleDistWet}
				sliderColor="#f3ca7e"
			/>
			<Slider
				label={"Dist Amount"}
				min={0}
				max={1}
				defaultValue={0.8}
				steps={0.01}
				handleDistAmount={handleDistAmount}
				sliderColor="#f3ca7e"
			/>
		</Wrapper>
	);
};

export default DistModule;
