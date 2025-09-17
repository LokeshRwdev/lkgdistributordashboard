import * as React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  // You can add any custom props here if needed
}
const CustomReport: React.FC<SVGProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    {...props}
  >
    <mask
      id="mask0_3309_16978"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={15}
      height={15}
    >
      <rect width={15} height={15} fill="url(#pattern0_3309_16978)" />
    </mask>
    <g mask="url(#mask0_3309_16978)">
      <rect x={-6} y={-4} width={26} height={23} fill="white" />
    </g>
    <defs>
      <pattern
        id="pattern0_3309_16978"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <use xlinkHref="#image0_3309_16978" transform="scale(0.0078125)" />
      </pattern>
      <image
        id="image0_3309_16978"
        width={128}
        height={128}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADsQAAA7EB9YPtSQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIUSURBVHic7dyhqhRxGEDxc2WDooiggtUmYrDYriD4BPoE6hv4JNotvoFmi9Vo1GYUrYJiuQYtF4T5w53Z2d1zfjDtY+Yb9sC/DAtJkiRJkiRJkiRJDtPR2gvMbOR9ThbfIqu4y98fd+p6sNJ+O+nc2gtkXQUgVwByBSBXAHIFIFcAcgUgVwByBSBXAHIFIFcAcgUgVwByBSC3WXuB/Nct4OHA3Cvg98K77I1D+iLoCWPvcuWsD+oIkCsAuQKQKwC5ApArALkCkCsAuQKQKwC5ApArALkCkCsAuQKQKwC5vgg67R7wemDuMfB52VW2owBOuwjcHpi7sPQi29IRIFcAcgUgVwByBSBXAHIFIFcAcgUgVwByBSBXAHIFIFcAcgUgN8f3ABvgeGDuE/B1huftumvAnYG5D8CvhXeZNEcAl4D3A3NPGfvaZt8dA28G5m4CX5ZdZVpHgFwByBWAXAHIFYBcAcgVgFwByBWAXAHIFYBcAcgVgFwByBWAXAHIFYBcAcgVgFwByO3Kv4SdB+4PzH0Evi+8i8quBHADeDcw9wh4u/AuKh0BcgUgVwByBSBXAHIFIFcAcgUgVwByBSBXAHIb4PrA3A/g58K7ZF6XgatTQxvg28DNngMvz7pRtuoZ8GJqqCNArgDkCkCuAOQKQK4A5ApArgDkCkDu6N815WTgPt1jP++RJEmSJEmSJEmS5CD9AZYEOdEyKV5pAAAAAElFTkSuQmCC"
      />
    </defs>
  </svg>
);
export default CustomReport;
