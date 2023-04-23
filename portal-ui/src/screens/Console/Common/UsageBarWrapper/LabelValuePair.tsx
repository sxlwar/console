import React from "react";
import { Grid } from "mds";

type LabelValuePairProps = {
  label?: any;
  value?: any;
  orientation?: any;
  stkProps?: any;
  lblProps?: any;
  valProps?: any;
};

const LabelValuePair = ({
  label = null,
  value = "-",
  orientation = "column",
  stkProps = {},
  lblProps = {},
  valProps = {},
}: LabelValuePairProps) => {
  return (
    <Grid direction={{ xs: "column", sm: orientation }} {...stkProps}>
      <label style={{ marginRight: 5, fontWeight: 600 }} {...lblProps}>
        {label}
      </label>
      <label style={{ marginRight: 5, fontWeight: 500 }} {...valProps}>
        {value}
      </label>
    </Grid>
  );
};

export default LabelValuePair;
