import { useTheme } from "../components/contexts/theme/Theme.context";

const ExitSvg = () => {
  const { theme } = useTheme();

  return (
    <svg
      width="16px"
      height="16px"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="5"
      stroke={theme["--svg"]}
      fill="none"
    >
      <polyline points="46.02 21.95 55.93 31.86 46.02 41.77"></polyline>
      <line x1="55.93" y1="31.86" x2="19.59" y2="31.86"></line>
      <path d="M40,38.18V52a2.8,2.8,0,0,1-2.81,2.8H12A2.8,2.8,0,0,1,9.16,52V11.77A2.8,2.8,0,0,1,12,9H37.19A2.8,2.8,0,0,1,40,11.77V25" />
    </svg>
  );
};

export default ExitSvg;
