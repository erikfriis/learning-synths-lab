import styled from "styled-components";

const StyledHomePageBox = styled.div`
	padding: 10rem 5rem;
	background-color: #fdf900;
	color: #0000ff;

	&:hover {
		scale: 1.01;
		background-color: #fdf900d8;
		color: #0000ffd2;
		cursor: pointer;
	}
`;

const HomePageBox = () => {
	return (
		<StyledHomePageBox>
			<h1>Learning synths lab</h1>
		</StyledHomePageBox>
	);
};

export default HomePageBox;
