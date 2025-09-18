import * as React from "react";
interface SVGProps extends React.SVGProps<SVGSVGElement> {
  // You can add any custom props here if needed
}
const CustomFilterIcon: React.FC<SVGProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    {...props}
  >
    <rect width={15} height={15} fill="url(#pattern0_2865_33932)" />
    <defs>
      <pattern
        id="pattern0_2865_33932"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <use xlinkHref="#image0_2865_33932" transform="scale(0.0078125)" />
      </pattern>
      <image
        id="image0_2865_33932"
        width={128}
        height={128}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);
export default CustomFilterIcon;
