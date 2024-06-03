import { useTheme } from "../contexts/theme/Theme.context";

const SelectSvg = ({ ...props }) => {
  const { theme } = useTheme();

  return (
    <svg
      style={{ ...props }}
      viewBox="0 0 24 24"
      fill={theme["--svg"]}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 3v18l5-7h9zm4.485 10L7 17.88V5.058L17.108 13z" fillRule="evenodd"></path>
      <path fill="none" d="M0 0h24v24H0z"></path>
    </svg>
  );
};

export default SelectSvg;
