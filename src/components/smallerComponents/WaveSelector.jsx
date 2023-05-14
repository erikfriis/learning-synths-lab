import styled from "styled-components";
import { Wrapper } from "../styling/Wrappers";
import SawToothImg from "../../assets/Saw.svg";
import SquareImg from "../../assets/Square.svg";
import SineImg from "../../assets/Sine.svg";

const Container = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
`;

const Btn = styled.div`
	padding: 0.25rem;
	background-color: ${(props) => (props.selected ? "#c2c2c2" : "#f5f5f5")};
`;

const WaveImg = styled.img`
	background-image: url(${(props) => props.src});
	background-size: cover;
	height: 1rem;
`;

const WaveSelector = ({ oscOneWave, handleOscTypeChange }) => {
	return (
		<Wrapper>
			<Container>
				<Btn selected={oscOneWave === "sawtooth"}>
					<WaveImg
						src={SawToothImg}
						onClick={() => handleOscTypeChange("sawtooth")}
					></WaveImg>
				</Btn>
				<Btn selected={oscOneWave === "square"}>
					<WaveImg
						src={SquareImg}
						onClick={() => handleOscTypeChange("square")}
					></WaveImg>
				</Btn>
				<Btn selected={oscOneWave === "sine"}>
					<WaveImg
						src={SineImg}
						onClick={() => handleOscTypeChange("sine")}
					></WaveImg>
				</Btn>
			</Container>
		</Wrapper>
	);
};

export default WaveSelector;
