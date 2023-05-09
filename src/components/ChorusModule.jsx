import { Wrapper } from "./Wrappers";
import Slider from "./Slider";
import { H2 } from "./TextStyles";

const ChorusModule = ({
	handleChorusFreq,
	handleChorusDelayTime,
	handleChorusDepth,
}) => {
	return (
		<Wrapper>
			<H2 textColor="#f3ca7e">Chorus</H2>
			<Slider
				label={"Chorus Frequency"}
				min={0}
				max={20}
				defaultValue={0.001}
				steps={0.1}
				handleChorusFreq={handleChorusFreq}
				sliderColor="#f3ca7e"
			/>
			<Slider
				label={"Chorus Delay Time"}
				min={0}
				max={5}
				defaultValue={0.001}
				steps={0.1}
				handleChorusDelayTime={handleChorusDelayTime}
				sliderColor="#f3ca7e"
			/>
			<Slider
				label={"Chorus Depth"}
				min={0}
				max={1}
				defaultValue={0.002}
				steps={0.01}
				handleChorusDepth={handleChorusDepth}
				sliderColor="#f3ca7e"
			/>
		</Wrapper>
	);
};

export default ChorusModule;
