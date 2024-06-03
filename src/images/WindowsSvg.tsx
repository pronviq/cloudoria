import { useTheme } from "../contexts/theme/Theme.context";

const WindowsSvg = ({ ...props }) => {
  const { theme } = useTheme();

  return (
    <svg style={{ ...props }} viewBox="0 0 71 71" fill="none">
      <path
        d="m 501.28156,-2.1735885 29.37917,-4.038097 V 22.139534 h -29.37718 l -0.002,-24.3131225 z m 29.37917,27.9414675 v 28.030604 l -29.37551,-4.032487 -0.002,-23.996814 h 29.37719 v -0.0013 z m 3.24988,-32.4253395 39.09352,-5.3737875 V 22.139534 H 533.91061 V -6.6574605 z M 573.00416,25.767879 V 59.612757 L 533.91061,54.244251 V 25.767879 h 39.09355 z"
        fill="#00bcf2"
        transform="translate(-501.282 12.031)"
      />
    </svg>
  );
};

export default WindowsSvg;
