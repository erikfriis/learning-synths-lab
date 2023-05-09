import Slider from "./Slider";
import { Wrapper } from "./Wrappers";
import { H2 } from "./TextStyles";
import WaveSelector from "./WaveSelector";

const SawOscModule = ({
	handleSawDetuneFineChange,
	handleSawDetuneCoarseChange,
	handleOscTypeChange,
}) => {
	return (
		<Wrapper>
			<H2 textColor="#935FA7">Saw Oscillator</H2>
			<WaveSelector handleOscTypeChange={handleOscTypeChange}></WaveSelector>
			<Slider
				label={"Detune Fine"}
				min={0}
				max={500}
				defaultValue={0}
				steps={1}
				handleSawDetuneFineChange={handleSawDetuneFineChange}
				sliderColor="#935FA7"
			/>
			<Slider
				label={"Detune Coarse"}
				min={0}
				max={1200}
				defaultValue={0}
				steps={100}
				handleSawDetuneCoarseChange={handleSawDetuneCoarseChange}
				sliderColor="#935FA7"
			/>
		</Wrapper>
	);
};

export default SawOscModule;
