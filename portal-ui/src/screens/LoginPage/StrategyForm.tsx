// This file is part of MinIO Console Server
// Copyright (c) 2022 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React, { useMemo } from "react";
import {
  Button,
  LockFilledIcon,
  LogoutIcon,
  PasswordKeyIcon,
  Grid,
  UserFilledIcon,
} from "mds";
import { setAccessKey, setSecretKey, setSTS, setUseSTS } from "./loginSlice";
import { InputAdornment } from "@mui/material";
import Select from "@atlaskit/select";
import ProgressBar from "@atlaskit/progress-bar";
import { AppState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { LoginField } from "./LoginField";
import { makeStyles } from "../../theme/makeStyles";

import { spacingUtils } from "../Console/Common/FormComponents/common/styleLibrary";
import { doLoginAsync } from "./loginThunks";
import { IStrategyForm } from "./types";
import { selectorTypes } from "../Console/Common/FormComponents/SelectWrapper/SelectWrapper";

const useStyles = makeStyles()(() => ({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "auto",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    margin: "30px 0px 8px",
    height: 40,
    width: "100%",
    boxShadow: "none",
    padding: "16px 30px",
  },
  submitContainer: {
    textAlign: "right",
    marginTop: 30,
  },
  linearPredef: {
    height: 10,
  },
  ssoMenuItem: {
    display: 'flex',
    alignItems: 'center', 
    gap: '5px',
    padding: '0 1em',
    cursor: "pointer"
  },
  ...spacingUtils,
}));

const StrategyForm = ({ redirectRules }: IStrategyForm) => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles() as any;

  const accessKey = useSelector((state: AppState) => state.login.accessKey);
  const secretKey = useSelector((state: AppState) => state.login.secretKey);
  const sts = useSelector((state: AppState) => state.login.sts);
  const useSTS = useSelector((state: AppState) => state.login.useSTS);

  const loginSending = useSelector(
    (state: AppState) => state.login.loginSending
  );

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(doLoginAsync());
  };

  const ssoOptions = useMemo(() => {
    const data = redirectRules.map((r) => ({
      label: `${r.displayName} ${r.serviceType ? ` - ${r.serviceType}` : ""}`,
      value: r.redirect,
    }));

    return [
      {
        value: useSTS ? "use-sts-cred" : "use-sts",
        label: useSTS ? "Use Credentials" : "Use STS",
      },
      ...data,
    ];
  }, [redirectRules, useSTS]);

  const extraActionSelector = (e: selectorTypes | null) => {
    const value = e?.value;

    if (value) {
      console.log(value);
      if (value.includes("use-sts")) {
        console.log("si");
        dispatch(setUseSTS(!useSTS));

        return;
      }

      window.location.href = e?.value as string;
    }
  };

  return (
    <React.Fragment>
      <form className={classes.form} noValidate onSubmit={formSubmit}>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12} className={classes.spacerBottom}>
            <LoginField
              fullWidth
              id="accessKey"
              className={classes.inputField}
              value={accessKey}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(setAccessKey(e.target.value))
              }
              placeholder={useSTS ? "STS Username" : "Username"}
              name="accessKey"
              autoComplete="username"
              disabled={loginSending}
              variant={"outlined"}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    className={classes.iconColor}
                  >
                    <UserFilledIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} className={useSTS ? classes.spacerBottom : ""}>
            <LoginField
              fullWidth
              className={classes.inputField}
              value={secretKey}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(setSecretKey(e.target.value))
              }
              name="secretKey"
              type="password"
              id="secretKey"
              autoComplete="current-password"
              disabled={loginSending}
              placeholder={useSTS ? "STS Secret" : "Password"}
              variant={"outlined"}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    className={classes.iconColor}
                  >
                    <LockFilledIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          {useSTS && (
            <Grid item xs={12} className={classes.spacerBottom}>
              <LoginField
                fullWidth
                id="sts"
                className={classes.inputField}
                value={sts}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(setSTS(e.target.value))
                }
                placeholder={"STS Token"}
                name="STS"
                autoComplete="sts"
                disabled={loginSending}
                variant={"outlined"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      className={classes.iconColor}
                    >
                      <PasswordKeyIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          )}
        </Grid>

        <Grid item xs={12} className={classes.submitContainer}>
          <Button
            type="submit"
            variant="callAction"
            color="primary"
            id="do-login"
            className={classes.submit}
            disabled={
              (!useSTS && (accessKey === "" || secretKey === "")) ||
              (useSTS && sts === "") ||
              loginSending
            }
            label={"Login"}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} className={classes.linearPredef}>
          {loginSending && <ProgressBar />}
        </Grid>
        <Grid
          item
          xs={12}
          className={classes.linearPredef}
          sx={{ marginTop: "16px" }}
        >
          <Select
            id="alternativeMethods"
            name="alternativeMethods"
            onChange={extraActionSelector}
            displayEmpty
            className={classes.ssoSelect}
            options={ssoOptions}
            renderValue={() => "Other Authentication Methods"}
            sx={{
              width: "100%",
              height: "38px",
              fontSize: "14px",
              borderRadius: "4px",
            }}
            components={{
              Option: ({ children, innerProps }) => (
                <div {...innerProps} className={classes.ssoMenuItem}>
                  <LogoutIcon
                    className={classes.ssoLoginIcon}
                    style={{ width: 16, height: 16, marginRight: 8 }}
                  />
                  {children}
                </div>
              ),
            }}
          ></Select>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default StrategyForm;
