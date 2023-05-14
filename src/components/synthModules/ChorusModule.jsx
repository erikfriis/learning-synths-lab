import { Wrapper } from "../styling/Wrappers";
import SliderNew from "../smallerComponents/SliderNew";
import { H2 } from "../styling/TextStyles";

const ChorusModule = ({
	handleChorusFreq,
	handleChorusDelayTime,
	handleChorusDepth,
}) => {
	return (
		<Wrapper>
			<H2 textColor="#f3ca7e">Chorus</H2>
			<SliderNew
				label={"Frequency"}
				min={0}
				max={1}
				defaultValue={0.001}
				steps={0.1}
				onChange={handleChorusFreq}
				sliderColor="#f3ca7e"
			/>
			<SliderNew
				label={"Delay Time"}
				min={0}
				max={1}
				defaultValue={0.001}
				steps={0.00001}
				onChange={handleChorusDelayTime}
				sliderColor="#f3ca7e"
			/>
			<SliderNew
				label={"Depth"}
				min={0}
				max={1}
				defaultValue={0.001}
				steps={0.0001}
				onChange={handleChorusDepth}
				sliderColor="#f3ca7e"
			/>
		</Wrapper>
	);
};

export default ChorusModule;
