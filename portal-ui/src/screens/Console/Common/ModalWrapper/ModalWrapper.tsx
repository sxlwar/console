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
import SectionMessage, {
  SectionMessageAction,
} from "@atlaskit/section-message";
import { AlertCloseIcon, IconButton } from "mds";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTransition,
} from "@atlaskit/modal-dialog";

import CloseIcon from "@mui/icons-material/Close";
import { AppState, useAppDispatch } from "../../../../store";
import { setModalSnackMessage } from "../../../../systemSlice";
import { withStyles } from "../../../../theme/makeStyles";
import {
  deleteDialogStyles,
  snackBarCommon,
} from "../FormComponents/common/styleLibrary";
import MainError from "../MainError/MainError";

interface IModalProps {
  classes?: any;
  onClose: () => void;
  modalOpen: boolean;
  title: string | React.ReactNode;
  children: any;
  wideLimit?: boolean;
  noContentPadding?: boolean;
  titleIcon?: React.ReactNode;
}

const styles = () => ({
  ...deleteDialogStyles,
  content: {
    padding: 25,
    paddingBottom: 0,
  },
  customDialogSize: {
    width: "100%",
    maxWidth: 765,
  },
  ...snackBarCommon,
});

const ModalWrapper = ({
  onClose,
  modalOpen,
  title,
  children,
  classes,
  wideLimit = true,
  noContentPadding,
  titleIcon = null,
}: IModalProps) => {
  const dispatch = useAppDispatch();
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const modalSnackMessage = useSelector(
    (state: AppState) => state.system.modalSnackBar
  );

  useEffect(() => {
    dispatch(setModalSnackMessage(""));
  }, [dispatch]);

  useEffect(() => {
    if (modalSnackMessage) {
      if (modalSnackMessage.message === "") {
        setOpenSnackbar(false);
        return;
      }
      // Open SnackBar
      if (modalSnackMessage.type !== "error") {
        setOpenSnackbar(true);
      }
    }
  }, [modalSnackMessage]);

  const closeSnackBar = () => {
    setOpenSnackbar(false);
    dispatch(setModalSnackMessage(""));
  };

  const customSize = wideLimit
    ? {
        classes: {
          paper: classes.customDialogSize,
        },
      }
    : { maxWidth: "lg" as const, fullWidth: true };

  let message = "";

  if (modalSnackMessage) {
    message = modalSnackMessage.detailedErrorMsg;
    if (
      modalSnackMessage.detailedErrorMsg === "" ||
      modalSnackMessage.detailedErrorMsg.length < 5
    ) {
      message = modalSnackMessage.message;
    }
  }

  return (
    <ModalTransition>
      {modalOpen && (
        <Modal
          classes={classes}
          {...customSize}
          onClose={(event, reason) => {
            onClose();
          }}
        >
          <ModalHeader>
            <div className={classes.title} style={{ width: "100%" }}>
              <div className={classes.titleText}>
                {titleIcon} {title}
              </div>
              <div className={classes.closeContainer}>
                <IconButton
                  aria-label="close"
                  id={"close"}
                  className={classes.closeButton}
                  onClick={onClose}
                  size="small"
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
          </ModalHeader>

          <MainError isModal={true} />
          <div className={classes.snackBarModal}>
            {openSnackbar && (
              <SectionMessage
                actions={[
                  <SectionMessageAction
                    onClick={() => {
                      closeSnackBar();
                    }}
                  >
                    <AlertCloseIcon />
                  </SectionMessageAction>,
                ]}
              >
                <p
                  className={`${classes.snackBar} ${
                    modalSnackMessage && modalSnackMessage.type === "error"
                      ? classes.errorSnackBar
                      : ""
                  }`}
                >
                  {message}
                </p>
              </SectionMessage>
            )}
          </div>
          <ModalBody>
            <div className={noContentPadding ? "" : classes.content}>
              {children}
            </div>
          </ModalBody>
        </Modal>
      )}
    </ModalTransition>
  );
};

export default withStyles(ModalWrapper, styles);
