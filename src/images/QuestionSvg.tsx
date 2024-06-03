import { useTheme } from "../contexts/theme/Theme.context";

const QuestionSvg = ({ ...props }) => {
  const { theme } = useTheme();

  return (
    <svg style={{ ...props }} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 17V16.9929M12 14.8571C12 11.6429 15 12.3571 15 9.85714C15 8.27919 13.6568 7 12 7C10.6567 7 9.51961 7.84083 9.13733 9"
        stroke={theme["--svg"]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default QuestionSvg;
