import Slider from "./Slider";
import { Wrapper } from "./Wrappers";
import { H2 } from "./TextStyles";

const FilterModule = ({ FilterCutoffChange, FilterQChange }) => {
	return (
		<Wrapper>
			<H2 textColor="#7ed2f3">Filter</H2>
			<Slider
				label={"Cutoff"}
				min={0}
				max={20000}
				defaultValue={20000}
				steps={5}
				FilterCutoffChange={FilterCutoffChange}
				sliderColor="#7ed2f3"
			/>
			<Slider
				label={"Q"}
				min={0}
				max={10}
				defaultValue={0.1}
				steps={0.1}
				FilterQChange={FilterQChange}
				sliderColor="#7ed2f3"
			/>
		</Wrapper>
	);
};

export default FilterModule;
