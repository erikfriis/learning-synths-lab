import { Wrapper } from "../styling/Wrappers";
import SliderNew from "../smallerComponents/SliderNew";
import { H2 } from "../styling/TextStyles";

const ReverbModule = ({ handleReverbWet, handleReverbDecay }) => {
	return (
		<Wrapper>
			<H2 textColor="#f3ca7e">Reverb</H2>
			<SliderNew
				label={"Dry/Wet"}
				min={0}
				max={1}
				defaultValue={0.00001}
				steps={0.00001}
				onChange={handleReverbWet}
				sliderColor="#f3ca7e"
			/>
			<SliderNew
				label={"Decay"}
				min={0}
				max={1}
				defaultValue={0.00001}
				steps={0.0001}
				onChange={handleReverbDecay}
				sliderColor="#f3ca7e"
			/>
		</Wrapper>
	);
};

export default ReverbModule;
