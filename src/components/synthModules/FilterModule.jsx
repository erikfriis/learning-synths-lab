import SliderNew from "../smallerComponents/SliderNew";
import { Wrapper } from "../styling/Wrappers";
import { H2 } from "../styling/TextStyles";

const FilterModule = ({ FilterCutoffChange, FilterQChange }) => {
	return (
		<Wrapper>
			<H2 textColor="#7ed2f3">Filter</H2>
			<SliderNew
				label={"Cutoff"}
				min={0}
				max={1}
				defaultValue={1}
				steps={0.0001}
				onChange={FilterCutoffChange}
				sliderColor="#7ed2f3"
			/>
			<SliderNew
				label={"Res"}
				min={0}
				max={1}
				defaultValue={0.0001}
				steps={0.0001}
				onChange={FilterQChange}
				sliderColor="#7ed2f3"
			/>
		</Wrapper>
	);
};

export default FilterModule;
