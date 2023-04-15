import Tabs, { TabList, TabPanel, useTab } from "@atlaskit/tabs";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { withStyles } from "../../../../theme/makeStyles";

import { Box } from "mds";
import { useLocation, useNavigate } from "react-router-dom";

export type ITabProps = {
  label: string;
  value: string;
  component: React.FC<any>;
  to: string;
};

export type TabItemProps = {
  tabConfig: ITabProps | any;
  content?: JSX.Element | JSX.Element[];
};

type VerticalTabsProps = {
  classes?: any;
  children: TabItemProps[];
  selectedTab?: string;
  routes?: any;
  isRouteTabs?: boolean;
};

const styles = () => ({
  tabsContainer: {
    display: "flex",
    height: "100%",
    width: "100%",
  },
  tabsHeaderContainer: {
    width: "300px",
    background: "#F8F8F8",
    borderRight: "1px solid #EAEAEA",
    "& [role=tablist]": {
      display: "flex",
      flexDirection: "column",
    },
    "& [role=tab]": {
      minHeight: 60,
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  tabContentContainer: {
    width: "100%",
  },
  tabPanel: {
    height: "100%",
  },
  /*Below md breakpoint make it horizontal and style it for scrolling tabs*/
  "@media (max-width: 900px)": {
    tabsContainer: {
      flexFlow: "column",
      flexDirection: "column",
    },
    tabsHeaderContainer: {
      width: "100%",
      borderBottom: " 1px solid #EAEAEA",
    },
  },
});

const CustomTab = ({
  children,
  ...rest
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> & {
  to?: string;
}) => {
  const tabAttributes = useTab();
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      {...rest}
      {...tabAttributes}
      onClick={(e) => {
        rest.onClick?.(e);
        setTimeout(() => {
          tabAttributes.onClick();
        }, 300);
      }}
    >
      {children}
    </div>
  );
};

const VerticalTabs = ({
  children,
  classes,
  selectedTab = "0",
  routes,
  isRouteTabs,
}: VerticalTabsProps) => {
  const navigate = useNavigate();
  const { pathname = "" } = useLocation();

  const [value, setValue] = useState(selectedTab);

  const headerList: ITabProps[] = [];
  const contentList: React.ReactNode[] = [];

  useEffect(() => {
    if (isRouteTabs) {
      const tabConfigElement = children.find(
        (item) => item.tabConfig.to === pathname
      );

      if (tabConfigElement) {
        setValue(tabConfigElement.tabConfig.value);
      }
    }
  }, [isRouteTabs, children, pathname]);

  if (!children) return null;

  children.forEach((child) => {
    headerList.push(child.tabConfig);
    contentList.push(child.content);
  });

  const handleChange = (newValue: number) => {
    setValue(String(newValue));
  };

  return (
    <Tabs
      id="vertical-tabs"
      selected={+value}
      onChange={handleChange}
      defaultSelected={1}
    >
      <Box className={classes.tabsContainer}>
        <Box className={classes.tabsHeaderContainer}>
          <TabList>
            {headerList.map((item, index) => {
              if (item) {
                return (
                  <CustomTab key={index} onClick={() => navigate(item.to)}>
                    {item.label}
                  </CustomTab>
                );
              }
              return null;
            })}
          </TabList>
        </Box>

        <Box className={classes.tabContentContainer}>
          {!isRouteTabs
            ? contentList.map((item, index) => {
                return (
                  <TabPanel key={`v-tab-p-${index}`}>
                    <span style={{ height: "100%" }}>{item ? item : null}</span>
                  </TabPanel>
                );
              })
            : null}
          {isRouteTabs ? (
            <div className={classes.tabPanel}>{routes}</div>
          ) : null}
        </Box>
      </Box>
    </Tabs>
  );
};

export default withStyles(VerticalTabs, styles);
