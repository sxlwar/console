// This file is part of MinIO Console Server
// Copyright (c) 2023 MinIO, Inc.
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

import React, { Fragment, useState } from "react";
import { Button, Grid } from "mds";
import InputBoxWrapper from "../../Common/FormComponents/InputBoxWrapper/InputBoxWrapper";
import ModalWrapper from "../../Common/ModalWrapper/ModalWrapper";
import { Webhook } from "@mui/icons-material"; // todo
import { formFieldStyles } from "../../Common/FormComponents/common/styleLibrary";
import CallToActionIcon from "@mui/icons-material/CallToAction"; // todo
import PendingActionsIcon from "@mui/icons-material/PendingActions"; // todo
import api from "../../../../common/api";
import {
  configurationIsLoading,
  setErrorSnackMessage,
  setServerNeedsRestart,
  setSnackBarMessage,
} from "../../../../systemSlice";
import { ErrorResponseHandler } from "../../../../common/types";
import { useAppDispatch } from "../../../../store";
import { LinearProgress } from "@mui/material";

interface IEndpointModal {
  open: boolean;
  type: string;
  onCloseEndpoint: () => void;
}

const AddEndpointModal = ({ open, type, onCloseEndpoint }: IEndpointModal) => {
  const [name, setName] = useState<string>("");
  const [endpoint, setEndpoint] = useState<string>("");
  const [authToken, setAuthToken] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [invalidInputs, setInvalidInput] = useState<string[]>([
    "name",
    "endpoint",
  ]);
  const [initialInputs, setInitialInputs] = useState<string[]>([
    "name",
    "endpoint",
    "auth-token",
  ]);

  const dispatch = useAppDispatch();

  const saveWebhook = () => {
    if (saving) {
      return;
    }

    if (invalidInputs.length !== 0) {
      return;
    }

    if (name.trim() === "") {
      setInvalidInput([...invalidInputs, "name"]);

      return;
    }

    if (endpoint.trim() === "") {
      setInvalidInput([...invalidInputs, "endpoint"]);

      return;
    }

    setSaving(true);

    const payload = {
      key_values: [
        {
          key: "endpoint",
          value: endpoint,
        },
        {
          key: "auth_token",
          value: authToken,
        },
      ],
      arn_resource_id: name,
    };

    api
      .invoke("PUT", `/api/v1/configs/${type}`, payload)
      .then((res) => {
        setSaving(false);
        dispatch(setServerNeedsRestart(res.restart));
        if (!res.restart) {
          dispatch(setSnackBarMessage("Configuration saved successfully"));
        }

        onCloseEndpoint();
        dispatch(configurationIsLoading(true));
      })
      .catch((err: ErrorResponseHandler) => {
        setSaving(false);
        dispatch(setErrorSnackMessage(err));
      });
  };

  const initializeInput = (name: string) => {
    setInitialInputs(initialInputs.filter((item) => item !== name));
  };

  const validateInput = (name: string, valid: boolean) => {
    if (invalidInputs.includes(name) && valid) {
      setInvalidInput(invalidInputs.filter((item) => item !== name));
      return;
    }

    if (!valid && !invalidInputs.includes(name)) {
      setInvalidInput([...invalidInputs, name]);
    }
  };

  let title = "Add new Webhook";
  let icon = <Webhook />;

  switch (type) {
    case "logger_webhook":
      title = "New Logger Webhook";
      icon = <CallToActionIcon />;
      break;
    case "audit_webhook":
      title = "New Audit Webhook";
      icon = <PendingActionsIcon />;
      break;
  }

  return (
    <Fragment>
      <ModalWrapper
        modalOpen={open}
        title={title}
        onClose={onCloseEndpoint}
        titleIcon={icon}
      >
        <Grid item xs={12} sx={{ ...formFieldStyles.formFieldRow }}>
          <InputBoxWrapper
            id="name"
            name="name"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              initializeInput("name");
              setName(event.target.value);
              validateInput("name", event.target.validity.valid);
            }}
            error={
              invalidInputs.includes("name") && !initialInputs.includes("name")
                ? "Invalid Name"
                : ""
            }
            label="Name"
            value={name}
            pattern={"^(?=.*[a-zA-Z0-9]).{1,}$"}
            required
          />
        </Grid>
        <Grid item xs={12} sx={{ ...formFieldStyles.formFieldRow }}>
          <InputBoxWrapper
            id="endpoint"
            name="endpoint"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              initializeInput("endpoint");
              setEndpoint(event.target.value);
              validateInput("endpoint", event.target.validity.valid);
            }}
            error={
              invalidInputs.includes("endpoint") &&
              !initialInputs.includes("endpoint")
                ? "Invalid Endpoint set"
                : ""
            }
            label="Endpoint"
            value={endpoint}
            pattern={
              "^(https?):\\/\\/([a-zA-Z0-9\\-.]+)(:[0-9]+)?(\\/[a-zA-Z0-9\\-.\\/]*)?$"
            }
            required
          />
        </Grid>
        <Grid item xs={12} sx={{ ...formFieldStyles.formFieldRow }}>
          <InputBoxWrapper
            id="auth-token"
            name="auth-token"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              initializeInput("auth-token");
              setAuthToken(event.target.value);
            }}
            label="Auth Token"
            value={authToken}
          />
        </Grid>
        {saving && (
          <Grid
            item
            xs={12}
            sx={{
              marginBottom: 10,
            }}
          >
            <LinearProgress />
          </Grid>
        )}
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            id={"reset"}
            type="button"
            variant="regular"
            disabled={saving}
            onClick={onCloseEndpoint}
            label={"Cancel"}
            sx={{
              marginRight: 10,
            }}
          />
          <Button
            id={"save-lifecycle"}
            type="submit"
            variant="callAction"
            color="primary"
            disabled={saving || invalidInputs.length !== 0}
            label={"Save"}
            onClick={saveWebhook}
          />
        </Grid>
      </ModalWrapper>
    </Fragment>
  );
};

export default AddEndpointModal;
