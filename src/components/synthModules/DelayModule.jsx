import { Wrapper } from "../styling/Wrappers";
import SliderNew from "../smallerComponents/SliderNew";
import { H2 } from "../styling/TextStyles";

const DelayModule = ({ handleDelayWet, handleDelayFeedback }) => {
	return (
		<Wrapper>
			<H2 textColor="#f3ca7e">Delay</H2>
			<SliderNew
				label={"Dry/Wet"}
				min={0}
				max={1}
				defaultValue={0.0001}
				steps={0.01}
				onChange={handleDelayWet}
				sliderColor="#f3ca7e"
			/>
			<SliderNew
				label={"Feedback"}
				min={0}
				max={1}
				defaultValue={0.0001}
				steps={0.0001}
				onChange={handleDelayFeedback}
				sliderColor="#f3ca7e"
			/>
		</Wrapper>
	);
};

export default DelayModule;
