import * as React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  // You can add any custom props here if needed
}

const CustomArrowLeft: React.FC<SVGProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={16}
    viewBox="0 0 27 16"
    fill="none"
    {...props}
  >
    <path
      d="M0.291145 7.29289C-0.0993786 7.68342 -0.0993786 8.31658 0.291145 8.70711L6.65511 15.0711C7.04563 15.4616 7.6788 15.4616 8.06932 15.0711C8.45984 14.6805 8.45984 14.0474 8.06932 13.6569L2.41247 8L8.06932 2.34315C8.45984 1.95262 8.45984 1.31946 8.06932 0.928932C7.6788 0.538408 7.04563 0.538408 6.65511 0.928932L0.291145 7.29289ZM26.0781 8V7L0.998253 7V8V9L26.0781 9V8Z"
      fill="#232323"
    />
  </svg>
);

export default CustomArrowLeft;