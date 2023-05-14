import { Wrapper } from "../styling/Wrappers";
import styled from "styled-components";

const StyledIntroPrompt = styled.div`
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 3rem 6rem;
	background-color: #d8d6d69a;
	color: #935fa7;
	font-size: 2rem;
`;

const IntroPrompt = ({ isKeyPressed }) => {
	return (
		<Wrapper>
			<StyledIntroPrompt>
				Use your computer keyboard to play. Use the faders to manipulate the
				sound.
			</StyledIntroPrompt>
		</Wrapper>
	);
};

export default IntroPrompt;
