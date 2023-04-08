import { createMakeStyles, createWithStyles } from "tss-react";
import theme, { Theme } from "./main";

export function useTheme() {
  return theme;
}

export const {
  makeStyles,
  useStyles, //<- To use when you need css or cx but don't have custom classes
} = createMakeStyles({ useTheme });

export const { withStyles } = createWithStyles<Theme>({ useTheme });
