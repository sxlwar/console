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

import React from "react";

import { withStyles } from "../../../../theme/makeStyles";
import { modalBasic } from "../../Common/FormComponents/common/styleLibrary";
import { ErrorResponseHandler } from "../../../../common/types";
import useApi from "../../Common/Hooks/useApi";
import ConfirmDialog from "../../Common/ModalWrapper/ConfirmDialog";
import { ConfirmDeleteIcon } from "mds";
import { setErrorSnackMessage } from "../../../../systemSlice";
import { useAppDispatch } from "../../../../store";
import { DialogContentText } from "../../../../common/DialogContentText";

interface IDeleteBucketTagModal {
  deleteOpen: boolean;
  currentTags: any;
  bucketName: string;
  selectedTag: string[];
  onCloseAndUpdate: (refresh: boolean) => void;
  classes?: any;
}

const styles = () => ({
  ...modalBasic,
});

const DeleteBucketTagModal = ({
  deleteOpen,
  currentTags,
  selectedTag,
  onCloseAndUpdate,
  bucketName,
  classes,
}: IDeleteBucketTagModal) => {
  const dispatch = useAppDispatch();
  const [tagKey, tagLabel] = selectedTag;

  const onDelSuccess = () => onCloseAndUpdate(true);
  const onDelError = (err: ErrorResponseHandler) =>
    dispatch(setErrorSnackMessage(err));
  const onClose = () => onCloseAndUpdate(false);

  const [deleteLoading, invokeDeleteApi] = useApi(onDelSuccess, onDelError);

  if (!selectedTag) {
    return null;
  }

  const onConfirmDelete = () => {
    const cleanObject = { ...currentTags };
    delete cleanObject[tagKey];

    invokeDeleteApi("PUT", `/api/v1/buckets/${bucketName}/tags`, {
      tags: cleanObject,
    });
  };

  return (
    <ConfirmDialog
      title={`Delete Tag`}
      confirmText={"Delete"}
      isOpen={deleteOpen}
      titleIcon={<ConfirmDeleteIcon />}
      isLoading={deleteLoading}
      onConfirm={onConfirmDelete}
      onClose={onClose}
      confirmationContent={
        <DialogContentText>
          Are you sure you want to delete the tag{" "}
          <b className={classes.wrapText}>
            {tagKey} : {tagLabel}
          </b>{" "}
          ?
        </DialogContentText>
      }
    />
  );
};

export default withStyles(DeleteBucketTagModal, styles);
