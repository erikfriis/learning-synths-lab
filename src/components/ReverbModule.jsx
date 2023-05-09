import { Wrapper } from "./Wrappers";
import Slider from "./Slider";
import { H2 } from "./TextStyles";

const ReverbModule = ({ handleReverbWet, handleReverbDecay }) => {
	return (
		<Wrapper>
			<H2 textColor="#f3ca7e">Reverb</H2>
			<Slider
				label={"Reverb Dry/Wet"}
				min={0}
				max={1}
				defaultValue={0.0001}
				steps={0.01}
				handleReverbWet={handleReverbWet}
				sliderColor="#f3ca7e"
			/>
			<Slider
				label={"Reverb Decay"}
				min={0}
				max={20}
				defaultValue={5}
				steps={0.1}
				handleReverbDecay={handleReverbDecay}
				sliderColor="#f3ca7e"
			/>
		</Wrapper>
	);
};

export default ReverbModule;
