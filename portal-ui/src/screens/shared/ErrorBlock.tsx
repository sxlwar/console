import { Theme } from "@mui/material/styles";
import React from "react";

import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";

const styles = (theme: Theme) =>
  createStyles({
    errorBlock: {
      color: theme.palette?.error.main || "#C83B51",
    },
  });

interface IErrorBlockProps {
  classes: any;
  errorMessage: string;
  withBreak?: boolean;
}

const ErrorBlock = ({
  classes,
  errorMessage,
  withBreak = true,
}: IErrorBlockProps) => {
  return (
    <React.Fragment>
      {withBreak && <br />}
      <p className={classes.errorBlock}>{errorMessage}</p>
    </React.Fragment>
  );
};

export default withStyles(styles)(ErrorBlock);
