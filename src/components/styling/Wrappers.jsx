import styled from "styled-components";

export const MainWrapper = styled.section`
	width: 100vw;
	height: 100vh;
	padding: 2rem;
	box-sizing: border-box;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	align-content: center;
	flex-wrap: wrap;
	background-color: #f6f5f5;

	@media (max-width: 1190px) {
		height: 125vh;
	}

	@media (max-width: 970px) {
		height: 150vh;
	}

	@media (max-width: 800px) {
		height: 175vh;
	}

	@media (max-width: 600px) {
		height: 100%;
	}
`;

export const Wrapper = styled.div`
	padding: 1rem;
	margin: 0.25rem;
	background-color: #ffff;
`;
