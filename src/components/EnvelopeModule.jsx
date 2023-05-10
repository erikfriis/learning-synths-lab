import { Wrapper } from "./Wrappers";
import Slider from "./Slider";
import { H2 } from "./TextStyles";
import { useState } from "react";

const EnvelopeModule = ({
	handleAttackChange,
	handleDecayChange,
	handleSustainChange,
	handleReleaseChange,
	attack,
	decay,
	sustain,
	release,
}) => {
	const [svgAttack, setSvgAttack] = useState(100);
	const [svgRelease, setRelease] = useState(150);

	const handleSvgAttack = (e) => {
		setSvgAttack(e.target.value * 20);
	};
	const handleSvgRelease = (e) => {
		setRelease(e.target.value * 20);
	};

	return (
		<Wrapper>
			<H2 textColor="#77e38e">Envelope</H2>
			<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
				<path d={`M ${svgAttack} 150 L 100 0`} stroke="orange" fill="#77e38e" />

				<path d="M 100 0 L 200 100" stroke="black" fill="#77e38e" />

				<path d="M 200 100 L 300 100" stroke="red" fill="#77e38e" />

				<path
					d={`"M 300 100 L 400 ${svgRelease}"`}
					stroke="blue"
					fill="#77e38e"
				/>
				<path
					d={`M ${svgAttack} 150 L 100 0 L 200 100 L 300 100 L 400 150 Z`}
					fill="#77e38e"
				/>
			</svg>
			<Slider
				label={"Attack"}
				min={0}
				max={5}
				defaultValue={attack}
				steps={0.1}
				handleAttackChange={handleAttackChange}
				handleSvgAttack={handleSvgAttack}
				sliderColor="#77e38e"
			/>
			<Slider
				label={"Decay"}
				min={0.1}
				max={5}
				defaultValue={decay}
				steps={0.1}
				handleDecayChange={handleDecayChange}
				sliderColor="#77e38e"
			/>
			<Slider
				label={"Sustain"}
				min={0}
				max={1}
				defaultValue={sustain}
				steps={0.01}
				handleSustainChange={handleSustainChange}
				sliderColor="#77e38e"
			/>
			<Slider
				label={"Release"}
				min={0}
				max={5}
				defaultValue={release}
				steps={0.1}
				handleReleaseChange={handleReleaseChange}
				handleSvgRelease={handleSvgRelease}
				sliderColor="#77e38e"
			/>
		</Wrapper>
	);
};

export default EnvelopeModule;
