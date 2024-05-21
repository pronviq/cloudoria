import { useTheme } from "../contexts/theme/Theme.context";

const FilterSvg = () => {
  const { theme } = useTheme();

  return (
    <svg
      width="20px"
      height="20px"
      className="filter_ico"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 16L13 16" stroke={theme["--svg"]} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 11H13" stroke={theme["--svg"]} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 6L13 6" stroke={theme["--svg"]} strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M17 4L17 20L20 16"
        stroke={theme["--svg"]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

export default FilterSvg;
