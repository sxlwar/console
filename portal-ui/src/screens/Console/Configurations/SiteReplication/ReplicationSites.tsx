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

import React, { useState } from "react";
import { List, ListItem } from "mds";
import {
  Box,
  Button,
  CircleIcon,
  ConfirmDeleteIcon,
  EditIcon,
  TrashIcon,
  Tooltip,
} from "mds";
import { ReplicationSite } from "./SiteReplication";
import ConfirmDialog from "../../Common/ModalWrapper/ConfirmDialog";
import { withStyles } from "../../../../theme/makeStyles";

import {
  formFieldStyles,
  modalStyleUtils,
  spacingUtils,
} from "../../Common/FormComponents/common/styleLibrary";
import TooltipWrapper from "../../Common/TooltipWrapper/TooltipWrapper";
import EditSiteEndPoint from "./EditSiteEndPoint";
import { DialogContentText } from "../../../../common/DialogContentText";

const styles = () => ({
  ...modalStyleUtils,
  ...formFieldStyles,
  ...spacingUtils,
});

const ReplicationSites = ({
  sites,
  onDeleteSite,
  onRefresh,
}: {
  sites: ReplicationSite[];
  onDeleteSite: (isAll: boolean, sites: string[]) => void;
  onRefresh: () => void;
  classes?: any;
}) => {
  const [deleteSiteKey, setIsDeleteSiteKey] = useState<string>("");
  const [editSite, setEditSite] = useState<any>(null);

  return (
    <Box>
      <List
        sx={{
          width: "100%",
          flex: 1,
          padding: "0",
          marginTop: "25px",
          height: "calc( 100vh - 640px )",
          minHeight: "250px",
          border: "1px solid #eaeaea",
          marginBottom: "25px",
          overflowY: "auto",
        }}
        aria-labelledby="nested-list-subheader"
      >
        <Box
          sx={{
            fontWeight: 600,
            borderBottom: "1px solid #f1f1f1",
            padding: "25px 25px 25px 20px",
          }}
        >
          List of Replicated Sites
        </Box>
        {sites.map((siteInfo, index) => {
          const key = `${siteInfo.name}`;

          return (
            <React.Fragment key={`${key}-${index}`}>
              <ListItem
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #f1f1f1",
                  borderLeft: "0",
                  borderRight: "0",
                  borderTop: "0",
                  padding: "6px 10px 6px 20px",
                  "&:hover": {
                    background: "#bebbbb0d",
                  },
                  "&.expanded": {
                    marginBottom: "0",
                  },
                }}
              >
                <Box
                  sx={{
                    flex: 2,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr ",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      overflow: "hidden",
                    }}
                  >
                    {siteInfo.name}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      overflow: "hidden",
                    }}
                  >
                    {siteInfo.isCurrent ? (
                      <Tooltip tooltip={"This site/cluster"} placement="top">
                        <Box
                          sx={{
                            "& .min-icon": {
                              height: "12px",
                              fill: "green",
                            },
                          }}
                        >
                          <CircleIcon />
                        </Box>
                      </Tooltip>
                    ) : null}
                    <Tooltip tooltip={siteInfo.endpoint}>
                      <Box
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          marginLeft: siteInfo.isCurrent ? "" : "24px",
                        }}
                      >
                        {siteInfo.endpoint}
                      </Box>
                    </Tooltip>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    marginLeft: "25px",
                    marginRight: "25px",
                    width: "60px",
                    flexShrink: 0,

                    "& button": {
                      borderRadius: "50%",
                      background: "#F8F8F8",
                      border: "none",

                      "&:hover": {
                        background: "#E2E2E2",
                      },

                      "& svg": {
                        fill: "#696565",
                      },
                    },
                  }}
                >
                  <TooltipWrapper tooltip="Delete Site">
                    <Button
                      id={`delete-site-${key}-${index}`}
                      variant="secondary"
                      disabled={siteInfo.isCurrent}
                      icon={<TrashIcon />}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsDeleteSiteKey(key);
                      }}
                      style={{
                        width: "25px",
                        height: "25px",
                        padding: "0",
                      }}
                    />
                  </TooltipWrapper>
                  <TooltipWrapper tooltip={"Edit Endpoint"}>
                    <Button
                      id={`edit-icon-${key}-${index}`}
                      variant="regular"
                      disabled={siteInfo.isCurrent}
                      icon={<EditIcon />}
                      onClick={(e) => {
                        e.preventDefault();
                        setEditSite(siteInfo);
                      }}
                      style={{
                        width: "25px",
                        height: "25px",
                        padding: "0",
                        marginLeft: "8px",
                      }}
                    />
                  </TooltipWrapper>
                </Box>
              </ListItem>

              {deleteSiteKey === key ? (
                <ConfirmDialog
                  title={`Delete Replication Site`}
                  confirmText={"Delete"}
                  isOpen={true}
                  titleIcon={<ConfirmDeleteIcon />}
                  isLoading={false}
                  onConfirm={() => {
                    onDeleteSite(false, [key]);
                  }}
                  onClose={() => {
                    setIsDeleteSiteKey("");
                  }}
                  confirmationContent={
                    <DialogContentText>
                      Are you sure you want to remove the replication site:{" "}
                      {key}.?
                    </DialogContentText>
                  }
                />
              ) : null}

              {editSite?.name === key ? (
                <EditSiteEndPoint
                  onComplete={() => {
                    setEditSite(null);
                    onRefresh();
                  }}
                  editSite={editSite}
                  onClose={() => {
                    setEditSite(null);
                  }}
                />
              ) : null}
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

export default withStyles(ReplicationSites, styles);
