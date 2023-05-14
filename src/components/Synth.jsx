import * as Tone from "tone";
import styled from "styled-components";
import { MainWrapper } from "./styling/Wrappers";
import { useState, useEffect, useRef } from "react";
import EnvelopeModule from "./synthModules/EnvelopeModule";
import FilterModule from "./synthModules/FilterModule";
import SawOscModule from "./synthModules/SawOscModule";
import SineOscModule from "./synthModules/SineOscModule";
import DistModule from "./synthModules/DistModule";
import ChorusModule from "./synthModules/ChorusModule";
import ReverbModule from "./synthModules/ReverbModule";
import DelayModule from "./synthModules/DelayModule";
import NoiseModule from "./synthModules/NoiseModule";
import Indicator from "./smallerComponents/Indicator";

import { curvefit3 } from "../utils/utils";

const Btn = styled.button`
	padding: 0 3rem;
	margin: 3rem;
`;

const Synth = () => {
	const [synth, setSynth] = useState(null);
	const [synthOsc, setSynthOsc] = useState(null);
	const [noise, setNoise] = useState(null);
	const [oscOneWave, setOscOneWave] = useState("sawtooth");
	const [pressedKeys, setPressedKeys] = useState([]);
	const [attack, setAttack] = useState(0.01);
	const [decay, setDecay] = useState(0.1);
	const [sustain, setSustain] = useState(1);
	const [release, setRelease] = useState(1.0);
	const [filterCutoff, setFilterCutoff] = useState(1);
	const [filterQ, setFilterQ] = useState(0);
	const [sawDetuneFine, setSawDetuneFine] = useState(0);
	const [sawDetuneCoarse, setSawDetuneCoarse] = useState(0);
	const [sineDetuneCoarse, setSineDetuneCoarse] = useState(0);
	const [sineDetuneFine, setSineDetuneFine] = useState(0);
	const [distWet, setDistWet] = useState(0);
	const [distAmount, setDistAmount] = useState(0);
	const [chorusFreq, setChorusFreq] = useState(0);
	const [chorusDelayTime, setChorusDelayTime] = useState(0);
	const [chorusDepth, setChorusDepth] = useState(0);
	const [reverbWet, setReverbWet] = useState(0);
	const [reverbDecay, setReverbDecay] = useState(0);
	const [delayWet, setDelayWet] = useState(0);
	const [delayFeedback, setDelayFeedback] = useState(0);
	const [noiseVolume, setNoiseVolume] = useState(0);

	const [isKeyPressed, setIsKeyPressed] = useState(false);

	const synthParams = useRef(null);

	//create the synth on mount and connect the chain

	useEffect(() => {
		const gainNode = new Tone.Gain(0.3).toDestination();

		const filterNode = new Tone.Filter({
			type: "lowpass",
			rolloff: -24,
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

		//set up oscillator one

		const synth = new Tone.MonoSynth({
			oscillator: {
				type: "sawtooth",
			},
			detune: -1200,
			envelope: {
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

		synthParams.current = {
			synth,
			synthOsc,
			noise,
			filterNode,
			dist,
			chorus,
			reverb,
			pingPong,
		};

		return () => {
			synth.dispose();
			synthOsc.dispose();
			noise.dispose();
		};
	}, []);

	useEffect(() => {
		//connect notes to keyboard
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

		//Handle attack on keydown event

		const handleKeyDown = (event) => {
			if (synth && event.keyCode >= 65 && event.keyCode <= 90) {
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

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [synth, pressedKeys, synthParams]);

	//Slider event handlers

	// Attack, Decay, Sustain, Release

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

	//handle filter cutoffchange

	const FilterCutoffChange = (event) => {
		setFilterCutoff(parseFloat(event.target.value));
	};

	useEffect(() => {
		if (synthParams.current.filterNode) {
			synthParams.current.filterNode.set({
				frequency: curvefit3(filterCutoff, 20, 1000, 20000),
			});
		}
	}, [filterCutoff]);

	//FIlter q

	const FilterQChange = (event) => {
		setFilterQ(parseFloat(event.target.value));
	};

	useEffect(() => {
		if (synthParams.current.filterNode) {
			synthParams.current.filterNode.set({
				Q: curvefit3(filterQ, 0.001, 2, 5),
			});
		}
	}, [filterQ]);

	//detune osc 1

	const handleSawDetuneFineChange = (event) => {
		setSawDetuneFine(Number(event.target.value));
	};

	useEffect(() => {
		if (synthParams.current.synth) {
			synthParams.current.synth.set({
				detune: curvefit3(sawDetuneFine, 0 - 1200, 250 - 1200, 500 - 1200),
			});
		}
	}, [sawDetuneFine]);

	//transpose osc 1

	const handleSawDetuneCoarseChange = (event) => {
		if (synth) {
			synth.set({
				detune: Number(event.target.value) + sawDetuneFine - 1200,
			});
		}
	};

	//detune sine osc

	const handleSineDetuneFineChange = (event) => {
		setSineDetuneFine(Number(event.target.value));
		if (synthOsc) {
			synthOsc.set({
				detune: sineDetuneFine,
			});
		}
	};

	//transpose sine osc

	const handleSineDetuneCoarseChange = (event) => {
		setSineDetuneCoarse(Number(event.target.value));
		if (synthOsc) {
			synthOsc.set({
				detune: Number(event.target.value) + sineDetuneFine - 2400,
			});
		}
	};
	// handle dist

	const handleDistWet = (event) => {
		setDistWet(Number(event.target.value));
	};

	useEffect(() => {
		if (synthParams.current.dist) {
			synthParams.current.dist.set({
				wet: curvefit3(distWet, 0, 0.3, 1),
			});
		}
	}, [distWet]);

	const handleDistAmount = (event) => {
		setDistAmount(Number(event.target.value));
	};

	useEffect(() => {
		if (synthParams.current.dist) {
			synthParams.current.dist.set({
				distortion: curvefit3(distAmount, 0, 0.3, 1),
			});
		}
	}, [distAmount]);

	//chorus

	const handleChorusFreq = (event) => {
		setChorusFreq(Number(event.target.value));
	};

	useEffect(() => {
		if (synthParams.current.chorus) {
			synthParams.current.chorus.set({
				frequency: curvefit3(chorusFreq, 0, 8, 20),
			});
		}
	}, [chorusFreq]);

	const handleChorusDelayTime = (event) => {
		setChorusDelayTime(Number(event.target.value));
	};

	useEffect(() => {
		if (synthParams.current.chorus) {
			synthParams.current.chorus.set({
				delayTime: curvefit3(chorusDelayTime, 0, 2, 5),
			});
		}
	}, [chorusDelayTime]);

	const handleChorusDepth = (event) => {
		setChorusDepth(Number(event.target.value));
		if (synth) {
			chorus.set({
				depth: Number(event.target.value),
			});
		}
	};

	useEffect(() => {
		if (synthParams.current.chorus) {
			synthParams.current.chorus.set({
				depth: curvefit3(chorusDepth, 0, 0.5, 1),
			});
		}
	}, [chorusDepth]);

	//reverb

	const handleReverbWet = (event) => {
		setReverbWet(Number(event.target.value));
	};
	useEffect(() => {
		if (synthParams.current.reverb) {
			synthParams.current.reverb.set({
				wet: curvefit3(reverbWet, 0, 0.5, 1),
			});
		}
	}, [reverbWet]);

	const handleReverbDecay = (event) => {
		setReverbDecay(Number(event.target.value));
	};

	useEffect(() => {
		if (synthParams.current.reverb) {
			synthParams.current.reverb.set({
				decay: curvefit3(reverbDecay, 0.001, 5, 20),
			});
		}
	}, [reverbDecay]);

	//delay

	const handleDelayWet = (event) => {
		setDelayWet(Number(event.target.value));
	};

	useEffect(() => {
		if (synthParams.current.delay) {
			synthParams.current.delay.set({
				wet: curvefit3(delayWet, 0, 0.5, 0.9),
			});
		}
	}, [delayWet]);

	const handleDelayFeedback = (event) => {
		setDelayFeedback(Number(event.target.value));
	};

	useEffect(() => {
		if (synthParams.current.delay) {
			synthParams.current.delay.set({
				feedback: curvefit3(delayFeedback, 0, 0.5, 0.9),
			});
		}
	}, [delayFeedback]);

	//noise

	const handleNoiseVolume = (event) => {
		setNoiseVolume(Number(event.target.value));
	};

	useEffect(() => {
		if (synthParams.current.noise) {
			synthParams.current.noise.set({
				volume: curvefit3(noiseVolume, -80, -20, -10),
			});
		}
	}, [noiseVolume]);

	//change osc type

	const handleOscTypeChange = (type) => {
		setOscOneWave(type);
	};

	useEffect(() => {
		if (synthParams.current.synth) {
			synthParams.current.synth.set({
				oscillator: {
					type: oscOneWave,
				},
			});
		}
	}, [oscOneWave]);

	return (
		<MainWrapper>
			<Indicator isKeyPressed={isKeyPressed}></Indicator>
			<SawOscModule
				handleSawDetuneFineChange={handleSawDetuneFineChange}
				handleSawDetuneCoarseChange={handleSawDetuneCoarseChange}
				handleOscTypeChange={handleOscTypeChange}
				oscOneWave={oscOneWave}
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

export default Synth;
