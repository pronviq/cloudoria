import { Color } from "../../../models/Color";

export type ThemeType = "dark" | "light";

export interface Theme {
  "--font": Color;
  "--background": Color;
  "--border": Color;
  "--svg": Color;
  "--shadow": Color;

  "--white": Color;
  "--black": Color;

  "--hover": Color;

  theme: string;
}
