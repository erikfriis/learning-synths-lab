import * as Tone from "tone";
import styled from "styled-components";
import { MainWrapper } from "./Wrappers";
import { useState, useEffect } from "react";
import EnvelopeModule from "./EnvelopeModule";
import FilterModule from "./FilterModule";
import SawOscModule from "./SawOscModule";
import SineOscModule from "./SineOscModule";
import DistModule from "./DistModule";
import ChorusModule from "./ChorusModule";
import ReverbModule from "./ReverbModule";
import DelayModule from "./DelayModule";
import NoiseModule from "./NoiseModule";
import Indicator from "./Indicator";

const Btn = styled.button`
	padding: 0 3rem;
	margin: 3rem;
`;

const SynthTest = () => {
	const [synth, setSynth] = useState(null);
	const [synthOsc, setSynthOsc] = useState(null);
	const [noise, setNoise] = useState(null);
	const [oscOneWave, setOscOneWave] = useState("sawtooth");
	const [filter, setFilter] = useState(null);
	const [freqEnvelope, setFreqEnvelope] = useState(null);
	const [pressedKeys, setPressedKeys] = useState([]);
	const [attack, setAttack] = useState(0.01);
	const [decay, setDecay] = useState(0.1);
	const [sustain, setSustain] = useState(1);
	const [release, setRelease] = useState(1.0);
	const [filterCutoff, setFilterCutoff] = useState(20000);
	const [filterQ, setFilterQ] = useState(0);
	const [sawDetuneFine, setSawDetuneFine] = useState(0);
	const [sawDetuneCoarse, setSawDetuneCoarse] = useState(0);
	const [sineDetuneCoarse, setSineDetuneCoarse] = useState(0);
	const [sineDetuneFine, setSineDetuneFine] = useState(0);
	const [dist, setDist] = useState(null);
	const [chorus, setChorus] = useState(null);
	const [reverb, setReverb] = useState(null);
	const [pingPongDelay, setPingPongDelay] = useState(null);
	const [isKeyPressed, setIsKeyPressed] = useState(false);

	//create the synth on mount

	useEffect(() => {
		const gainNode = new Tone.Gain(0.3).toDestination();

		const filterNode = new Tone.Filter({
			type: "lowpass",
			frequency: filterCutoff,
			rolloff: -24,
			Q: filterQ,
		}).connect(gainNode);

		const dist = new Tone.Distortion(0.8).connect(filterNode);

		dist.set({ wet: 0 });

		const chorus = new Tone.Chorus(4, 2.5, 0.5).connect(dist).start();

		const reverb = new Tone.Reverb({ wet: 0, decay: 5 }).connect(chorus);

		const pingPong = new Tone.PingPongDelay("4n").connect(reverb);

		pingPong.set({ wet: 0 });
		pingPong.set({ feedback: 0 });
		pingPong.set({ delayTime: 0.2 });

		const noise = new Tone.Noise("white").connect(pingPong);

		noise.set({ volume: -50 });

		//set up oscillator one

		const synth = new Tone.MonoSynth({
			oscillator: {
				type: oscOneWave,
			},
			detune: -1200,
			envelope: {
				attack: attack,
				decay: decay,
				sustain: sustain,
				release: release,
				releaseCurve: "exponential",
			},
			// filterEnvelope: {
			// 	attack: 0.001,
			// 	decay: 0,
			// 	sustain: 1.0,
			// 	release: 0.8,
			// },
		}).connect(pingPong);

		//set up oscillator two

		const synthOsc = new Tone.MonoSynth({
			oscillator: {
				type: "sine",
			},

			detune: -2400,

			envelope: {
				attack: attack,
				decay: decay,
				sustain: sustain,
				release: release,
				releaseCurve: "exponential",
			},
			filterEnvelope: {
				attack: 0.001,
				decay: 0,
				sustain: 1.0,
				release: 0.8,
			},
		}).connect(pingPong);

		setSynth(synth);
		setSynthOsc(synthOsc);
		setNoise(noise);
		setFilter(filterNode);
		setFreqEnvelope(freqEnvelope);
		setDist(dist);
		setChorus(chorus);
		setReverb(reverb);
		setPingPongDelay(pingPong);

		return () => {
			synth.dispose();
			synthOsc.dispose();
			noise.dispose();
		};
	}, [oscOneWave]);

	//Handle attack on keydown event

	const handleKeyDown = (event) => {
		if (synth && event.keyCode >= 65 && event.keyCode <= 90) {
			const noteMap = {
				A: "C4",
				W: "C#4",
				S: "D4",
				E: "D#4",
				D: "E4",
				F: "F4",
				T: "F#4",
				G: "G4",
				Y: "G#4",
				H: "A4",
				U: "A#4",
				J: "B4",
				K: "C5",
				O: "C#5",
				L: "D5",
				P: "D#5",
			};

			const note = noteMap[event.key.toUpperCase()];
			if (!pressedKeys.includes(note)) {
				setPressedKeys([...pressedKeys, note]);

				synth.triggerAttack(note);
				synthOsc.triggerAttack(note);
				noise.start();
				setIsKeyPressed(true);
			}
		}
	};

	//Handle release on keyup event

	const handleKeyUp = (event) => {
		const noteMap = {
			A: "C4",
			W: "C#4",
			S: "D4",
			E: "D#4",
			D: "E4",
			F: "F4",
			T: "F#4",
			G: "G4",
			Y: "G#4",
			H: "A4",
			U: "A#4",
			J: "B4",
			K: "C5",
			O: "C#5",
			L: "D5",
			P: "D#5",
		};
		const note = noteMap[event.key.toUpperCase()];
		const index = pressedKeys.indexOf(note);
		if (index !== -1) {
			const newPressedKeys = [...pressedKeys];
			newPressedKeys.splice(index, 1);
			setPressedKeys(newPressedKeys);
			if (newPressedKeys.length === 0) {
				synth.triggerRelease();
				synthOsc.triggerRelease();
				noise.stop();
				setIsKeyPressed(false);
			}
		}
	};

	//Slider event handlers

	const handleAttackChange = (event) => {
		setAttack(event.target.value);
		if (synth) {
			synth.set({ envelope: { attack: event.target.value } });
		}
		if (synthOsc) {
			synthOsc.set({ envelope: { attack: event.target.value } });
		}
	};

	const handleDecayChange = (event) => {
		setDecay(parseFloat(event.target.value));
		if (synth) {
			synth.set({ envelope: { decay: event.target.value } });
		}
		if (synthOsc) {
			synthOsc.set({ envelope: { decay: event.target.value } });
		}
	};

	const handleSustainChange = (event) => {
		setSustain(parseFloat(event.target.value));
		if (synth) {
			synth.set({ envelope: { sustain: event.target.value } });
		}
		if (synthOsc) {
			synthOsc.set({ envelope: { sustain: event.target.value } });
		}
	};

	const handleReleaseChange = (event) => {
		setRelease(parseFloat(event.target.value));
		if (synth) {
			synth.set({ envelope: { release: event.target.value * 2 } });
		}
		if (synthOsc) {
			synthOsc.set({ envelope: { release: event.target.value * 2 } });
		}
	};

	const FilterCutoffChange = (event) => {
		setFilterCutoff(parseFloat(event.target.value));

		if (filter) {
			filter.set({ frequency: event.target.value });
		}
	};

	const FilterQChange = (event) => {
		setFilterQ(parseFloat(event.target.value));

		if (filter) {
			filter.set({ Q: event.target.value });
		}
	};

	const handleSawDetuneFineChange = (event) => {
		setSawDetuneFine(Number(event.target.value));

		if (synth) {
			synth.set({
				detune: Number(event.target.value) + sawDetuneCoarse - 1200,
			});
		}
	};

	const handleSawDetuneCoarseChange = (event) => {
		setSawDetuneCoarse(Number(event.target.value));
		if (synth) {
			synth.set({ detune: Number(event.target.value) + sawDetuneFine - 1200 });
		}
	};

	const handleSineDetuneFineChange = (event) => {
		setSineDetuneFine(Number(event.target.value));

		if (synth) {
			synthOsc.set({
				detune: Number(event.target.value) + sineDetuneCoarse - 2400,
			});
		}
	};

	const handleSineDetuneCoarseChange = (event) => {
		setSineDetuneCoarse(Number(event.target.value));
		console.log(sineDetuneFine);
		if (synth) {
			synthOsc.set({
				detune: Number(event.target.value) + sineDetuneFine - 2400,
			});
		}
	};

	const handleDistWet = (event) => {
		if (synth) {
			dist.set({
				wet: Number(event.target.value),
			});
		}
	};

	const handleDistAmount = (event) => {
		if (synth) {
			dist.set({
				distortion: Number(event.target.value),
			});
		}
	};

	const handleChorusFreq = (event) => {
		if (synth) {
			chorus.set({
				frequency: Number(event.target.value),
			});
		}
	};
	const handleChorusDelayTime = (event) => {
		if (synth) {
			chorus.set({
				delayTime: Number(event.target.value),
			});
		}
	};
	const handleChorusDepth = (event) => {
		if (synth) {
			chorus.set({
				depth: Number(event.target.value),
			});
		}
	};
	const handleReverbWet = (event) => {
		if (synth) {
			reverb.set({
				wet: Number(event.target.value),
			});
		}
	};
	const handleReverbDecay = (event) => {
		if (synth) {
			reverb.set({
				decay: Number(event.target.value),
			});
		}
	};
	const handleDelayWet = (event) => {
		if (synth) {
			pingPongDelay.set({
				wet: Number(event.target.value),
			});
		}
	};
	const handleDelayFeedback = (event) => {
		if (synth) {
			pingPongDelay.set({
				feedback: Number(event.target.value),
			});
		}
	};
	const handleNoiseVolume = (event) => {
		if (synth) {
			noise.set({
				volume: Number(event.target.value),
			});
		}
	};

	const handleClickChangeWave = (event) => {
		if (event.target.value === sawtooth) {
			synth.set({ oscillator: { type: sawtooth } });
		}
		if (event.target.value === square) {
			synth.set({ oscillator: { type: square } });
		}
		if (event.target.value === sine) {
			synth.set({ oscillator: { type: sine } });
		}
	};

	const handleOscTypeChange = (type) => {
		setOscOneWave(type);
		console.log(oscOneWave);
	};

	const startSynth = async () => {
		await Tone.start();
		console.log("context started");
	};

	return (
		<MainWrapper onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
			<Btn onClick={startSynth}>Start</Btn>
			<Indicator isKeyPressed={isKeyPressed}></Indicator>
			<SawOscModule
				handleSawDetuneFineChange={handleSawDetuneFineChange}
				handleSawDetuneCoarseChange={handleSawDetuneCoarseChange}
				handleOscTypeChange={handleOscTypeChange}
			></SawOscModule>
			<SineOscModule
				handleSineDetuneFineChange={handleSineDetuneFineChange}
				handleSineDetuneCoarseChange={handleSineDetuneCoarseChange}
			></SineOscModule>
			<NoiseModule handleNoiseVolume={handleNoiseVolume}></NoiseModule>
			<EnvelopeModule
				handleAttackChange={handleAttackChange}
				handleDecayChange={handleDecayChange}
				handleSustainChange={handleSustainChange}
				handleReleaseChange={handleReleaseChange}
				attack={attack}
				decay={decay}
				sustain={sustain}
				release={release}
			></EnvelopeModule>
			<FilterModule
				FilterCutoffChange={FilterCutoffChange}
				FilterQChange={FilterQChange}
			></FilterModule>
			<DistModule
				handleDistWet={handleDistWet}
				handleDistAmount={handleDistAmount}
			></DistModule>
			<ChorusModule
				handleChorusFreq={handleChorusFreq}
				handleChorusDelayTime={handleChorusDelayTime}
				handleChorusDepth={handleChorusDepth}
			></ChorusModule>
			<ReverbModule
				handleReverbWet={handleReverbWet}
				handleReverbDecay={handleReverbDecay}
			></ReverbModule>
			<DelayModule
				handleDelayWet={handleDelayWet}
				handleDelayFeedback={handleDelayFeedback}
			></DelayModule>
		</MainWrapper>
	);
};

export default SynthTest;
