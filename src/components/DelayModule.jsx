import { Wrapper } from "./Wrappers";
import Slider from "./Slider";
import { H2 } from "./TextStyles";

const DelayModule = ({ handleDelayWet, handleDelayFeedback }) => {
	return (
		<Wrapper>
			<H2 textColor="#f3ca7e">Delay</H2>
			<Slider
				label={"Delay Dry/Wet"}
				min={0}
				max={1}
				defaultValue={0.0001}
				steps={0.01}
				handleDelayWet={handleDelayWet}
				sliderColor="#f3ca7e"
			/>
			<Slider
				label={"Delay Feedback"}
				min={0}
				max={0.9}
				defaultValue={0.001}
				steps={0.1}
				handleDelayFeedback={handleDelayFeedback}
				sliderColor="#f3ca7e"
			/>
		</Wrapper>
	);
};

export default DelayModule;
