import { Wrapper } from "./Wrappers";
import Slider from "./Slider";
import { H2 } from "./TextStyles";
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

			{/* <svg viewBox="0 55 100 40" xmlns="http://www.w3.org/2000/svg">
				<path
					d={`M ${svgAmp},65 L ${svgAmp},10 L ${svgAmp},90 L 10,90 Z`}
					fill="#935FA7"
				/>
			</svg> */}

			<Slider
				label={"Noise Volume"}
				min={-80}
				max={-10}
				defaultValue={-79}
				steps={1}
				handleNoiseVolume={handleNoiseVolume}
				// handleSvgAmp={handleSvgAmp}
				sliderColor="#935FA7"
			/>
		</Wrapper>
	);
};

export default NoiseModule;
