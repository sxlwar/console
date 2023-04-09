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

import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from "@atlaskit/modal-dialog";
import React from "react";

import { Button, IconButton, AlertCloseIcon } from "mds";

import { withStyles } from "../../../../theme/makeStyles";
import { ButtonProps } from "../../types";
import { deleteDialogStyles } from "../FormComponents/common/styleLibrary";

const styles = () => ({
  ...deleteDialogStyles,
});

type ConfirmDialogProps = {
  isOpen?: boolean;
  onClose: () => void;
  onCancel?: () => void;
  onConfirm: () => void;
  classes?: any;
  title: string;
  isLoading?: boolean;
  confirmationContent: React.ReactNode | React.ReactNode[];
  cancelText?: string;
  confirmText?: string;
  confirmButtonProps?: ButtonProps &
    React.ButtonHTMLAttributes<HTMLButtonElement>;
  cancelButtonProps?: ButtonProps &
    React.ButtonHTMLAttributes<HTMLButtonElement>;
  titleIcon?: React.ReactNode;
  confirmationButtonSimple?: boolean;
};

const ConfirmDialog = ({
  isOpen = false,
  onClose,
  onCancel,
  onConfirm,
  classes = {},
  title = "",
  isLoading,
  confirmationContent,
  cancelText = "Cancel",
  confirmText = "Confirm",
  confirmButtonProps = undefined,
  cancelButtonProps = undefined,
  titleIcon = null,
  confirmationButtonSimple = false,
}: ConfirmDialogProps) => {
  return (
    <ModalTransition>
      {isOpen && (
        <Modal
          onClose={(event, reason) => {
            onClose(); // close on Esc but not on click outside
          }}
        >
          <ModalHeader>
            <ModalTitle>
              <div className={classes.title}>
                <div className={classes.titleText}>
                  {titleIcon} {title}
                </div>
                <div className={classes.closeContainer}>
                  <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                    size="small"
                  >
                    <AlertCloseIcon />
                  </IconButton>
                </div>
              </div>
            </ModalTitle>
          </ModalHeader>

          <ModalBody>
            <div className={classes.content}>{confirmationContent}</div>
          </ModalBody>

          <ModalFooter>
            <div className={classes.actions}>
              <Button
                onClick={onCancel || onClose}
                disabled={isLoading}
                type="button"
                {...cancelButtonProps}
                variant="regular"
                id={"confirm-cancel"}
                label={cancelText}
              />

              <Button
                id={"confirm-ok"}
                onClick={onConfirm}
                label={confirmText}
                disabled={isLoading}
                variant={"secondary"}
                {...confirmButtonProps}
              />
            </div>
          </ModalFooter>
        </Modal>
      )}
    </ModalTransition>
  );
};

export default withStyles(ConfirmDialog, styles);
