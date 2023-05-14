import { Wrapper } from "../styling/Wrappers";
import SliderNew from "../smallerComponents/SliderNew";
import { H2 } from "../styling/TextStyles";
import { useState } from "react";

const NoiseModule = ({ handleNoiseVolume }) => {
	// const [svgAmp, setSvgAmp] = useState(90);

	// const handleSvgAmp = (e) => {
	// 	setSvgAmp(parseFloat(e.target.value) + 90);
	// 	console.log(svgAmp);
	// };

	return (
		<Wrapper>
			<H2 textColor="#935FA7">Noise</H2>

			<SliderNew
				label={"Volume"}
				min={0}
				max={1}
				defaultValue={0.0001}
				steps={0.0001}
				onChange={handleNoiseVolume}
				sliderColor="#935FA7"
			/>
		</Wrapper>
	);
};

export default NoiseModule;
