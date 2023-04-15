// This file is part of MinIO Console Server
// Copyright (c) 2021 MinIO, Inc.
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

import React, { useEffect, useState } from "react";
import { Button, ChangeAccessPolicyIcon, Grid } from "mds";

import { withStyles } from "../../../../theme/makeStyles";
import {
  formFieldStyles,
  modalStyleUtils,
  spacingUtils,
} from "../../Common/FormComponents/common/styleLibrary";

import { ErrorResponseHandler } from "../../../../common/types";
import api from "../../../../common/api";
import ModalWrapper from "../../Common/ModalWrapper/ModalWrapper";
import SelectWrapper from "../../Common/FormComponents/SelectWrapper/SelectWrapper";
import CodeMirrorWrapper from "../../Common/FormComponents/CodeMirrorWrapper/CodeMirrorWrapper";

import { setModalErrorSnackMessage } from "../../../../systemSlice";
import { useAppDispatch } from "../../../../store";
import { emptyPolicy } from "../../Policies/utils";

const styles = () => ({
  codeMirrorContainer: {
    marginBottom: 20,
    "& label": {
      marginBottom: ".5rem",
    },
    "& label + div": {
      display: "none",
    },
  },
  ...formFieldStyles,
  ...modalStyleUtils,
  ...spacingUtils,
});

interface ISetAccessPolicyProps {
  classes?: any;
  open: boolean;
  bucketName: string;
  actualPolicy: string;
  actualDefinition: string;
  closeModalAndRefresh: () => void;
}

const SetAccessPolicy = ({
  classes,
  open,
  bucketName,
  actualPolicy,
  actualDefinition,
  closeModalAndRefresh,
}: ISetAccessPolicyProps) => {
  const dispatch = useAppDispatch();
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [accessPolicy, setAccessPolicy] = useState<string>("");
  const [policyDefinition, setPolicyDefinition] = useState<string>(emptyPolicy);
  const addRecord = (event: React.FormEvent) => {
    event.preventDefault();
    if (addLoading) {
      return;
    }
    setAddLoading(true);
    api
      .invoke("PUT", `/api/v1/buckets/${bucketName}/set-policy`, {
        access: accessPolicy,
        definition: policyDefinition,
      })
      .then((res) => {
        setAddLoading(false);
        closeModalAndRefresh();
      })
      .catch((err: ErrorResponseHandler) => {
        setAddLoading(false);
        dispatch(setModalErrorSnackMessage(err));
      });
  };

  useEffect(() => {
    setAccessPolicy(actualPolicy);
    setPolicyDefinition(
      actualDefinition
        ? JSON.stringify(JSON.parse(actualDefinition), null, 4)
        : emptyPolicy
    );
  }, [setAccessPolicy, actualPolicy, setPolicyDefinition, actualDefinition]);

  return (
    <ModalWrapper
      title="Change Access Policy"
      modalOpen={open}
      onClose={() => {
        closeModalAndRefresh();
      }}
      titleIcon={<ChangeAccessPolicyIcon />}
    >
      <form
        noValidate
        autoComplete="off"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          addRecord(e);
        }}
      >
        <Grid container>
          <Grid item xs={12} className={classes.modalFormScrollable}>
            <Grid item xs={12} className={classes.formFieldRow}>
              <SelectWrapper
                value={accessPolicy}
                label="Access Policy"
                id="select-access-policy"
                name="select-access-policy"
                onChange={(e) => {
                  setAccessPolicy(e?.value as string);
                }}
                options={[
                  { value: "PRIVATE", label: "Private" },
                  { value: "PUBLIC", label: "Public" },
                  { value: "CUSTOM", label: "Custom" },
                ]}
              />
            </Grid>
            {accessPolicy === "PUBLIC" && (
              <div
                style={{
                  marginTop: "25px",
                  fontSize: "14px",
                  fontStyle: "italic",
                  color: "#5E5E5E",
                }}
              >
                * Warning: With Public access anyone will be able to upload,
                download and delete files from this Bucket *
              </div>
            )}
            {accessPolicy === "CUSTOM" && (
              <Grid item xs={12} className={classes.codeMirrorContainer}>
                <CodeMirrorWrapper
                  label={`Write Policy`}
                  value={policyDefinition}
                  onBeforeChange={(editor, data, value) => {
                    setPolicyDefinition(value);
                  }}
                  editorHeight={"350px"}
                />
              </Grid>
            )}
          </Grid>
          <Grid item xs={12} className={classes.modalButtonBar}>
            <Button
              id={"cancel"}
              type="button"
              variant="regular"
              onClick={() => {
                closeModalAndRefresh();
              }}
              disabled={addLoading}
              label={"Cancel"}
            />
            <Button
              id={"set"}
              type="submit"
              variant="callAction"
              disabled={
                addLoading || (accessPolicy === "CUSTOM" && !policyDefinition)
              }
              label={"Set"}
            />
          </Grid>
        </Grid>
      </form>
    </ModalWrapper>
  );
};

export default withStyles(SetAccessPolicy, styles);
