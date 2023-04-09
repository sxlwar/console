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

import React, { Fragment, useEffect, useState } from "react";


import { ErrorResponseHandler } from "../../../../../../common/types";
import ConfirmDialog from "../../../../Common/ModalWrapper/ConfirmDialog";
import { ConfirmDeleteIcon } from "mds";
import api from "../../../../../../common/api";
import { setErrorSnackMessage } from "../../../../../../systemSlice";
import { AppState, useAppDispatch } from "../../../../../../store";
import FormSwitchWrapper from "../../../../Common/FormComponents/FormSwitchWrapper/FormSwitchWrapper";
import { hasPermission } from "../../../../../../common/SecureComponent";
import { IAM_SCOPES } from "../../../../../../common/SecureComponent/permissions";
import { useSelector } from "react-redux";
import { DialogContentText } from "../../../../../../common/DialogContentText";

interface IDeleteSelectedVersionsProps {
  closeDeleteModalAndRefresh: (refresh: boolean) => void;
  deleteOpen: boolean;
  selectedVersions: string[];
  selectedObject: string;
  selectedBucket: string;
}

const DeleteObject = ({
  closeDeleteModalAndRefresh,
  deleteOpen,
  selectedBucket,
  selectedVersions,
  selectedObject,
}: IDeleteSelectedVersionsProps) => {
  const dispatch = useAppDispatch();
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [bypassGovernance, setBypassGovernance] = useState<boolean>(false);

  const retentionConfig = useSelector(
    (state: AppState) => state.objectBrowser.retentionConfig
  );

  const canBypass =
    hasPermission(
      [selectedBucket],
      [IAM_SCOPES.S3_BYPASS_GOVERNANCE_RETENTION]
    ) && retentionConfig?.mode === "governance";

  const onClose = () => closeDeleteModalAndRefresh(false);
  const onConfirmDelete = () => {
    setDeleteLoading(true);
  };

  useEffect(() => {
    if (deleteLoading) {
      const selectedObjectsRequest = selectedVersions.map((versionID) => {
        return {
          path: selectedObject,
          versionID: versionID,
          recursive: false,
        };
      });

      if (selectedObjectsRequest.length > 0) {
        api
          .invoke(
            "POST",
            `/api/v1/buckets/${selectedBucket}/delete-objects?all_versions=false${
              bypassGovernance ? "&bypass=true" : ""
            }`,
            selectedObjectsRequest
          )
          .then(() => {
            setDeleteLoading(false);
            closeDeleteModalAndRefresh(true);
          })
          .catch((error: ErrorResponseHandler) => {
            dispatch(setErrorSnackMessage(error));
            setDeleteLoading(false);
          });
      }
    }
  }, [
    deleteLoading,
    closeDeleteModalAndRefresh,
    selectedBucket,
    selectedObject,
    selectedVersions,
    bypassGovernance,
    dispatch,
  ]);

  if (!selectedVersions) {
    return null;
  }

  return (
    <ConfirmDialog
      title={`Delete Selected Versions`}
      confirmText={"Delete"}
      isOpen={deleteOpen}
      titleIcon={<ConfirmDeleteIcon />}
      isLoading={deleteLoading}
      onConfirm={onConfirmDelete}
      onClose={onClose}
      confirmationContent={
        <DialogContentText>
          Are you sure you want to delete the selected {selectedVersions.length}{" "}
          versions for <strong>{selectedObject}</strong>?
          {canBypass && (
            <Fragment>
              <div
                style={{
                  marginTop: 10,
                }}
              >
                <FormSwitchWrapper
                  label={"Bypass Governance Mode"}
                  indicatorLabels={["Yes", "No"]}
                  checked={bypassGovernance}
                  value={"bypass_governance"}
                  id="bypass_governance"
                  name="bypass_governance"
                  onChange={(e) => {
                    setBypassGovernance(!bypassGovernance);
                  }}
                  description=""
                />
              </div>
            </Fragment>
          )}
        </DialogContentText>
      }
    />
  );
};

export default DeleteObject;
