import React from "react";

import { withStyles } from "../../theme/makeStyles";
import { Theme } from "../../theme/main";

const styles = (theme: Theme) => ({
  errorBlock: {
    color: theme.palette?.error.main || "#C83B51",
  },
});

interface IErrorBlockProps {
  classes?: any;
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

export default withStyles(ErrorBlock, styles);
