import Slider from "./Slider";
import { Wrapper } from "./Wrappers";
import { H2 } from "./TextStyles";
import WaveSelector from "./WaveSelector";

const SineOscModule = ({
	handleSineDetuneCoarseChange,
	handleSineDetuneFineChange,
}) => {
	return (
		<Wrapper>
			<H2 textColor="#935FA7">Sine Oscillator</H2>
			<WaveSelector></WaveSelector>
			<Slider
				label={"Detune Fine Sine"}
				min={0}
				max={500}
				defaultValue={0}
				steps={1}
				handleSineDetuneFineChange={handleSineDetuneFineChange}
				sliderColor="#935FA7"
			/>
			<Slider
				label={"Detune Coarse Sine"}
				min={0}
				max={1200}
				defaultValue={0}
				steps={100}
				handleSineDetuneCoarseChange={handleSineDetuneCoarseChange}
				sliderColor="#935FA7"
			/>
		</Wrapper>
	);
};

export default SineOscModule;
