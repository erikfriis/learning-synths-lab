import styled from "styled-components";
import { Wrapper } from "./Wrappers";

const StyledSLider = styled.input.attrs((props) => ({
	type: "range",
	min: props.min || 0,
	max: props.max || 30,
	defaultValue: props.defaultValue || 30,
	step: props.steps || 5,
}))`
	-webkit-appearance: none;
	width: 8rem;
	height: 2px;
	background: #e9e9e9;
	border-radius: 5px;
	outline: none;
	border: none;

	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		background: white;
		border: solid 2px ${(props) => props.sliderColor};
		width: 16px;
		height: 16px;
		border-radius: 50%;
		cursor: pointer;
	}
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const Label = styled.label`
	font-size: 0.8rem;
	margin-bottom: 0.5rem;
`;

//Slider is imported into all mdules and controlls the different values

const Slider = ({
	min,
	max,
	defaultValue,
	steps,
	label,
	handleAttackChange,
	handleDecayChange,
	handleSustainChange,
	handleReleaseChange,
	FilterCutoffChange,
	FilterQChange,
	handleSawDetuneFineChange,
	handleSawDetuneCoarseChange,
	handleSineDetuneFineChange,
	handleSineDetuneCoarseChange,
	handleDistWet,
	handleDistAmount,
	handleChorusFreq,
	handleChorusDelayTime,
	handleChorusDepth,
	handleReverbWet,
	handleReverbDecay,
	handleDelayWet,
	handleDelayFeedback,
	handleNoiseVolume,
	sliderColor,
	handleSvgAttack,
	handleSvgAmp,
}) => {
	return (
		<Wrapper>
			<Container>
				<Label>{label}</Label>
				<StyledSLider
					min={min}
					max={max}
					defaultValue={defaultValue}
					steps={steps}
					label={label}
					sliderColor={sliderColor}
					onChange={
						label === "Sustain"
							? handleSustainChange
							: label === "Release"
							? handleReleaseChange
							: label === "Attack"
							? handleAttackChange
							: label === "Decay"
							? handleDecayChange
							: label === "Cutoff"
							? FilterCutoffChange
							: label === "Q"
							? FilterQChange
							: label === "Detune Fine"
							? handleSawDetuneFineChange
							: label === "Detune Coarse"
							? handleSawDetuneCoarseChange
							: label === "Detune Fine Sine"
							? handleSineDetuneFineChange
							: label === "Detune Coarse Sine"
							? handleSineDetuneCoarseChange
							: label === "Dist Dry/Wet"
							? handleDistWet
							: label === "Dist Amount"
							? handleDistAmount
							: label === "Chorus Frequency"
							? handleChorusFreq
							: label === "Chorus Delay Time"
							? handleChorusDelayTime
							: label === "Chorus Depth"
							? handleChorusDepth
							: label === "Reverb Dry/Wet"
							? handleReverbWet
							: label === "Reverb Decay"
							? handleReverbDecay
							: label === "Delay Dry/Wet"
							? handleDelayWet
							: label === "Delay Feedback"
							? handleDelayFeedback
							: handleNoiseVolume
					}
				/>
			</Container>
		</Wrapper>
	);
};

export default Slider;
