import { useTheme } from "../contexts/theme/Theme.context";

const UserAddSvg = ({ ...props }) => {
  const { theme } = useTheme();

  return (
    <svg style={{ ...props }} viewBox="0 0 24 24" fill="none">
      <path
        clipRule="evenodd"
        d="m6.75001 7c0-1.79493 1.45508-3.25 3.24999-3.25 1.7949 0 3.25 1.45507 3.25 3.25s-1.4551 3.25-3.25 3.25c-1.79491 0-3.24999-1.45507-3.24999-3.25zm3.24999-4.75c-2.62334 0-4.74999 2.12665-4.74999 4.75s2.12665 4.75 4.74999 4.75c2.6234 0 4.75-2.12665 4.75-4.75s-2.1266-4.75-4.75-4.75zm-5.6865 16.1524c.98693-2.1566 3.16283-3.6524 5.6865-3.6524 2.5237 0 4.6996 1.4958 5.6865 3.6524.2078.4542.1134.8704-.1871 1.2142-.3195.3656-.873.6334-1.4994.6334h-7.99999c-.6264 0-1.17984-.2678-1.49941-.6334-.30047-.3438-.39492-.76-.1871-1.2142zm5.6865-5.1524c-3.13193 0-5.82838 1.8578-7.05046 4.5282-.48164 1.0525-.22026 2.0911.42167 2.8255.62282.7126 1.59835 1.1463 2.6288 1.1463h7.99999c1.0305 0 2.006-.4337 2.6288-1.1463.642-.7344.9033-1.773.4217-2.8255-1.2221-2.6704-3.9185-4.5282-7.0505-4.5282zm8-5c.4142 0 .75.33579.75.75v2.25h2.25c.4142 0 .75.3358.75.75s-.3358.75-.75.75h-2.25v2.25c0 .4142-.3358.75-.75.75s-.75-.3358-.75-.75v-2.25h-2.25c-.4142 0-.75-.3358-.75-.75s.3358-.75.75-.75h2.25v-2.25c0-.41421.3358-.75.75-.75z"
        fill="#FFF"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default UserAddSvg;
