import React from "react";
import { Grid } from "mds";

type PageLayoutProps = {
  className?: string;
  variant?: "constrained" | "full";
  children: any;
  noPadding?: boolean;
};

const PageLayout = ({
  className = "",
  children,
  variant = "constrained",
  noPadding = false,
}: PageLayoutProps) => {
  return (
    <div style={{ padding: "2rem" }}>
      <Grid container>
        <Grid item xs={12} className={className}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export default PageLayout;
