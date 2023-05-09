import { Wrapper } from "../components/Wrappers";
import styled from "styled-components";

const Slider = styled.div`
	border: solid;
	border-width: 5rem 10rem;
	border-left-color: transparent;
	border-top-color: transparent;
	border-right-color: #ededed;
	border-bottom-color: #ededed;
`;

const Amplitude = () => {
	return (
		<Wrapper>
			<h2>Amplitude</h2>
			<Slider></Slider>
		</Wrapper>
	);
};

export default Amplitude;
