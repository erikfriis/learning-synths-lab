import { Wrapper } from "../styling/Wrappers";
import styled from "styled-components";

const IndicatorBox = styled.div`
	width: 5rem;
	height: 5rem;
	background-color: ${(props) => props.backgroundColor};
	color: #c1c1c1;
`;

const Indicator = ({ isKeyPressed }) => {
	return (
		<Wrapper>
			<IndicatorBox
				backgroundColor={isKeyPressed ? "blue" : "#c1c1c1"}
			></IndicatorBox>
		</Wrapper>
	);
};

export default Indicator;
