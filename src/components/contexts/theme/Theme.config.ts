import { Color } from "../../../models/Color";
import { Theme, ThemeType } from "./Theme.model";

export const THEMES: Record<ThemeType, Theme> = {
  light: {
    "--font": Color.BLACK,
    "--background": Color.BEIGE,
    "--border": Color.BEIGE,
    "--svg": Color.BLACK,
    "--shadow": Color.BLACK,

    "--white": Color.WHITE,
    "--black": Color.BLACK,

    "--hover": Color.HOVER_LIGHT,

    theme: "light",
  },
  dark: {
    "--font": Color.LIGHTSLATEGRAY,
    "--background": Color.DARK_VIOLET,
    "--border": Color.LIGHTSLATEGRAY,
    "--svg": Color.LIGHTSLATEGRAY,
    "--shadow": Color.LIGHT_GRAY,

    "--white": Color.WHITE,
    "--black": Color.BLACK,

    "--hover": Color.HOVER_DARK,

    theme: "dark",
  },
};
