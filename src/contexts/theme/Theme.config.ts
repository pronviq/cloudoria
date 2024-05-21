import { Color } from "../../models/Color.model";
import { Theme, ThemeType } from "./Theme.model";

export const THEMES: Record<ThemeType, Theme> = {
  light: {
    "--font": Color.DARK_VIOLET,
    "--background": Color.BEIGE,
    "--border": Color.DARK_VIOLET,
    "--svg": Color.DARK_VIOLET,
    "--shadow": Color.DARK_VIOLET,

    "--white": Color.WHITE,
    "--black": Color.BLACK,

    "--hover": Color.HOVER_LIGHT,

    theme: "light",
  },
  dark: {
    "--font": Color.BEIGE,
    "--background": Color.DARK_VIOLET,
    "--border": Color.BEIGE,
    "--svg": Color.BEIGE,
    "--shadow": Color.BEIGE,

    "--white": Color.WHITE,
    "--black": Color.BLACK,

    "--hover": Color.HOVER_DARK,

    theme: "dark",
  },
};
