import SliderNew from "../smallerComponents/SliderNew";
import { Wrapper } from "../styling/Wrappers";
import { H2 } from "../styling/TextStyles";
import WaveSelector from "../smallerComponents/WaveSelector";

const SawOscModule = ({
	handleSawDetuneFineChange,
	handleSawDetuneCoarseChange,
	handleOscTypeChange,
	oscOneWave,
}) => {
	return (
		<Wrapper>
			<H2 textColor="#935FA7">Oscillator 1</H2>
			<WaveSelector
				handleOscTypeChange={handleOscTypeChange}
				oscOneWave={oscOneWave}
			></WaveSelector>
			<SliderNew
				label={"Detune"}
				min={0}
				max={500}
				defaultValue={0.0001}
				steps={1}
				onChange={handleSawDetuneFineChange}
				sliderColor="#935FA7"
			/>
			<SliderNew
				label={"Transpose"}
				min={0}
				max={1200}
				defaultValue={0}
				steps={100}
				onChange={handleSawDetuneCoarseChange}
				sliderColor="#935FA7"
			/>
		</Wrapper>
	);
};

export default SawOscModule;
