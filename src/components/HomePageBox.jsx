import styled from "styled-components";

const StyledHomePageBox = styled.div`
	padding: 10rem 5rem;
	background-color: #935fa7;
	color: #fbff00;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	&:hover {
		cursor: pointer;
	}
`;

const StyledContainer = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const StyledText = styled.div`
	font-size: 1.5rem;
	margin-top: 1rem;
`;
const StyledParentheses = styled.div`
	font-size: 1.25rem;
	margin-top: 1rem;
`;

const HomePageBox = () => {
	return (
		<StyledContainer>
			<StyledHomePageBox>
				<h1>Go to synth playground</h1>
				<StyledText>
					Use your computer keyboard to play. Use the faders to manipluate the
					sound.
				</StyledText>
				<StyledParentheses>
					(Playing the synth only works on a computer or if having a keyboard
					connected.)
				</StyledParentheses>
			</StyledHomePageBox>
		</StyledContainer>
	);
};

export default HomePageBox;
