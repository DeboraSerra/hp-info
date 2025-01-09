import Svg, { G, Path } from "react-native-svg";

export default function WizardIcon({ color = "#000", size = 28 }) {
  return (
    <Svg
      width='458.000000pt'
      height='408.000000pt'
      viewBox='0 0 458.000000 408.000000'
      preserveAspectRatio='xMidYMid meet'
    >
      <G
        transform='translate(0.000000,408.000000) scale(0.100000,-0.100000)'
        fill={color}
        stroke='none'
      >
        <Path
          d='M0 2040 l0 -2040 2290 0 2290 0 0 2040 0 2040 -2290 0 -2290 0 0
    -2040z'
        />
      </G>
    </Svg>
  );
}
