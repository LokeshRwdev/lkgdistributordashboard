import * as React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  // You can add any custom props here if needed
}
const CustomSupportTicket: React.FC<SVGProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <mask
      id="mask0_1915_28658"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={18}
      height={18}
    >
      <rect
        y={0.90625}
        width={17.9487}
        height={16.3159}
        fill="url(#pattern0_1915_28658)"
      />
    </mask>
    <g mask="url(#mask0_1915_28658)">
      <rect
        x={-2.76172}
        y={-7.99219}
        width={23.4714}
        height={25.2155}
        fill="white"
      />
    </g>
    <defs>
      <pattern
        id="pattern0_1915_28658"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <use
          xlinkHref="#image0_1915_28658"
          transform="matrix(0.00649351 0 0 0.00699301 0.0584416 0.0699301)"
        />
      </pattern>
      <image
        id="image0_1915_28658"
        width={128}
        height={128}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);
export default CustomSupportTicket;
