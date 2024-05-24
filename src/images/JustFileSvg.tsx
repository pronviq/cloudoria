import React from "react";
import { useTheme } from "../contexts/theme/Theme.context";

const JustFileSvg = ({ ...props }) => {
  const { theme } = useTheme();

  return (
    <svg {...props} viewBox="0 0 64 64" fill={theme["--svg"]} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.113-.026c-2.803 0-5.074 2.272-5.074 5.074v53.841c0 2.803 2.271 5.074 5.074 5.074h45.773c2.801 0 5.074-2.271 5.074-5.074v-38.605l-18.901-20.31h-31.946z"
        fill={props.backgroundColor || "#8199AF"}
      />
      <path
        d="M37.074 0v14.561c0 1.656 1.104 5.791 6.104 5.791h12.799l-18.903-20.352z"
        opacity=".5"
        fill={theme["--white"]}
      />
      <text
        letterSpacing={-1}
        x="5"
        y="90%"
        fontSize="20"
        fontWeight="bold"
        fill={theme["--white"]}
      >
        {props.format}
      </text>
    </svg>
  );
};

export default JustFileSvg;
