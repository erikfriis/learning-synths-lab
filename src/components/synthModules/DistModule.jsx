import { Wrapper } from "../styling/Wrappers";
import SliderNew from "../smallerComponents/SliderNew";
import { H2 } from "../styling/TextStyles";

const DistModule = ({ handleDistWet, handleDistAmount }) => {
	return (
		<Wrapper>
			<H2 textColor="#f3ca7e">Distortion</H2>
			<SliderNew
				label={"Dry/Wet"}
				min={0}
				max={1}
				defaultValue={0.001}
				steps={0.01}
				onChange={handleDistWet}
				sliderColor="#f3ca7e"
			/>
			<SliderNew
				label={"Ditortion"}
				min={0}
				max={1}
				defaultValue={0.0001}
				steps={0.0001}
				onChange={handleDistAmount}
				sliderColor="#f3ca7e"
			/>
		</Wrapper>
	);
};

export default DistModule;
