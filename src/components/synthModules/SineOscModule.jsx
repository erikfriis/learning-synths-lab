import SliderNew from "../smallerComponents/SliderNew";
import { Wrapper } from "../styling/Wrappers";
import { H2 } from "../styling/TextStyles";

const SineOscModule = ({
	handleSineDetuneCoarseChange,
	handleSineDetuneFineChange,
}) => {
	return (
		<Wrapper>
			<H2 textColor="#935FA7">Sine Oscillator</H2>

			<SliderNew
				label={"Detune"}
				min={0}
				max={500}
				defaultValue={0.0001}
				steps={1}
				onChange={handleSineDetuneFineChange}
				sliderColor="#935FA7"
			/>
			<SliderNew
				label={"Transpose"}
				min={0}
				max={1200}
				defaultValue={0}
				steps={100}
				onChange={handleSineDetuneCoarseChange}
				sliderColor="#935FA7"
			/>
		</Wrapper>
	);
};

export default SineOscModule;
